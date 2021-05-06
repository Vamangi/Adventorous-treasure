var plr,plrImg,pI,p
var ground, groundImage,invisibleGround
var score=0,keys=0
var o1,o2,o3,obstaclesGroup
var coin,coinI,coinsGroup
var key,keyI,t,tI,keysGroup
//changed the order of play and end
var PLAY=1
var END=0
var gameState=PLAY
var win =false



function preload(){
//plrImg=loadAnimation("p1.png","p2.png","p4.png","p4.png","p5.png","p6.png","p7.png","p8.png")
  plrImg=loadAnimation("p1.png","p2.png","p3.png","p4.png","p6.png","p7.png","p8.png","p9.png")
  pI=loadImage("p1.png")
  
groundImage=loadImage("background.jpg")
  
coinI=loadImage("coin.png")
  
o1=loadImage("cactus.png")
o2=loadImage("fire.png")
o3=loadImage("stone.png")
  
keyI=loadImage("key.png")
tI=loadImage("treasure1.png")
  
}

function setup(){
  createCanvas(700,500);
  
 
  ground = createSprite(600,220,10,500);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6 

  plr = createSprite(50,380,20,50);
  plr.addAnimation("r",plrImg)
  plr.scale=1
  plr.setCollider("circle",15,20,50)
  plr.debug=false
  
  p = createSprite(50,380,20,50);
  p.addAnimation("r",pI)
  p.scale=1
  p.visible = false;

    
  
  invisibleGround = createSprite(200,490,400,10);
  invisibleGround.visible = false;
   t = createSprite(400,200,400,10);
  t.addImage("treasure",tI)
  t.visible = false;
  t.scale=0.4
  
  obstaclesGroup = new Group();
  coinsGroup = new Group();
  keysGroup    = new Group();

}

function draw(){

  background(255);
  drawSprites()
if(gameState===PLAY){
  
  if (ground.x < 200){
      ground.x = ground.width/2;
    }
  
  if (plr.isTouching(coinsGroup)){
    coinsGroup.destroyEach();
    score=score+1;
  }
  
  if (plr.isTouching(keysGroup)){
    keysGroup.destroyEach();
    keys=keys+1                     ;
  }
  if(keyDown("space")&&plr.y >= 160)  {
      plr.velocityY =-12;
    }
      plr.velocityY = plr.velocityY + 0.8

   if (plr.isTouching(obstaclesGroup)){
    gameState=END
     
  }
  
  if(keys>5&&score>10){
      t.visible = true;
    
    win=true
    gameState=END

  }
  
    
    spawnKeys()
    spawnObstacles()
    spawnCoins()
  
}else if(gameState===END){
    ground.velocityX = 0 
p.visible = true;
plr.visible = false;
  coinsGroup.setLifetimeEach(-1)
  keysGroup.setLifetimeEach(-1)
  obstaclesGroup.setLifetimeEach(-1)
  
    coinsGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    keysGroup.setVelocityXEach(0)

  
  if(win===true){
    textSize(40)
    fill("red")
    text("you won",300,350)
  }else{
    textSize(60)
  fill("red")
  text("YOU LOST",300,300)
  }
}
  
  
  plr.collide(invisibleGround);
  
  
   
  
  
  
   stroke("white")
  textSize(40);
  fill("blue")
  text("coins:"+score,100,30)
  
   stroke("blue")
  textSize(40);
  fill("red")
  text("keys Count:"+keys,300,30)
  
}


function  spawnCoins(){
  if (frameCount % 500 === 0) {
    var coin = createSprite(600,400,40,10);
    coin.addImage(coinI);
    coin.scale = 0.2;
    coin.velocityX = -3;
    
    coin.lifetime = 200;
    
    coin.depth = plr.depth;
    plr.depth = plr.depth + 1;
    
    coinsGroup.add(coin);
  }
  
}


function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,400,10,40);
    obstacle.velocityX = -3 
    obstacle.setCollider("circle",0,0,50)
      obstacle.debug=false
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(o1);
              break;
      case 2: obstacle.addImage(o2);
              break;
      case 3: obstacle.addImage(o3);
              break;
      default: break;
    }
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}



function  spawnKeys(){
  if (frameCount % 200 === 0) {
    var key = createSprite(600,400,40,10);
    key.addImage(keyI);
    key.scale = 0.2;
    key.velocityX = -3;
    
    key.lifetime = 200;
    
    key.depth = plr.depth;
    plr.depth = plr.depth + 1;
    
    keysGroup.add(key);
  }
  
}