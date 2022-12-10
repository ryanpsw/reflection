const _SCALAR = 410;

class Ray 
{
    constructor(pos, dir) 
    {
        this.pos = pos;
        this.dir = dir;
        this.curEndpoint = this.getEndPointNoObstruction();
        this.reflectedRay = null;
        this.originMirror = null;

        this.shortestDistanceObstruction = null;
        this.shortestDistanceToObstruction = Infinity;
        this.shortestIntersectPoint = null;
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
                    this.reflectedRay = new Ray(this.shortestIntersectPoint, reflectionVector); 
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
  