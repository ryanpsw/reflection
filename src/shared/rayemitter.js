class RayEmitter
 {
    constructor() 
    {
      this.pos = createVector(width / 2, height / 2);
      this.ray = new Ray(this.pos, createVector(10, 5).normalize());
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
  