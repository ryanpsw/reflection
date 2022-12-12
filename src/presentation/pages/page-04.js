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

  TextUtil.setNextPageHyperLink('05');

  //--------------------------------------------
  // Diagram on the left
  //--------------------------------------------

  eye1 = new Box(80, 550, imgEyeNormal.width, imgEyeNormal.height, imgEyeNormal, imgEyeHit);

  obstructions1 = [];
  obstructions1[0] = eye1;

  rayEmitter1 = new RayEmitter(
    createVector(150, 140), // pos
    createVector(-2, 10).normalize(), // normalizedDirection
    true, //isRayVisible
    imgGemSmall, //image
    false, //shouldShowDial
    null, //imgDragMe
    120); // shouldShowLetterCharNum, 120 is 'x'

  //--------------------------------------------
  // Diagram on the right
  //--------------------------------------------

  eye2 = new Box(480, 550, imgEyeNormal.width, imgEyeNormal.height, imgEyeNormal, imgEyeHit);

  obstructions2 = [];
  obstructions2[0] = new Mirror(530, 200, 650, 200);
  obstructions2[1] = eye2;

  rayEmitter2 = new RayEmitter(
    createVector(621, 320), // pos
    createVector(-3.2, -10).normalize(), // normalizedDirection
    true, //isRayVisible
    imgGemSmall, //image
    false, //shouldShowDial
    null, //imgDragMe
    97); // shouldShowLetterCharNum, 120 is 'x'

}

function draw() {
  clear();
  background('rgb(240,240,240)');

  TextUtil.setSlideText('04. \nYou would perceive both gems as equal size when x = a + b.\n\n');

  //--------------------------------------------
  // Diagram on the left
  //--------------------------------------------

  for (let obstruction of obstructions1) {
    obstruction.show();
  }

  rayEmitter1.updatePos();  
  rayEmitter1.look(obstructions1);
  rayEmitter1.show();

  drawThinkBubble(eye1.pos);

  let gemCenterPos = createVector(eye1.pos.x + 205, eye1.pos.y -115);

  drawBigGem(gemCenterPos, 0.5);

  //--------------------------------------------
  // Diagram on the right
  //--------------------------------------------

  for (let obstruction of obstructions2) {
    obstruction.show();
  }

  rayEmitter2.updatePos();  
  rayEmitter2.look(obstructions2);
  rayEmitter2.show();

  drawThinkBubble(eye2.pos);

  let gemCenterPos2 = createVector(eye2.pos.x + 205, eye1.pos.y -115);

  drawBigGem(gemCenterPos2, 0.5);

}

function drawThinkBubble(anchorPos)
{
  push();
  stroke('black');
  strokeWeight(1);
  rect(anchorPos.x + 55, anchorPos.y - 2, 8, 8, 3);
  rect(anchorPos.x + 75, anchorPos.y - 10, 10, 10, 4);
  rect(anchorPos.x + 95, anchorPos.y - 25, 12, 12, 5);
  rect(anchorPos.x + 105, anchorPos.y - 190, 200, 150, 10);
  pop();
}

function drawBigGem(centerPos, scale) // scale is 0 - 1
{
  let targetWidth = imgGemLarge.width * scale;
  let targetHeight = imgGemLarge.height * scale;
  image(imgGemLarge, centerPos.x - targetWidth/2, centerPos.y - targetHeight/2, targetWidth, targetHeight); 
}
