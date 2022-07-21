class Room{
    constructor(scalarX,scalarY){
      this.points = [];
      this.margin = width/16;
      this.scalarX = scalarX-this.margin;
      this.scalarY = scalarY-this.margin;
      for(let i = 0; i < 8; i++){
        this.points[i] = new Point(0,0,0);
      }
      
  
      
      this.vectors = [];
      this.resetVectors();
      this.loc = [];
    }
    resetVectors(){
      this.vectors[0] = new createVector(-this.scalarX,-this.scalarY,0);
      this.vectors[1] = new createVector(-this.scalarX, this.scalarY, 0);
      this.vectors[2] = new createVector(this.scalarX, this.scalarY, 0);
      this.vectors[3] = new createVector(this.scalarX,-this.scalarY,0);
      this.vectors[4] = new createVector(-this.scalarX, this.scalarY, -depth);
      this.vectors[5] = new createVector(-this.scalarX,-this.scalarY,-depth);
      this.vectors[6] = new createVector(this.scalarX,-this.scalarY,-depth);
      this.vectors[7] = new createVector(this.scalarX, this.scalarY, -depth);
    }
    update(){
  
      for(let i = 0; i < this.vectors.length; i++){
        this.loc[i] = this.vectors[i].copy();
      }
      for(let i = 4; i < this.vectors.length; i++){
  
        this.loc[i] = rotateAround(this.loc[i],createVector(0,1,0),rx);
        this.loc[i] = rotateAround(this.loc[i],createVector(-1,0,0),ry);
        this.points[i] = new Point(this.loc[i].x,this.loc[i].y,this.loc[i].z);
        this.points[i-4] = new Point(this.vectors[i-4].x,this.vectors[i-4].y,this.vectors[i-4].z)
      }
    }
    display(){
  
      let s = 1.1666;
      beginShape(); //BACKFACE
        for(let i = 4; i < 8; i++){
          vertex(this.loc[i].x,this.loc[i].y,this.loc[i].z,this.vectors[i].x*s+width/2,this.vectors[i].y*s+height/2)
        }
      endShape(CLOSE); 
  
      beginShape(); //LEFTFACE
        for(let i = 4; i < 6; i++){
          vertex(this.loc[i].x,this.loc[i].y,this.loc[i].z,0,this.vectors[i].y*s+height/2)
        }
      for(let i =0; i < 2; i++){
          vertex(this.loc[i].x,this.loc[i].y,this.loc[i].z,width,this.vectors[i].y*s+height/2)
        }
      endShape(CLOSE); 
      
      beginShape(); //RIGHTFACE
        for(let i = 6; i < 8; i++){
          vertex(this.loc[i].x,this.loc[i].y,this.loc[i].z,0,this.vectors[i].y*s+height/2)
        }
      for(let i =2; i < 4; i++){
          vertex(this.loc[i].x,this.loc[i].y,this.loc[i].z,width,this.vectors[i].y*s+height/2)
        }
      endShape(CLOSE); 
  
      beginShape(); //BOTTOMFACE
  
      for(let i =1; i < 3; i++){
          vertex(this.loc[i].x,this.loc[i].y,this.loc[i].z,this.vectors[i].x*s+width/2,height)
        }
      vertex(this.loc[7].x,this.loc[7].y,this.loc[7].z,this.vectors[7].x*s+width/2,0)
      vertex(this.loc[4].x,this.loc[4].y,this.loc[4].z,this.vectors[4].x*s+width/2,0)
      endShape(CLOSE); 
      
      beginShape(); //TOPFACE
  
      for(let i =5; i < 7; i++){
          vertex(this.loc[i].x,this.loc[i].y,this.loc[i].z,this.vectors[i].x*s+width/2,height)
        }
      vertex(this.loc[3].x,this.loc[3].y,this.loc[3].z,this.vectors[3].x*s+width/2,0)
      vertex(this.loc[0].x,this.loc[0].y,this.loc[0].z,this.vectors[0].x*s+width/2,0)
      endShape(CLOSE); 
      
      
      
      
    }
    displayFace(){
      noStroke();
      ortho();
      translate(0,0,50);
      let margin = this.margin;
      push();
      
      translate(-this.scalarX-margin,-this.scalarY-margin,0);
  
      beginShape();//FRONT FACE
      vertex(0,0,0,-margin,-margin);
      vertex(width,0,0,width+margin,-margin)
      vertex(width-margin,margin,0,width,0)
      vertex(margin,margin,0,0,0);
      endShape(CLOSE)
      
      beginShape();//FRONT FACE
      vertex(0,0,0,-margin,-margin);
      vertex(0,height,0,-margin,height+margin)
      vertex(margin,height-margin,0,0,height)
      vertex(margin,margin,0,0,0);
      endShape(CLOSE)
      
      beginShape();//FRONT FACE
      vertex(width,0,0,width+margin,-margin);
      vertex(width,height,0,width+margin,height+margin)
      vertex(width-margin,height-margin,0,width,height)
      vertex(width-margin,margin,0,width,0);
      endShape(CLOSE)
      
      beginShape();//FRONT FACE
      vertex(0,height,0,-margin,height+margin);
      vertex(width,height,0,width+margin,height+margin)
      vertex(width-margin,height-margin,0,width,height)
      vertex(margin,height-margin,0,0,height);
      endShape(CLOSE)
      pop();
      perspective();
    }
  }