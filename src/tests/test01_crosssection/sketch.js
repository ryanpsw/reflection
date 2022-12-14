function setup() {
  createCanvas(400, 400);

  let v1 = createVector(200 + (Math.random() - 0.5) * 350, 100);
  let v2 = createVector(200 + (Math.random() - 0.5) * 350, 300);
  let v3 = createVector(100, 200 + (Math.random() - 0.5) * 350);
  let v4 = createVector(300, 200 + (Math.random() - 0.5) * 350);

  stroke(0);
  strokeWeight(3);

  LineRenderer.drawLine(v1, v2, false, false);
  LineRenderer.drawLine(v3, v4, true, true);

  let crossPoint = LineHelper.getIntersection(v1, v2, v3, v4);

  if(Vector2Helper.isValid(crossPoint) && !crossPoint.mag() == 0)
  {
    noStroke();
    fill(255, 0, 0);
    ellipseMode(RADIUS);
    ellipse(crossPoint.x, crossPoint.y, 8);
  }
}

function draw() {
}


