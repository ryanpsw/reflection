class CustomSlider
{
    constructor(x1, y1, x2, y2, imgHandle, isVertical, shouldShowBar) 
    {
      this.a = createVector(x1, y1);
      this.b = createVector(x2, y2);
      this.pos = this.a.copy();

      this.imgHandle = imgHandle;
      this.isDragging = false;
      this.isVertical = isVertical; // horizontal if false
      this.shouldShowBar = shouldShowBar;
    }

    updatePos()
    {
        if(this.isDragging)
        {
            if(this.a.x != this.b.x)
            {
                this.pos.x = map(mouseX, this.a.x, this.b.x, this.a.x, this.b.x, true);
            }

            if(this.a.y != this.b.y)
            {
                this.pos.y = map(mouseY, this.a.y, this.b.y, this.a.y, this.b.y, true);
            }
        }
    }

    getPercent() // 0 - 1
    {
        let total = this.b.copy().sub(this.a);
        let current = this.pos.copy().sub(this.a);
        return current.mag()/total.mag();
    }

    show() 
    {
        if(this.shouldShowBar)
        {
            stroke('purple');
            line(this.a.x, this.a.y, this.b.x, this.b.y);
        }

        push();
        tint(255, 150);
        if(!this.isVertical)
        {
            image(this.imgHandle, this.pos.x - this.imgHandle.width/2, this.pos.y);
        }
        else
        {
            image(this.imgHandle, this.pos.x, this.pos.y - this.imgHandle.height/2);
        }
        pop();
    }

    checkMousePressed()
    {
        if(
            this.isVertical &&
            mouseX > this.pos.x   && 
            mouseX < this.pos.x + this.imgHandle.width  && 
            mouseY > this.pos.y - this.imgHandle.height /2 && 
            mouseY < this.pos.y + this.imgHandle.height /2

            || 

            !this.isVertical &&
            mouseX > this.pos.x - this.imgHandle.width /2  && 
            mouseX < this.pos.x + this.imgHandle.width /2  && 
            mouseY > this.pos.y && 
            mouseY < this.pos.y + this.imgHandle.height
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
