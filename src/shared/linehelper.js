class LineHelper
{
  // Given line A (from point start1 to end1) and line B (from point start2 to end2),
  // Return a intersection point in vector2 if the 2 line segments do intersect. 
  // Returns a vector2(NaN, NaN) if they do not intersect. 
  // 
  // Done by using a cross product, see references below:
  // Reference: https://twitter.com/keenanisalive/status/1435966795454681091?lang=en
  // Reference: https://imois.in/posts/line-intersections-with-cross-products/
  // Reference: https://www.codeproject.com/Tips/862988/Find-the-Intersection-Point-of-Two-Line-Segments
  // 
  // For reference only, it can also be done without dotProduct (but principle is the same):
  // Reference: https://editor.p5js.org/mwburke/sketches/h1ec1s6LG
  static getIntersection(start1, end1, start2, end2)
  {
    // Append 1 to all points. (x, y) -> (x, y, 1)
    // Get equations of lines using cross product & solve
    let l1 = this.toProjPlane(start1).cross(this.toProjPlane(end1));
    let l2 = this.toProjPlane(start2).cross(this.toProjPlane(end2));
    let sol = l2.cross(l1);

    if(sol.z == 0)
    {
      // No solution - result 'at infinity' in projective space.
      return createVector(NaN, NaN);
    }
    else
    {
      let intersection = createVector(sol.x/sol.z, sol.y/sol.z);

      if(this.isBetween(start1, end1, intersection) && this.isBetween(start2, end2, intersection))
      {
        return intersection;
      }
      
      // No solution - the intersection is NOT within the boundaries of both lines
      return createVector(NaN, NaN);
    }
  }

  // Creates a Vector3 out of a Vector2, with z being 1
  // Append 1 to all points. (x, y) -> (x, y, 1)
  static toProjPlane(p)
  {
    return createVector(p.x, p.y, 1);
  }

  // Determine point c is on the line segment formed by point a and b, using cross product and dot product.
  // Reference: https://matlabgeeks.com/tips-tutorials/computational-geometry/check-if-a-point-is-on-a-line-segment/
  // Reference: https://lucidar.me/en/mathematics/check-if-a-point-belongs-on-a-line-segment/
  // Reference: https://stackoverflow.com/questions/328107/how-can-you-determine-a-point-is-between-two-other-points-on-a-line-segment
  // Reference: https://stackoverflow.com/questions/7050186/find-if-point-lies-on-line-segment
  static isBetween(a, b, c)
  {
    let ab = createVector(b.x - a.x, b.y - a.y);
    let ac = createVector(c.x - a.x, c.y - a.y);

    let crossProduct = ab.cross(ac);

    if(crossProduct.mag > Number.EPSILON)
    {
        return false;
    }
    let dotAB = ab.dot(ab);
    let dotAC = ab.dot(ac);

    if(dotAC == Number.EPSILON || dotAC == dotAB)
    {
      return true;
    }
    else if (dotAC > Number.EPSILON && dotAC < dotAB)
    {
      return true;
    }

    return false;
 }

}