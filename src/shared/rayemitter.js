class RayEmitter
 {
    constructor(pos, normalizedDirection, isRayVisible, image, shouldShowDial, imgDragHandle) 
    {
      this.pos = pos;
      this.ray = new Ray(this.pos, normalizedDirection);
      this.isRayVisible = isRayVisible;
      this.image = image;
      this.dial = shouldShowDial ? new CustomDial(this.pos.x, this.pos.y, 80, false) : null;
      this.imgDragHandle = imgDragHandle;
      this.isDragging = false;
    }
  
    updatePos() 
    {
      if(this.isDragging)
      {
          this.pos.x = mouseX;
          this.pos.y = mouseY;
          if(this.dial) 
          {
            let diff = this.dial.circlePos.copy().sub(this.dial.pos);
            this.dial.pos.x = this.pos.x;
            this.dial.pos.y = this.pos.y;
            this.dial.circlePos.x = this.dial.pos.x + diff.x;
            this.dial.circlePos.y = this.dial.pos.y + diff.y;
          }
      }

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

      if(this.imgDragHandle)
      {
        let shiftX = 30;
        image(this.imgDragHandle, this.pos.x + shiftX, this.pos.y - this.imgDragHandle.height/2);
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
        mouseX > this.pos.x   && 
        mouseX < this.pos.x + this.imgDragHandle.width  && 
        mouseY > this.pos.y - this.imgDragHandle.height /2 && 
        mouseY < this.pos.y + this.imgDragHandle.height /2
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
  