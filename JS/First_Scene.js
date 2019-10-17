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
    background = currentGame.add.tileSprite(0, 0, windowWidth*2, windowHeight*2, 'background');
    gestionUIRealTime();
    startTimer(0);
  }


  /* ------------------------------------------ */

  // Running Thread
  update()
  {
    currentGame = this;
    if(!pause)
    {
      // Moving Background
      background._tilePosition.x += 2;

      // UI Gestion
      gestionUIRealTime();

      // Target Creation
      if(nbTargetsTemp == 0)
      {
        createTarget(1 + timer/difficulty);
      }
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
var nbTargetsTemp = 0;
const minimalTimeSpawn = 1000;

// Text UI
var timerUI;
var scoreUI;

// Difficulty
const difficulty = 10;

// Input
var keySpace;

// Time
var timer = 0;
var clock;

function timeCounter()
{
  return Math.floor(new Date().getTime()/1000);
}

function destroyTarget()
{
  hit += 1;
  nbTargetsTemp -= 1;
  console.log("Hit : " + hit + " / Targets : " + nbTargets)
  this.destroy();
}

function deleteTarget(sprite)
{
  if(sprite.scene != undefined)
  {
    sprite.destroy();
    nbTargetsTemp -= 1;
  }
}

function randomInteger(range)
{
  return Math.floor(Math.random() * Math.floor(range+1));
}

function createTarget(nbSpawnTargets)
{
  for(var i=0; i < nbSpawnTargets; i++)
  {
    // Target Creation
    target = currentGame.add.sprite(randomInteger(windowWidth), randomInteger(windowHeight), 'target').setScale(0.2);
    target.setInteractive();
    target.on('pointerdown', destroyTarget);
    // Ajout Timer
    currentGame.time.addEvent({delay: randomInteger(2000) + minimalTimeSpawn, callback: deleteTarget, args: [target]});
    // Count
    nbTargets += 1;
    nbTargetsTemp +=1;
  }
}

function gestionUIRealTime()
{
  // Timer UI
  if(timerUI != undefined)
  {
    timerUI.destroy();
  }
  timerUI = currentGame.add.text(windowWidth*0.03, windowHeight*0.03, 'Timer : ' + timer, { fontFamily: '"Roboto Condensed"', fontSize: 36 });

  // Score UI
  if(scoreUI != undefined)
  {
    scoreUI.destroy();
  }
  scoreUI = currentGame.add.text(windowWidth*0.03, windowHeight*0.07, 'Score : ' + hit + ' / ' + nbTargets, { fontFamily: '"Roboto Condensed"', fontSize: 34 });
}

function startTimer(timeCount)
{
  timer += timeCount;
  console.log(timer);
  clock = currentGame.time.addEvent({
    delay: 1000,
    callback: startTimer,
    args: [1]
  });
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
