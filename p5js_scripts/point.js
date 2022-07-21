class Point{
    constructor(x,y,z){
      this.loc = createVector(x,y,z);
    }
    display(){
      push();
        translate(this.loc.x,this.loc.y,this.loc.z);
        point(0,0,0);
      pop();
    }
  }