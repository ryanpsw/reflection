class Mirror 
{
    constructor(x1, y1, x2, y2) 
    {
      this.a = createVector(x1, y1);
      this.b = createVector(x2, y2);
    }
  
    show() 
    {
      // set color and weight 
      stroke('rgb(44, 111, 239)');
      strokeCap(SQUARE);
      strokeWeight(12.0);

      // draw it 
      line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }
  