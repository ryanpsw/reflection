class RayEmitter
 {
    constructor(pos, normalizedDirection, isRayVisible, image, shouldShowDial) 
    {
      this.pos = pos;
      this.ray = new Ray(this.pos, normalizedDirection);
      this.isRayVisible = isRayVisible;
      this.image = image;
      this.dial = shouldShowDial ? new CustomDial(this.pos.x, this.pos.y, 80, false) : null;
    }
  
    updatePos() 
    {
      if(this.dial) 
      {
        this.dial.updatePos();
        this.ray.dir = this.dial.getNormalizedDir();
      }
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

      if(this.dial) this.dial.show();
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

    checkMousePressed()
    {
      if(this.dial) this.dial.checkMousePressed();
    }

    checkMouseReleased()
    {
      if(this.dial) this.dial.checkMouseReleased();
    }
  }
  