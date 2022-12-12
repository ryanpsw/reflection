const dragTouchRadius = 50;

class RayEmitter
 {
    constructor(pos, normalizedDirection, isRayVisible, image, shouldShowDial, imgDragMe, shouldShowLetterCharNum, shouldDrawAngle) 
    {
      this.pos = pos;
      this.ray = new Ray(this.pos, normalizedDirection, shouldShowLetterCharNum, shouldDrawAngle); 
      this.isRayVisible = isRayVisible;
      this.image = image;

      let radianAngleDir = normalizedDirection.angleBetween(createVector(1, 0));
      this.dial = shouldShowDial ? new CustomDial(this.pos.x, this.pos.y, 70, false, radianAngleDir) : null;
      this.imgDragHandle = imgDragMe;
      this.isDragging = false;
    }
  
    getChainedRayEndpoint()
    {
      return this.ray.getChainedRayEndpoint();
    }

    getChainedRayLast()
    {
      return this.ray.getChainedRayLast();
    }

    getChainedRayNum()
    {
      return this.ray.getChainedRayNum();
    }

    getChainedMagnitude()
    {
      return this.ray.getChainedMagnitude();
    }
    
    getChainedCharNums()
    {
      let charNums = [];
      this.ray.getChainedCharNums(charNums);
      return charNums;
    }

    updatePos() 
    {
      if(this.imgDragHandle && this.isDragging && this.isWithinBound())
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

    isWithinBound()
    {
      let threshold = 10;
      return mouseX > threshold && mouseX < width - threshold && mouseY > threshold && mouseY < height - threshold;
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
  