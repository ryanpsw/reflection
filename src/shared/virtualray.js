class VirtualRay
{
    constructor(rayEmitter, box, willFlipUpsideDownIfApplicable)
    {
        this.rayEmitter = rayEmitter;
        this.box = box;
        this.willFlipUpsideDownIfApplicable = willFlipUpsideDownIfApplicable;
    }

    tryShow()
    {
        if(this.box.isBoxHit())
        {
          let chainedRaysNum = this.rayEmitter.getChainedRayNum();
          let imgGemSmall = this.rayEmitter.image;
      
          if(chainedRaysNum > 1)
          {
            let c = color(130, 130, 130, 155);
            fill(c);
            let endpoint = this.rayEmitter.getChainedRayEndpoint();
            circle(endpoint.x, endpoint.y, 10);
        
            let lastRay = this.rayEmitter.getChainedRayLast();
            let scalar = this.rayEmitter.getChainedMagnitude();
            let invertedDir = createVector(lastRay.pos.x + lastRay.dir.x * -scalar, lastRay.pos.y + lastRay.dir.y * -scalar);
        
            LineRenderer.drawLine(invertedDir, endpoint, true, true, c);
        
            let picX = invertedDir.x - imgGemSmall.width/2;
            let picY = invertedDir.y - imgGemSmall.height/2;
        
            let shouldFlipUpsideDown =  this.willFlipUpsideDownIfApplicable && chainedRaysNum % 2 == 0;

            if(shouldFlipUpsideDown)
            {
                push();
                translate(picX, picY);
                rotate(PI);
                tint(255, 125);
                image(imgGemSmall, -imgGemSmall.width, -imgGemSmall.height);
                pop();
            }
            else 
            {
                image(imgGemSmall, picX, picY);
            }
          }
        }
    }
}