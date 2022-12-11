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

  TextUtil.setNextPageHyperLink('07');

  box = new Box(100, 480, imgEyeNormal.width, imgEyeNormal.height, imgEyeNormal, imgEyeHit);

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

  virtualRay = new VirtualRay(rayEmitter, box, false, 120); // 120 is 'x'

  formulaStr = "";
}

function draw() {
  clear();
  background('rgb(240,240,240)');

  TextUtil.setSlideText('06. \nNow let\'s try with 2 mirrors. \nAdjust the gem and its ray until the ray hits the eye:\n\n' + formulaStr);

  for (let obstruction of obstructions) {
    obstruction.show();
  }

  rayEmitter.updatePos();  
  rayEmitter.look(obstructions);
  rayEmitter.show();

  virtualRay.tryShow();
  formulaStr = TextUtil.getLineSegmentFormula(rayEmitter, virtualRay, box);
}

function mousePressed() {
  rayEmitter.checkMousePressed();
}

function mouseReleased() {
  rayEmitter.checkMouseReleased();
}
