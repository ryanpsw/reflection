class LineRenderer
{
  static drawLine(v1, v2, isDashedLine, isPointyAtEnd, color)
  {
    push();

    strokeCap(ROUND);
    stroke(color);
    fill(color);

    if(isDashedLine)
    {
        drawingContext.setLineDash([5, 7]);
    }

    if(isPointyAtEnd)
    {
      // Fix the line sticking out of the arrow problem!
      let origV = v2.copy().sub(v1);
      let newV2 = v1.copy().add(p5.Vector.mult(origV, (origV.mag()-15)/origV.mag()));
      line(v1.x, v1.y, newV2.x, newV2.y);
    }
    else
    {
      line(v1.x, v1.y, v2.x, v2.y);
    }

    drawingContext.setLineDash([]);

    if(isPointyAtEnd)
    {
      this.drawArrow(v1, v2.copy().sub(v1), color);
    }

    pop();

  }
  
  static drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    fill(myColor);
    translate(base.x, base.y);
    rotate(vec.heading());
    let arrowSize = 10;
    translate(vec.mag() - arrowSize, 0);
    triangle(-arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2, 0, 0);
    pop();
  }

  static drawLetter(pos, charNum, color)
  {
    push();
    noStroke();
    fill(color);
    textSize(24);
    textStyle(ITALIC);
    text(char(charNum), pos.x - 23 , pos.y - 20);
    pop();
  }
}