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

  TextUtil.setNextPageHyperLink('00');

  /*
  obstructions[0] = new Mirror(360, 420, 550, 400);
  obstructions[1] = new Box(720, 300, 70, 50);
  */
  
  eye = new Box(720, 300, imgEyeNormal.width, imgEyeNormal.height, imgEyeNormal, imgEyeHit);

  obstructions = [];
  obstructions[0] = new Mirror(30, 380, 240, 390);
  obstructions[1] = new Mirror(200, 20, 410, 10);
  obstructions[2] = new Mirror(360, 400, 550, 400);
  obstructions[3] = new Mirror(500, 80, 710, 70);
  obstructions[4] = eye;
  obstructions[5] = new Wall(660, 420, 750, 420);
  obstructions[6] = new Wall(370, 120, 460, 120);

  rayEmitter = new RayEmitter(
    createVector(width/2, height/2), // pos
    createVector(1, -1).normalize(), //normalizedDirection
    true, //isRayVisible
    imgGemSmall, //image
    true, //shouldShowDial
    imgDragMe,//imgDragMe
    true); // shouldShowLetter

  hSlider = new CustomSlider(510, 10, 650, 10, imgHandleH, false, true);
  vSlider = new CustomSlider(10, 200, 10, 400, imgHandleV, true, true);

  dial = new CustomDial(700, 500, 75, true, 3*PI/4);

  virtualRay = new VirtualRay(rayEmitter, eye, true, 120); // 120 is 'x'

  formulaStr = "";
}

function draw() 
{
  clear();
  background(255);
  TextUtil.setSlideText('0X. \nText \nMore Text Here\n' + formulaStr);

  for (let obstruction of obstructions) {
    obstruction.show();
  }

  rayEmitter.updatePos();  
  rayEmitter.look(obstructions);
  rayEmitter.show();

  hSlider.updatePos();
  hSlider.show();

  vSlider.updatePos();
  vSlider.show();

  dial.updatePos(dial.pos.x, dial.pos.y);
  dial.show();

  virtualRay.tryShow();

  formulaStr = TextUtil.getLineSegmentFormula(rayEmitter, virtualRay, eye);
}

function mousePressed() {
  hSlider.checkMousePressed();
  vSlider.checkMousePressed();
  dial.checkMousePressed();
  rayEmitter.checkMousePressed();
}

function mouseReleased() {
  hSlider.checkMouseReleased();
  vSlider.checkMouseReleased();
  dial.checkMouseReleased();
  rayEmitter.checkMouseReleased();
}

