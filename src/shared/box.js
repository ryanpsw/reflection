const BOX_CLASS_NAME = "Box";

class Box
{
    constructor(x, y, width, height) 
    {
      this.pos = createVector(x, y);
      this.walls = [];

      this.width = width;
      this.height = height;

      let halfWidth = width/2;
      let halfHeight = height/2;

      this.walls[0] = new Wall(x - halfWidth, y - halfHeight, x + halfWidth, y - halfHeight); // top wall
      this.walls[1] = new Wall(x + halfWidth, y - halfHeight, x + halfWidth, y + halfHeight); // right wall
      this.walls[2] = new Wall(x + halfWidth, y + halfHeight, x - halfWidth, y + halfHeight); // bottom wall
      this.walls[3] = new Wall(x - halfWidth, y + halfHeight, x - halfWidth, y - halfHeight); // left wall

      this.className = BOX_CLASS_NAME;
    }
  
    show() 
    {
      // set color and weight 
      noStroke();
      fill('red');

      rect(this.walls[0].a.x, this.walls[0].a.y, this.width, this.height);
      // draw it 
      /*
      for (let wall of this.walls) {
        wall.show();
      }
      */
    
    }
  }
  