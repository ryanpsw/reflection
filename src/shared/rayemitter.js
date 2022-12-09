const dragTouchRadius = 50;

class RayEmitter
 {
    constructor(pos, normalizedDirection, isRayVisible, image, shouldShowDial, imgDragMe) 
    {
      this.pos = pos;
      this.ray = new Ray(this.pos, normalizedDirection);
      this.isRayVisible = isRayVisible;
      this.image = image;
      this.dial = shouldShowDial ? new CustomDial(this.pos.x, this.pos.y, 80, false) : null;
      this.imgDragHandle = imgDragMe;
      this.isDragging = false;
    }
  
    updatePos() 
    {
      if(this.isDragging)
      {
          this.pos.x = mouseX;
          this.pos.y = mouseY;
      }

      if(this.dial) 
      {
        this.dial.updatePos(this.pos.x, this.pos.y);
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

      if(this.imgDragHandle)
      {
        let shiftX = 0;
        image(this.imgDragHandle, this.pos.x - 18, this.pos.y - this.imgDragHandle.height/2 - 46);
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

    checkMousePressed()
    {
      if(this.dial) this.dial.checkMousePressed();

      if(
        this.imgDragHandle != null && 
        dist(mouseX, mouseY, this.pos.x, this.pos.y) < dragTouchRadius
      )  
      {
          this.isDragging = true;
      }

    }

    checkMouseReleased()
    {
      if(this.dial) this.dial.checkMouseReleased();

      this.isDragging = false;
    }
  }
  