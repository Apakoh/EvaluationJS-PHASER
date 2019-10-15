
// Variables
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

// Game related
var background;
var target;
var nbTargets = 0;
var hit = 0;
var pause = false;

// Input
var keySpace;

// Time
var initTime;
var pauseTime = 0;
var currentTimer = 0;
var currentTimerTemps = 0;

/* ------------------ */
const config = {
  type: Phaser.AUTO,
  width: windowWidth,
  height: windowHeight,
  transparent: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
/* ------------------ */

function preload()
{
  this.load.image('background', 'Assets/cloud.jpg');
  this.load.image('target', 'Assets/target.png');

}
function create()
{
  background = this.add.tileSprite(0, 0, windowWidth*2, windowHeight*2, 'background');
  initTime = timeCounter();
  console.log(initTime);
}

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

function pauseGame(spaceBarPressed)
{
  if(spaceBarPressed && !pause)
  {
    pause = true;
  }
  else if(spaceBarPressed && pause)
  {
    pause = false
  }
}


// Running Thread
function update()
{
  // Input
  keySpace = this.input.keyboard.addKey('SPACE');

  pauseGame(keySpace.isDown);

  if(!pause)
  {
    // Moving Background
    background._tilePosition.x += 2;

    // Timer update
    currentTimer = currentTimerTemps + timeCounter() - initTime;
    console.log(currentTimer);

    // Target Creation
    createTarget(this, 0);
  }
  else
  {
    // Gestion of pause consequences on Timer
    currentTimerTemps = currentTimer;
    initTime = timeCounter();
  }

}
