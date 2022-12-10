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

  /*
  obstructions[0] = new Mirror(360, 420, 550, 400);
  obstructions[1] = new Box(720, 300, 70, 50);
  */
  
  let box = new Box(720, 300, imgEyeNormal.width, imgEyeNormal.height, imgEyeNormal, imgEyeHit);

  obstructions[0] = new Mirror(30, 380, 240, 390);
  obstructions[1] = new Mirror(200, 20, 410, 10);
  obstructions[2] = new Mirror(360, 420, 550, 400);
  obstructions[3] = new Mirror(500, 80, 710, 70);
  obstructions[4] = box;
  obstructions[5] = new Wall(660, 420, 750, 420);
  obstructions[6] = new Wall(370, 120, 460, 120);

  rayEmitter = new RayEmitter(
    createVector(width/2, height/2), 
    createVector(1, -1).normalize(), 
    true, 
    imgGemSmall, 
    true, 
    imgDragMe);

  hSlider = new CustomSlider(510, 10, 650, 10, imgHandleH, false, true);
  vSlider = new CustomSlider(10, 200, 10, 400, imgHandleV, true, true);

  dial = new CustomDial(700, 500, 75, true, 3*PI/4);
}

function draw() {
  clear();
  background(255);

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
