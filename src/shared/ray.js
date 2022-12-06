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
                    let intersectPoint2 = LineHelper.getIntersection(currentObstruction.a, currentObstruction.b, this.pos, endP);
                    let didIntersect2 = Vector2Helper.isValid(intersectPoint2);

                    if(didIntersect2)
                    {
                        this.curEndpoint = intersectPoint2;
                        this.reflectedRay = null; 

                        // No need to check other objects, exit the for loop. 
                        return;
                    } 
                    else
                    {
                        this.curEndpoint = endP;
                        this.reflectedRay = null; 
                    }
                    break;
                //---------------------------------------------------------------------------------
                // BOX
                //---------------------------------------------------------------------------------
                case BOX_CLASS_NAME:
                    this.reflectedRay = null; 

                    let shortestDist = Infinity;
                    let shortestIntersectPoint = null;

                    for (let wall of currentObstruction.walls) {

                        let intersectPoint3 = LineHelper.getIntersection(wall.a, wall.b, this.pos, endP);
                        let didIntersect3 = Vector2Helper.isValid(intersectPoint3);

                        if(didIntersect3)
                        {
                            let curDist = p5.Vector.dist(this.pos, intersectPoint3);
                            if(shortestDist > curDist) 
                            {
                                shortestDist = curDist;
                                shortestIntersectPoint = intersectPoint3;
                            }
                        }
                    }
                    
                    if(shortestDist!=Infinity && shortestIntersectPoint != null)
                    {
                        this.curEndpoint = shortestIntersectPoint;
                    } 
                    else
                    {
                        this.curEndpoint = endP;
                    }
                    break;
            }
        }
    }
  }
  