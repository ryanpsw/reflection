const _SCALAR = 500;

class Ray 
{
    constructor(pos, dir, charNum, shouldDrawAngle) 
    {
        this.pos = pos;
        this.dir = dir;
        this.charNum = charNum; 
        this.curEndpoint = this.getEndPointNoObstruction();
        this.reflectedRay = null;
        this.originMirror = null;

        this.shortestDistanceObstruction = null;
        this.shortestDistanceToObstruction = Infinity;
        this.shortestIntersectPoint = null;

        this.shouldDrawAngle = shouldDrawAngle;
    }
  
    lookAt(x, y) 
    {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }
  
    getEndPointNoObstruction()
    {
        return createVector(this.pos.x + this.dir.x * _SCALAR, this.pos.y + this.dir.y * _SCALAR);
    }

    getChainedRayEndpoint()
    {
        if(this.reflectedRay)
        {
            return this.reflectedRay.getChainedRayEndpoint();
        }
        return this.curEndpoint;
    }

    getChainedRayLast()
    {
        if(this.reflectedRay)
        {
            return this.reflectedRay.getChainedRayLast();
        }
        return this;
    }

    getChainedRayNum()
    {
        if(this.reflectedRay)
        {
            return this.reflectedRay.getChainedRayNum()+1;
        }
        return 1;
    }

    getChainedMagnitude()
    {
        if(this.reflectedRay)
        {
            return this.reflectedRay.getChainedMagnitude() + this.getMagnitude();
        }
        return 0;
    }

    getMagnitude()
    {
        let v = this.curEndpoint.copy().sub(this.pos);
        return v.mag();
    }

    getChainedCharNums(charNumsArray)
    {
        if(this.charNum)
        {
            append(charNumsArray, this.charNum);
        }

        if(this.reflectedRay)
        {
            this.reflectedRay.getChainedCharNums(charNumsArray);
        }
        return charNumsArray;
    }

    show() 
    {
        strokeWeight(3.0);

        let rayColor = color(255, 80, 60);
        stroke(rayColor);
        let shouldShowArrow = this.reflectedRay == null;
        LineRenderer.drawLine(this.pos, this.curEndpoint, false, shouldShowArrow, rayColor);

        if(this.reflectedRay)
        {
            this.reflectedRay.show();
        }

        if(this.charNum != null)
        {
            let midPoint = createVector((this.pos.x + this.curEndpoint.x) /2, (this.pos.y + this.curEndpoint.y) /2);
            LineRenderer.drawLetter(midPoint, this.charNum, rayColor);
        }

        this.tryDrawAngle();
    }
  
    cast(obstructionsArray) 
    {
        if(obstructionsArray == null) return;

        for (let currentObstruction of obstructionsArray) 
        {
            switch (currentObstruction.className)
            {
                case MIRROR_CLASS_NAME:
                    // If the ray is originated from a mirror, no need to check if it can reflect.
                    if(currentObstruction == this.originMirror) continue;
                    this.checkIntersectWithObstruction(currentObstruction);
                    break; 

                case WALL_CLASS_NAME:
                    this.checkIntersectWithObstruction(currentObstruction);
                    break;
                    
                case BOX_CLASS_NAME:
                    for (let wall of currentObstruction.walls) {
                        this.checkIntersectWithObstruction(wall);
                    }
                    break;
            }
        }

        this.tryApplyObstructionWithShortestDistance(obstructionsArray);
    }

    //-----------------------------------------------------------------
    // WARNING: ONLY WORK ON FLAT MIRRORS :P THIS IS BASICALLY A HACK
    //-----------------------------------------------------------------
    tryDrawAngle()
    {
        if(this.shouldDrawAngle && this.reflectedRay && this.shortestDistanceObstruction)
        {
            angleMode(RADIANS);
            let mirrorVector = this.shortestDistanceObstruction.a.copy().sub(this.shortestDistanceObstruction.b);
            let angleBetweenMirrorAndRay = mirrorVector.angleBetween(this.dir.copy().mult(-1));
            let angleBetweenMirrorAndFlatGround = PI - mirrorVector.angleBetween(createVector(-1, 0));

            push();
            let c = color(225, 80, 60, 170);
            translate(this.curEndpoint.x, this.curEndpoint.y);
            noStroke();
            fill(c);
            rotate(angleBetweenMirrorAndFlatGround);
            arc(0, 0, 70, 70, 0, angleBetweenMirrorAndRay, PIE);
            rotate((PI-angleBetweenMirrorAndRay));
            arc(0, 0, 70, 70, 0, angleBetweenMirrorAndRay, PIE);
            pop();

            push();
            noStroke();
            textSize(20);
            fill('black');
            textStyle(NORMAL);
            textWrap(WORD);
            text('θ', this.curEndpoint.x-60, this.curEndpoint.y-10);
            text('θ', this.curEndpoint.x+60, this.curEndpoint.y-10);
            pop();
        }
    }

    checkIntersectWithObstruction(obstruction) 
    {
        let intersectPoint = LineHelper.getIntersection(obstruction.a, obstruction.b, this.pos, this.getEndPointNoObstruction());
        let didIntersect = Vector2Helper.isValid(intersectPoint);

        if(didIntersect)
        {
            let curDistance = p5.Vector.dist(this.pos, intersectPoint);
            if(this.shortestDistanceToObstruction > curDistance) 
            {
                this.shortestDistanceObstruction = obstruction;
                this.shortestDistanceToObstruction = curDistance;
                this.shortestIntersectPoint = intersectPoint;
            }
        } 
    }

    tryApplyObstructionWithShortestDistance(obstructionsArray)
    {
        if(this.shortestDistanceToObstruction!=Infinity && this.shortestIntersectPoint != null && this.shortestDistanceObstruction != null)
        {
            this.curEndpoint = this.shortestIntersectPoint;
            switch(this.shortestDistanceObstruction.className)
            {
                case MIRROR_CLASS_NAME:
                    // Reference: https://p5js.org/reference/#/p5.Vector/reflect
                    let reflectionVector = this.dir.copy();
                    reflectionVector.reflect(this.shortestDistanceObstruction.getNormal());
                    let nextCharNum = this.charNum ? this.charNum + 1 : null;
                    this.reflectedRay = new Ray(this.shortestIntersectPoint, reflectionVector, nextCharNum); 
                    this.reflectedRay.originMirror = this.shortestDistanceObstruction;
                    this.reflectedRay.cast(obstructionsArray);
                    break;
                case WALL_CLASS_NAME:
                    this.shortestDistanceObstruction.isHitByRay = true;
                    this.reflectedRay = null;
                    break;
                default:
                    this.reflectedRay = null;
                    break;    
            }
        }
        else
        {
            this.reflectedRay = null;
            this.curEndpoint = this.getEndPointNoObstruction();
        }

        // reset for next for loop
        this.shortestDistanceToObstruction = Infinity;
        this.shortestIntersectPoint = null;
    }
  }
  