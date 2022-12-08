const BOX_CLASS_NAME = "Box";

class Box
{
    constructor(x, y, width, height, imageNormal, imageHit) 
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

      this.imageNormal = imageNormal;
      this.imageHit = imageHit;
    }
  
    show() 
    {
      if(this.isBoxHit())
      {
        image(this.imageHit, this.pos.x - this.imageHit.width/2, this.pos.y - this.imageHit.height/2);
      }
      else
      {
        image(this.imageNormal, this.pos.x - this.imageNormal.width/2, this.pos.y - this.imageNormal.height/2);
      }
    }

    isBoxHit()
    {
      for (let wall of this.walls) {
        if(wall.isHitByRay)
        {
          return true;
        }
      }

      return false;
    }

    resetWalls()
    {
      for (let wall of this.walls) 
      {
        wall.isHitByRay = false;
      }
    }
  }
  