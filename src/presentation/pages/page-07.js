function preload() {
  imgGemSmall = loadImage('../../assets/gem_small.png');

  imgEyeNormal = loadImage('../../assets/eye_normal.png');
  imgEyeHit = loadImage('../../assets/eye_hit.png');

  imgHandleV = loadImage('../../assets/handle_v.png');
  imgHandleH = loadImage('../../assets/handle_h.png');

  imgDragMe = loadImage('../../assets/dragme.png');
}

function setup() 
{
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  TextUtil.setPrevPageHyperLink('06');

  eye = new Box(400, 420, imgEyeNormal.width, imgEyeNormal.height, imgEyeNormal, imgEyeHit);

  obstructions = [];
  obstructions[0] = new Mirror(325, 240, 325, 360);
  obstructions[1] = new Mirror(475, 240, 475, 360);
  obstructions[2] = eye;

  rayEmitter = new RayEmitter(
    createVector(400, 210), // pos
    createVector(0, -1).normalize(), // normalizedDirection
    true, //isRayVisible
    imgGemSmall, //image
    true, //shouldShowDial
    null, //imgDragMe
    97); // shouldShowLetterCharNum, 97 is 'a'

  virtualRay = new VirtualRay(rayEmitter, eye, false, 120); // 120 is 'x'

  formulaStr = "";
}

function draw() {
  clear();
  background('rgb(240,240,240)');

  TextUtil.setSlideText('07. \nLet\'s have some fun with 2 mirrors facing each other. How many gems would you see? \n\n' + formulaStr);

  for (let obstruction of obstructions) {
    obstruction.show();
  }

  rayEmitter.updatePos();  
  rayEmitter.look(obstructions);
  rayEmitter.show();

  virtualRay.tryShow();
  formulaStr = TextUtil.getLineSegmentFormula(rayEmitter, virtualRay, eye);

  TextUtil.setFooterText("(The slides end here. Thank you! )", 500, 500);
}

function mousePressed() {
  rayEmitter.checkMousePressed();
}

function mouseReleased() {
  rayEmitter.checkMouseReleased();
}
