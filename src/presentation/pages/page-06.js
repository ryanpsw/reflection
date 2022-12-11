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

  let a = createA('../../tests/test02_reflection/index.html', 'Next Page');
  a.position(700, 550);

  let box = new Box(100, 480, imgEyeNormal.width, imgEyeNormal.height, imgEyeNormal, imgEyeHit);

  obstructions = [];
  obstructions[0] = new Mirror(170, 350, 300, 350);
  obstructions[1] = new Mirror(330, 480, 460, 480);
  obstructions[2] = box;

  rayEmitter = new RayEmitter(
    createVector(700, height/2), 
    createVector(-5, -5).normalize(), 
    true, 
    imgGemSmall, 
    true, 
    imgDragMe);

  virtualRay = new VirtualRay(rayEmitter, box, true);
}

function draw() {
  clear();
  background('rgb(240,240,240)');

  textSize(18);
  fill('black');
  textStyle(NORMAL);
  textWrap(WORD);
  text('06. \nNow let\'s try with 2 mirrors. \nAdjust the gem and its ray until the ray hits the eye:', 30, 30, width-50);

  for (let obstruction of obstructions) {
    obstruction.show();
  }

  rayEmitter.updatePos();  
  rayEmitter.look(obstructions);
  rayEmitter.show();

  virtualRay.tryShow();
}

function mousePressed() {
  rayEmitter.checkMousePressed();
}

function mouseReleased() {
  rayEmitter.checkMouseReleased();
}
