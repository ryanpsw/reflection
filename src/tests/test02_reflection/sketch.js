let mirrors = [];
let ray;
let rayEmitter;

function setup() 
{
  createCanvas(800, 600);

  mirrors[0] = new Mirror(30, 380, 240, 390);
  mirrors[1] = new Mirror(200, 20, 410, 10);
  mirrors[2] = new Mirror(360, 420, 550, 400);
  mirrors[3] = new Mirror(500, 80, 710, 70);

  rayEmitter = new RayEmitter(createVector(width/2, height/2), createVector(5, 17).normalize());
}

function draw() {
  clear();
  background(255);

  for (let mirror of mirrors) {
    mirror.show();
  }

  rayEmitter.updatePos(mouseX, mouseY);
  
  
  
  rayEmitter.look(mirrors);
  rayEmitter.show();
}


