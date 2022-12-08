class RayEmitter
 {
    constructor(pos, normalizedDirection, isRayVisible, image) 
    {
      this.pos = pos;
      this.ray = new Ray(this.pos, normalizedDirection);
      this.isRayVisible = isRayVisible;
      this.image = image;
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
      if(this.isRayVisible) 
      {
        this.ray.show();
      }

      image(this.image, this.pos.x - this.image.width/2, this.pos.y - this.image.height/2);
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
  