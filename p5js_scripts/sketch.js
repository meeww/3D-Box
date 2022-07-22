let room;
let depth = 500;
let rx = 0;
let ry = 0;
let orx = 0;
let ory = 0;
let objSca = 100;
let br = 100;

offsetGyroX = 0;
offsetGyroY = 0;

let wallShader;
let wallShaderTexture;
let objShader;
let test;
let metalTextures = [];

function setupShaders(){
  wallShader.setUniform('u_resolution', [width, height,depth]);
  objShader.setUniform('u_resolution', [width, height,depth]);
}
function preload(){
  wallShader= loadShader('shaders/wall.vert','shaders/wall.frag');
  objShader= loadShader('shaders/obj.vert','shaders/obj.frag');
  test = loadImage("textures/metal0/albedo.png")
  for(let i = 0; i < 4; i++){
    metalTextures[i] = [];
    metalTextures[i][0] = loadImage("textures/metal"+i+"/albedo.png")
    metalTextures[i][1] = loadImage("textures/metal"+i+"/roughness.png")
    metalTextures[i][2] = loadImage("textures/metal"+i+"/normal.png")
  }
}
function setup() {
  pixelDensity(1);

  createCanvas(innerWidth, innerHeight, WEBGL);
  wallShaderTexture = createGraphics(width,height,WEBGL);
  wallShaderTexture.noStroke();
  room = new Room(width/2,height/2);
  noStroke();
  smooth()
  setupShaders();
  deviceSetup();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function mouseWheel(event) {
  if(keyIsDown(SHIFT)){
    depth += event.delta;
    room.resetVectors()

  }
  else{
  objSca+=event.delta/10;
  }

}
function mouseReleased(){
  if(typeof(DeviceOrientationEvent.requestPermission)!='undefined'){
    offsetGyroX = rotationY/100;
    offsetGyroY = rotationX/100;
  }
}
function draw() {
  wallShaderTexture.shader(wallShader);

  wallShaderTexture.rect(-width/2,-height/2,width,height);
  push();
  texture(metalTextures[0][0]);
  

  room.update();
  room.display();
    room.displayFace();
  pop();
  push();
  if (!permissionGranted) return;
  if(typeof(DeviceOrientationEvent.requestPermission)!='undefined'){
    rx = constrain(-rotationY/100+offsetGyroX, -0.5, 0.5);
    ry = constrain(-rotationX/100+offsetGyroY, -0.5, 0.5);
  }

  rotateX(-ry);
  rotateY(rx);
  translate(0,0,-depth/3);
  rotateX(-ory);
  rotateY(orx);
 
   resetShader();
   shader(objShader)
  box(objSca);
  pop();


  
}

function mouseDragged(){

    let mag = createVector(pmouseX,pmouseY).sub(createVector(mouseX,mouseY))
    if(mouseButton==CENTER){

    orx-=mag.x/50;
    ory-=mag.y/50;
    }
    if(mouseButton==LEFT){
          rx-=mag.x/75;
          ry-=mag.y/75;
      rx = constrain(rx,-0.5,0.5);
      ry = constrain(ry,-0.5,0.5)
    }
  
}


