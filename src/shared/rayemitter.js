class RayEmitter
 {
    constructor(pos, normalizedDirection) 
    {
      this.pos = pos;
      this.ray = new Ray(this.pos, normalizedDirection);
    }
  
    updatePos(x, y) 
    {
      this.pos.set(x, y);
    }
  
    look(mirrorArray) 
    {
      this.ray.cast(mirrorArray);
    }
  
    show() 
    {
      noStroke();
      fill(0);
      ellipse(this.pos.x, this.pos.y, 30);
      this.ray.show();
    }
  }
  