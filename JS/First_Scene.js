class First_Scene extends Phaser.Scene
{

  constructor()
  {
    super({key:'First_Scene', active: true});
  }

  preload()
  {
    this.load.image('background', 'Assets/cloud.jpg');
    this.load.image('target', 'Assets/target.png');
  }

  create()
  {
    currentGame = this;
    background = this.add.tileSprite(0, 0, windowWidth*2, windowHeight*2, 'background');
    initTime = timeCounter();
  }


  /* ------------------------------------------ */



  /* ------------------------------------------ */

  // Running Thread
  update()
  {
    currentGame = this;
    if(!pause)
    {
      // Moving Background
      background._tilePosition.x += 2;

      // Timer update
      currentTimer = currentTimerTemps + timeCounter() - initTime;

      // Target Creation
      console.log(currentTimer);
      createTarget(this, 1 + currentTimer/difficulty);
    }
    else
    {
      // Gestion of pause consequences on Timer
      currentTimerTemps = currentTimer;
      initTime = timeCounter();
    }
  }

}


// Global
var currentGame;

// Game related
var background;
var target;
var nbTargets = 0;
var hit = 0;
var pause = false;

// Difficulty
const difficulty = 10;

// Input
var keySpace;

// Time
var initTime;
var pauseTime = 0;
var currentTimer = 0;
var currentTimerTemps = 0;

function timeCounter()
{
  return Math.floor(new Date().getTime()/1000);
}

function destroyTarget()
{
  hit += 1;
  console.log("Hit : " + hit + " / Targets : " + nbTargets)
  this.destroy();
}

function deleteTarget(sprite)
{
  sprite.destroy();
}

function randomInteger(range)
{
  return Math.floor(Math.random() * Math.floor(range+1));
}

function createTarget(thisGame, nbSpawnTargets)
{
  for(var i=0; i < nbSpawnTargets; i++)
  {
    // Target Creation
    target = thisGame.add.sprite(randomInteger(windowWidth), randomInteger(windowHeight), 'target').setScale(0.2);
    target.setInteractive();
    target.on('pointerdown', destroyTarget);
    // Ajout Timer
    thisGame.time.addEvent({delay: randomInteger(2000),callback: deleteTarget,args: [target]});
    // Count
    nbTargets += 1;
  }
}

function pauseGame()
{
  if(!pause)
  {
    pause = true;
    currentGame.scene.pause("First_Scene");
  }
  else
  {
    pause = false;
    currentGame.scene.resume("First_Scene");
  }
}
