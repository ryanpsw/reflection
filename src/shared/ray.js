const _SCALAR = 300;

class Ray 
{
    constructor(pos, angleInDegree) 
    {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angleInDegree);
        this.curEndpoint = this.getEndPointNoObstruction();
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
        LineRenderer.drawLine(this.pos, this.curEndpoint, true, true);
    }
  
    cast(mirrorArray) 
    {
        if(mirrorArray == null) return;
        let mirror = mirrorArray[0];
        const endP = this.getEndPointNoObstruction();
        const intersectPoint = LineHelper.getIntersection(mirror.a, mirror.b, this.pos, endP);
        this.curEndpoint = Vector2Helper.isValid(intersectPoint) ? intersectPoint : endP;
    }
  }
  