let mirrors = [];
let ray;
let rayEmitter;

function setup() 
{
  createCanvas(800, 600);

  let x1 = random(width);
  let x2 = random(width);
  let y1 = random(height);
  let y2 = random(height);
  mirrors[0] = new Mirror(x1, y1, x2, y2);
  rayEmitter = new RayEmitter();
}

function draw() {
  clear();
  background(220);

  for (let mirror of mirrors) {
    mirror.show();
  }

  rayEmitter.updatePos(mouseX, mouseY);
  
  
  
  rayEmitter.look(mirrors);
  rayEmitter.show();
}


