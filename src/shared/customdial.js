const touchRadius = 30;

class CustomDial
{
    constructor(x, y, radius, shouldShowCenter) 
    {
      this.pos = createVector(x, y); 
      this.radius = radius;
      this.circlePos = this.pos.copy().add(p5.Vector.fromAngle(PI/4).mult(this.radius));
      this.isDragging = false;
      this.shouldShowCenter = shouldShowCenter;
    }

    getNormalizedDir()
    {
        return this.circlePos.copy().sub(this.pos).normalize(); 
    }

    updatePos(newX, newY)
    {
        let diff = this.circlePos.copy().sub(this.pos);
        this.pos.x = newX;
        this.pos.y = newY;
        this.circlePos.x = this.pos.x + diff.x;
        this.circlePos.y = this.pos.y + diff.y;

        if(this.isDragging)
        {
            let v = createVector(mouseX, mouseY);
            let dir = v.sub(this.pos).normalize().mult(this.radius);
    
            this.circlePos.x = this.pos.x + dir.x;
            this.circlePos.y = this.pos.y + dir.y;
        }
    }

    show() 
    {
        noStroke();

        if(this.shouldShowCenter)
        {
            fill('black');
            circle(this.pos.x, this.pos.y, 3);
        }

        fill(181, 181, 181);
        circle(this.circlePos.x, this.circlePos.y, 50);

        fill(207, 90, 69);
        circle(this.circlePos.x, this.circlePos.y, 32);
    }

    checkMousePressed()
    {
        if(
            mouseX > this.circlePos.x - touchRadius  && 
            mouseX < this.circlePos.x + touchRadius && 
            mouseY > this.circlePos.y - touchRadius && 
            mouseY < this.circlePos.y + touchRadius
        )  
        {
            this.isDragging = true;
        }
    }

    checkMouseReleased()
    {
        this.isDragging = false;
    }
}
