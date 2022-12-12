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
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  TextUtil.setNextPageHyperLink('04');
  TextUtil.setPrevPageHyperLink('02');

  eye = new Box(650, 250, imgEyeNormal.width, imgEyeNormal.height, imgEyeNormal, imgEyeHit);

  obstructions = [];
  obstructions[0] = eye;
  obstructions[1] = new Mirror(90, 480, 660, 480);

  rayEmitter = new RayEmitter(
    createVector(130, 340), // pos
    createVector(0, 10).normalize(), // normalizedDirection
    true, //isRayVisible
    imgGemSmall, //image
    false, //shouldShowDial
    null, //imgDragMe
    null, // shouldShowLetterCharNum
    true); // shouldDrawAngle

    hSlider = new CustomSlider(240, 480, 600, 480, imgHandleH, false, false);
}

function draw() {
  clear();
  background('rgb(240,240,240)');

  TextUtil.setSlideText('03. \nWhen a ray of light encounters a surface, the angles that the incoming and outgoing light make with the surface are equal.\n\n');

  for (let obstruction of obstructions) {
    obstruction.show();
  }

  rayEmitter.updatePos();  
  rayEmitter.look(obstructions);
  rayEmitter.show();

  hSlider.updatePos();
  hSlider.show();

  rayEmitter.ray.lookAt(hSlider.pos.x, hSlider.pos.y);
  //rayEmitter.pos.x = hSlider.pos.x;
}

function mousePressed() {
  rayEmitter.checkMousePressed();
  hSlider.checkMousePressed();

}

function mouseReleased() {
  rayEmitter.checkMouseReleased();
  hSlider.checkMouseReleased();
}
