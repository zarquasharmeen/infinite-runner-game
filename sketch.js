var monkey , monkey_running,ground_run,groundImage,gro;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;
var gameState = "play";
var score,restartImage,rs,gameOverImage,gameOver;

function preload(){
   monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.jpg");
  restartImage = loadImage("rs.webp");
  gameOverImage = loadImage("go.jpg");
}

function setup() {
  createCanvas(600,600);
  score=0;
  
  ground_run = createSprite(0,0,10,10);
  ground_run.addAnimation("groundrunning",groundImage);
  ground_run.scale=1.6;
  ground_run.velocityX=-4;
  
  monkey=createSprite(50,300,10,10);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.1;
   
  gro = createSprite(40,320,1100,10);
  gro.visible = false;
  
  gameOver=createSprite(300,290);
  gameOver.addImage("over",gameOverImage);
  gameOver.scale=1;
  gameOver.visible = false;
  
  
  rs=createSprite(300,350);
  rs.addImage("reset",restartImage);
  rs.scale=0.1;
  rs.visible = false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw()
{
    background(180);
    monkey.collide(gro);
    if(gameState == "play" )
      {
        survivalTime = survivalTime+1;
        if(ground_run.x < 0)
            {
              ground_run.x = ground_run.width/2; 
            }
        if(keyDown("space"))
            {
              monkey.velocityY=-10;
            }
        monkey.velocityY = monkey.velocityY + 0.8;
        if(World.frameCount%80==0)
            {
              food();
            }  
        if(World.frameCount%300==0)
            {
              obstacles();
            }
        if(FoodGroup.isTouching(monkey))
            {
              FoodGroup.destroyEach();  
              score=score+1;
            } 
      }
        if(obstaclesGroup.isTouching(monkey))
            {
              gameState = "end";
            }
  
        if(gameState == "end")
            {
              ground_run.velocityX = 0;
              FoodGroup.setLifetimeEach(0); 
              obstaclesGroup.setLifetimeEach(0);
              monkey.velocityY= 0;
              rs.visible = true;
              gameOver.visible = true;
              
            }
  
  if(mousePressedOver(rs)&&gameState == "end") 
   {
    gameState = "play";
    gameOver.visible = false;
    rs.visible = false;
    score = 0;
    ground_run.velocityX=-4;
   }
    drawSprites();
    text("Survival Time:"+ survivalTime,60,80);
    text("SCORE:"+score,60,100);
}

function food() 
  {
     banana = createSprite(200,250,10,10);
     banana.addImage("food",bananaImage);
     banana.scale=0.1;
     banana.y=Math.round(random(120,250));
     banana.lifetime = 600/5;
     banana.velocityX=-5;
     FoodGroup.add(banana);
  }
function obstacles() 
  {
     obstacle = createSprite(570,300,10,10);
     obstacle.addImage("hit",obstacleImage);
     obstacle.scale=0.1;
     obstacle.y =300;
     obstacle.lifetime = 600/5;
     obstacle.velocityX = -5;
     obstaclesGroup.add(obstacle);
   }