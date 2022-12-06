const _SCALAR = 300;

class Ray 
{
    constructor(pos, dir) 
    {
        this.pos = pos;
        this.dir = dir;
        this.curEndpoint = this.getEndPointNoObstruction();
        this.reflectedRay = null;
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
  
    cast(mirrorArray) 
    {
        if(mirrorArray == null) return;
        let mirror = mirrorArray[0];
        const endP = this.getEndPointNoObstruction();
        const intersectPoint = LineHelper.getIntersection(mirror.a, mirror.b, this.pos, endP);

        const didIntersect = Vector2Helper.isValid(intersectPoint);
        if(didIntersect)
        {
            this.curEndpoint = intersectPoint;

            // Reference: https://p5js.org/reference/#/p5.Vector/reflect
            let reflectionVector = this.dir.copy();
            reflectionVector.reflect(mirror.getNormal());
            this.reflectedRay = new Ray(intersectPoint, reflectionVector); 
        }
        else 
        {
            this.curEndpoint = endP;
            this.reflectedRay = null; 
        }


    }
  }
  