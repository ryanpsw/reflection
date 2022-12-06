class RayEmitter
 {
    constructor(pos, normalizedDirection) 
    {
      this.pos = pos;
      this.ray = new Ray(this.pos, normalizedDirection);
      // this.step = 0;
    }
  
    updatePos(x, y) 
    {
      // just a little fun!
      /*
      this.step += 0.01;
      this.ray.dir.x = 1 * cos(this.step);
      this.ray.dir.y = 1 * sin(this.step);
      this.ray.dir.normalize();
      */

      this.pos.set(x, y);
    }
  
    look(obstructionsArray) 
    {
      this.resetAllWallsAndBoxes(obstructionsArray);
    
      this.ray.cast(obstructionsArray);
    }
  
    show() 
    {
      noStroke();
      fill(0);
      ellipse(this.pos.x, this.pos.y, 30);
      this.ray.show();
    }

    resetAllWallsAndBoxes(obstructionsArray)
    {
      for (let obstruction of obstructionsArray) {
        if(obstruction.className == WALL_CLASS_NAME)
        {
          obstruction.isHitByRay = false;
        }

        if(obstruction.className == BOX_CLASS_NAME)
        {
          obstruction.resetWalls();
        }
      }
    }
  }
  