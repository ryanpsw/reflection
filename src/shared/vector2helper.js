class Vector2Helper
{
  static isValid(v2)
  {
    return v2.x != NaN && v2.x != Infinity && 
           v2.y != NaN && v2.y != Infinity 
  }
}
