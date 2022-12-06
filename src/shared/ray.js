const _SCALAR = 500;

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

    show() 
    {
        strokeWeight(5.0);
        stroke(0, 102, 153);
        let shouldShowArrow = this.reflectedRay == null;
        LineRenderer.drawLine(this.pos, this.curEndpoint, true, shouldShowArrow);

        if(this.reflectedRay)
        {
            this.reflectedRay.show();
        }
    }
  
    cast(obstructionsArray) 
    {
        if(obstructionsArray == null) return;

        const endP = this.getEndPointNoObstruction();

        for (let currentObstruction of obstructionsArray) 
        {
            switch (currentObstruction.className)
            {
                //---------------------------------------------------------------------------------
                // MIRROR
                //---------------------------------------------------------------------------------
                case MIRROR_CLASS_NAME:
                    // If the ray is originated from a mirror, no need to check if it can reflect.
                    if(currentObstruction == this.originMirror) continue;

                    this.checkIntersectWithObstruction(currentObstruction, true, obstructionsArray);
                    break; 
                //---------------------------------------------------------------------------------
                // WALL
                //---------------------------------------------------------------------------------
                case WALL_CLASS_NAME:
                    this.checkIntersectWithObstruction(currentObstruction, false);
                    break;
                //---------------------------------------------------------------------------------
                // BOX
                //---------------------------------------------------------------------------------
                case BOX_CLASS_NAME:
                    for (let wall of currentObstruction.walls) {
                        this.checkIntersectWithObstruction(wall, false);
                    }
                    break;
            }
        }

        this.tryApplyShortestDistance();
    }

    checkIntersectWithObstruction(obstruction, isMirror, obstructionsArray) 
    {
        let endP = this.getEndPointNoObstruction();
        let intersectPoint = LineHelper.getIntersection(obstruction.a, obstruction.b, this.pos, endP);
        let didIntersect = Vector2Helper.isValid(intersectPoint);

        if(didIntersect)
        {
            let curDistance = p5.Vector.dist(this.pos, intersectPoint);
            if(this.shortestDistanceToObstruction > curDistance) 
            {
                if(isMirror)
                {
                    // Reference: https://p5js.org/reference/#/p5.Vector/reflect
                    let reflectionVector = this.dir.copy();
                    reflectionVector.reflect(obstruction.getNormal());
                    this.reflectedRay = new Ray(intersectPoint, reflectionVector); 
                    this.reflectedRay.originMirror = obstruction;
                    this.reflectedRay.cast(obstructionsArray);
                }

                this.shortestDistanceObstruction = obstruction;
                this.shortestDistanceToObstruction = curDistance;
                this.shortestIntersectPoint = intersectPoint;
            }
        } 
    }

    tryApplyShortestDistance()
    {
        let endP = this.getEndPointNoObstruction();

        if(this.shortestDistanceToObstruction!=Infinity && this.shortestIntersectPoint != null && this.shortestDistanceObstruction != null)
        {
            this.curEndpoint = this.shortestIntersectPoint;

            if(this.shortestDistanceObstruction.className != MIRROR_CLASS_NAME)
            {
                this.reflectedRay = null;
            }
        }
        else
        {
            this.reflectedRay = null;
            this.curEndpoint = endP;
        }

        // reset for next for loop
        this.shortestDistanceToObstruction = Infinity;
        this.shortestIntersectPoint = null;
    }
  }
  