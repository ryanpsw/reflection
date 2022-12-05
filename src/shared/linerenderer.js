class LineRenderer
{
  static drawLine(v1, v2, isDashedLine, isPointyAtEnd)
  {
    push();

    if(isDashedLine)
    {
        drawingContext.setLineDash([5, 7]);
    }

    line(v1.x, v1.y, v2.x, v2.y);

    drawingContext.setLineDash([]);

    // Reference: https://stackoverflow.com/questions/44874243/drawing-arrows-in-p5js
    if(isPointyAtEnd)
    {
        let offset = 15;

        fill(0);

        // this code is to make the arrow point
        push() //start new drawing state
        var angle = atan2(v1.y - v2.y, v1.x - v2.x); //gets the angle of the line
        translate(v2.x, v2.y); //translates to the destination vertex
        rotate(angle-HALF_PI); //rotates the arrow point
        triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
        pop();
    }

    pop();

  }
}