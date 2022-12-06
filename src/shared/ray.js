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

        this.shortestDistanceToAWallOrBox = Infinity;
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

                    let intersectPoint = LineHelper.getIntersection(currentObstruction.a, currentObstruction.b, this.pos, endP);
                    let didIntersect = Vector2Helper.isValid(intersectPoint);

                    // If the ray is originated from a mirror, no need to check if it can reflect.
                    if(currentObstruction == this.originMirror) continue;
                    if(didIntersect)
                    {
                        this.curEndpoint = intersectPoint;

                        // Reference: https://p5js.org/reference/#/p5.Vector/reflect
                        let reflectionVector = this.dir.copy();
                        reflectionVector.reflect(currentObstruction.getNormal());
                        this.reflectedRay = new Ray(intersectPoint, reflectionVector); 
                        this.reflectedRay.originMirror = currentObstruction;
                        this.reflectedRay.cast(obstructionsArray);

                        // No need to check other mirrors, exit the for loop. 
                        this.shortestDistanceToAWallOrBox = Infinity;
                        this.shortestIntersectPoint = null;
                        return;
                    } 
                    else
                    {
                        // No reflections found
                        this.curEndpoint = endP;
                        this.reflectedRay = null; 
                    }
                    break; 
                //---------------------------------------------------------------------------------
                // WALL
                //---------------------------------------------------------------------------------
                case WALL_CLASS_NAME:
                    this.checkIntersect(currentObstruction);
                    break;
                //---------------------------------------------------------------------------------
                // BOX
                //---------------------------------------------------------------------------------
                case BOX_CLASS_NAME:
                    for (let wall of currentObstruction.walls) {
                        this.checkIntersect(wall);
                    }
                    break;
            }
        }

        this.tryApplyShortestDistance();
    }

    checkIntersect(wall) 
    {
        let endP = this.getEndPointNoObstruction();
        let intersectPoint = LineHelper.getIntersection(wall.a, wall.b, this.pos, endP);
        let didIntersect = Vector2Helper.isValid(intersectPoint);

        if(didIntersect)
        {
            let curDistance = p5.Vector.dist(this.pos, intersectPoint);
            if(this.shortestDistanceToAWallOrBox > curDistance) 
            {
                this.shortestDistanceToAWallOrBox = curDistance;
                this.shortestIntersectPoint = intersectPoint;
            }
        } 
    }

    tryApplyShortestDistance()
    {
        let endP = this.getEndPointNoObstruction();

        if(this.shortestDistanceToAWallOrBox!=Infinity && this.shortestIntersectPoint != null)
        {
            this.curEndpoint = this.shortestIntersectPoint;
        } 
        else
        {
            this.reflectedRay = null;
            this.curEndpoint = endP;
        }

        this.shortestDistanceToAWallOrBox = Infinity;
        this.shortestIntersectPoint = null;
    }
  }
  