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
  createCanvas(800, 600);

  TextUtil.setNextPageHyperLink('06');

  eye = new Box(100, 480, imgEyeNormal.width, imgEyeNormal.height, imgEyeNormal, imgEyeHit);

  obstructions = [];
  obstructions[0] = new Mirror(320, 300, 450, 300);
  obstructions[1] = eye;

  rayEmitter = new RayEmitter(
    createVector(620, 470), // pos
    createVector(-7, 5).normalize(), // normalizedDirection
    true,  //isRayVisible
    imgGemSmall, //image
    true, //shouldShowDial
    imgDragMe,//imgDragMe
    97);// shouldShowLetterCharNum, 97 is 'a'

  virtualRay = new VirtualRay(rayEmitter, eye, false, 120); // 120 is 'x'

  formulaStr = "";
}

function draw() {
  clear();
  background('rgb(240,240,240)');

  TextUtil.setSlideText('05. \nHere is an easy way to understand how the position of an object corresponds with where you perceive its virtual image in the reflections.\n\n' + formulaStr);

  for (let obstruction of obstructions) {
    obstruction.show();
  }

  rayEmitter.updatePos();  
  rayEmitter.look(obstructions);
  rayEmitter.show();

  virtualRay.tryShow();
  formulaStr = TextUtil.getLineSegmentFormula(rayEmitter, virtualRay, eye);
}

function mousePressed() {
  rayEmitter.checkMousePressed();
}

function mouseReleased() {
  rayEmitter.checkMouseReleased();
}
