
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,monkey_collided
var score
var ground
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkey_collidedImage = loadImage("sprite_8.png");

}



function setup() {
  createCanvas(windowWidth,windowHeight)
  monkey = createSprite(50,height-380);
  monkey.addAnimation("mnky",monkey_running);
  monkey.addAnimation("collided", monkey_collidedImage);
  monkey.scale = 0.1;
  
  ground = createSprite(width/2,height,width,2);
  ground.velocityX = width/2;
  
  console.log(ground.x);
 
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  score = 0;
  
}


function draw() {
  background("orange");
  monkey.collide(ground);
  
  text("SURVIVE TIME: "+ score, 250, 20);
  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
  
  if(gameState === PLAY){
    SpawnObstacle();
    SpawnFruit();
    
    ground.velocityX = -(20 + score/100);
    score = score + Math.round(getFrameRate()/62);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
    }
    
    if((touches.length > 0 || keyDown("SPACE")) && monkey.y  >= height-120) {
      monkey.velocityY = -15;
       touches = [];
    }
    
    monkey.velocityY = monkey.velocityY + 0.3;
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
      
  }
  }
  
  else if(gameState === END) {
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.changeAnimation("collided",monkey_collided);
    
  }
  
  drawSprites();
  
}
function SpawnObstacle() {
  if (frameCount % 200 === 0){
  var obstacle = createSprite(800,height-20,20,30);
    obstacle.velocityX = -5;
    
    obstacle.addImage("ob1",obstaceImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 350;
    
    obstacleGroup.add(obstacle);
    
  }
}

function SpawnFruit() {
  if (World.frameCount % 150 === 0) {
    var banana = createSprite(width+20,height-300,40,10);
    banana.y = random(150,200);
    banana.addImage("b1",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10;
    banana.lifetime = 400;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    FoodGroup.add(banana);
  }
  
}
