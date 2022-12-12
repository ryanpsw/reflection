function preload() {
  imgGemSmall = loadImage('../../assets/gem_small.png');
  imgGemLarge = loadImage('../../assets/gem_large.png');

  imgEyeNormal = loadImage('../../assets/eye_normal.png');
  imgEyeHit = loadImage('../../assets/eye_hit.png');

  imgHandleV = loadImage('../../assets/handle_v.png');
  imgHandleH = loadImage('../../assets/handle_h.png');

  imgDragMe = loadImage('../../assets/dragme.png');
}

function setup() 
{
  createCanvas(800, 600);

  TextUtil.setNextPageHyperLink('02');

  eye = new Box(300, 450, imgEyeNormal.width, imgEyeNormal.height, imgEyeNormal, imgEyeHit);

  obstructions = [];
  obstructions[0] = eye;

  rayEmitter = new RayEmitter(
    createVector(300, 200), // pos
    createVector(0, 1).normalize(), // normalizedDirection
    true, //isRayVisible
    imgGemSmall, //image
    false, //shouldShowDial
    null, //imgDragMe
    null); // shouldShowLetterCharNum
}

function draw() {
  clear();
  background('rgb(240,240,240)');

  TextUtil.setSlideText('01. \nObject emits rays of light. Our eye receives the rays to form a perception.\n\n');

  for (let obstruction of obstructions) {
    obstruction.show();
  }

  rayEmitter.updatePos();  
  rayEmitter.look(obstructions);
  rayEmitter.show();

  drawThinkBubble(eye.pos);

  let gemCenterPos = createVector(eye.pos.x + 225, eye.pos.y -115);

  drawBigGem(gemCenterPos, 0.5);
}

function drawThinkBubble(anchorPos)
{
  push();
  stroke('black');
  strokeWeight(1);
  rect(anchorPos.x + 55, anchorPos.y - 2, 8, 8, 3);
  rect(anchorPos.x + 75, anchorPos.y - 10, 10, 10, 4);
  rect(anchorPos.x + 95, anchorPos.y - 25, 12, 12, 5);
  rect(anchorPos.x + 115, anchorPos.y - 200, 220, 170, 10);
  pop();
}

function drawBigGem(centerPos, scale) // scale is 0 - 1
{
  let targetWidth = imgGemLarge.width * scale;
  let targetHeight = imgGemLarge.height * scale;
  image(imgGemLarge, centerPos.x - targetWidth/2, centerPos.y - targetHeight/2, targetWidth, targetHeight); 
}

function mousePressed() {
  rayEmitter.checkMousePressed();
}

function mouseReleased() {
  rayEmitter.checkMouseReleased();
}
