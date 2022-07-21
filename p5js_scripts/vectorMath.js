function rotateAround(vect, axis, angle) {
    // Make sure our axis is a unit vector
    axis = p5.Vector.normalize(axis);
  
    return p5.Vector.add(
      p5.Vector.mult(vect, cos(angle)),
      p5.Vector.add(
        p5.Vector.mult(
          p5.Vector.cross(axis, vect),
          sin(angle)
        ),
        p5.Vector.mult(
          p5.Vector.mult(
            axis,
            p5.Vector.dot(axis, vect)
          ),
          (1 - cos(angle))
        )
      )
    );
  }