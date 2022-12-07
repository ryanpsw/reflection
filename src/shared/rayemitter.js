class RayEmitter
 {
    constructor(pos, normalizedDirection, isRayVisible) 
    {
      this.pos = pos;
      this.ray = new Ray(this.pos, normalizedDirection);
      this.isRayVisible = isRayVisible;
    }
  
    updatePos(x, y) 
    {
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
      
      if(this.isRayVisible) 
      {
        this.ray.show();
      }
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
  