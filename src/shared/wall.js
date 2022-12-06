const WALL_CLASS_NAME = "Wall";

// Wall does not reflect ray of light. 
class Wall
{
    constructor(x1, y1, x2, y2) 
    {
      this.a = createVector(x1, y1);
      this.b = createVector(x2, y2);
      this.className = WALL_CLASS_NAME;
    }
  
    show() 
    {
      // set color and weight 
      stroke('black');
      strokeCap(SQUARE);
      strokeWeight(12.0);

      // draw it 
      line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }
  