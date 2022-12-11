class VirtualRay
{
    constructor(rayEmitter, box, willFlipUpsideDownIfApplicable, charNum)
    {
        this.rayEmitter = rayEmitter;
        this.box = box;
        this.willFlipUpsideDownIfApplicable = willFlipUpsideDownIfApplicable;
        this.charNum = charNum; // 65 is A, 66 is B, null means don't show char.
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
            //circle(endpoint.x, endpoint.y, 10);
        
            let lastRay = this.rayEmitter.getChainedRayLast();
            let scalar = this.rayEmitter.getChainedMagnitude();
            let invertedDir = createVector(lastRay.pos.x + lastRay.dir.x * -scalar, lastRay.pos.y + lastRay.dir.y * -scalar);
        
            LineRenderer.drawLine(invertedDir, endpoint, true, true, c);
        
            if(this.charNum != null)
            {
                let midPoint = createVector((invertedDir.x + endpoint.x) /2, (invertedDir.y + endpoint.y) /2);
                LineRenderer.drawLetter(midPoint, this.charNum, c);
            }

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
                push();
                tint(255, 125);
                image(imgGemSmall, picX, picY);
                pop();
            }
          }
        }
    }
}