let obstructions = [];
let ray;
let rayEmitter;

function setup() 
{
  createCanvas(800, 600);

  obstructions[0] = new Mirror(30, 380, 240, 390);
  obstructions[1] = new Mirror(200, 20, 410, 10);
  obstructions[2] = new Mirror(360, 420, 550, 400);
  obstructions[3] = new Mirror(500, 80, 710, 70);

  obstructions[4] = new Wall(660, 420, 750, 420);

  obstructions[5] = new Box(720, 300, 50, 100);

  rayEmitter = new RayEmitter(createVector(width/2, height/2), createVector(15, 17).normalize());
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


