let obstructions = [];
let ray;
let rayEmitter;

function preload() {
  imgGemSmall = loadImage('../../assets/gem_small.png');

  imgEyeNormal = loadImage('../../assets/eye_normal.png');
  imgEyeHit = loadImage('../../assets/eye_hit.png');

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

  rayEmitter = new RayEmitter(createVector(width/2, height/2), createVector(5, 17).normalize(), true, imgGemSmall);
}

function draw() {
  clear();
  background(255);

  for (let obstruction of obstructions) {
    obstruction.show();
  }

  rayEmitter.updatePos(mouseX, mouseY);
  
  rayEmitter.look(obstructions);
  rayEmitter.show();
}


