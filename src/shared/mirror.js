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

    // Reference: https://stackoverflow.com/questions/1243614/how-do-i-calculate-the-normal-vector-of-a-line-segment
    getNormal()
    {
      let v = this.b.copy().sub(this.a);
      return createVector(v.y, -v.x); // or (-v.y, v.x) 
    }
  }
  