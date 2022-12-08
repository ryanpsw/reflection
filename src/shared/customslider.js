const touchRadius = 120;

class CustomSlider
{
    constructor(x1, y1, x2, y2, imgHandle, isVertical, shouldShowBar) 
    {
      this.a = createVector(x1, y1);
      this.b = createVector(x2, y2);
      this.pos = createVector((x1 + x2) / 2, (y1 + y2) / 2); 

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

    show() 
    {
        // for debugging touch area
        // circle(this.pos.x, this.pos.y, touchRadius);

        if(this.shouldShowBar)
        {
            stroke('purple');
            line(this.a.x, this.a.y, this.b.x, this.b.y);
        }

        if(!this.isVertical)
        {
            image(this.imgHandle, this.pos.x - this.imgHandle.width/2, this.pos.y);
        }
        else
        {
            image(this.imgHandle, this.pos.x, this.pos.y - this.imgHandle.height/2);
        }
    }

    checkMousePressed()
    {
        if(
            mouseX > this.pos.x - touchRadius  && 
            mouseX < this.pos.x + touchRadius && 
            mouseY > this.pos.y - touchRadius && 
            mouseY < this.pos.y + touchRadius
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