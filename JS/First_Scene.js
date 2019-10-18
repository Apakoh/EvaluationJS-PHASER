class First_Scene extends Phaser.Scene
{

  constructor()
  {
    scene_FirstScene = super({key:'First_Scene', active: false});
  }

  preload()
  {
    this.load.image('background', 'Assets/cloud.jpg');
    this.load.image('target', 'Assets/target.png');
    this.load.image('Pause_Button', 'Assets/Pause_Button.png');
  }

  create()
  {
    background = scene_FirstScene.add.tileSprite(0, 0, windowWidth*2, windowHeight*2, 'background');
    // Lock Background
    background.scrollFactor = 0;
    pause_Button_First_Scene = scene_FirstScene.add.sprite(windowWidth*0.95, windowHeight*0.08, 'Pause_Button').setScale(0.7);
    pause_Button_First_Scene.setInteractive();
    pause_Button_First_Scene.on('pointerdown', pauseGame);

    gestionUITimer();
    gestionUIScore();
    startTimer(0);
  }


  /* ------------------------------------------ */

  // Running Thread
  update()
  {
    if(!pause)
    {
      // Moving Background
      background._tilePosition.x += timer/2;

      // Target Creation
      if(nbTargetsTemp == 0)
      {
        createTarget(1 + timer/difficulty);
      }
    }
  }

}


// Game related
var background;
var target;
var pause_Button_First_Scene;
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

function destroyTarget(event)
{
  hit += 1;
  nbTargetsTemp -= 1;
  console.log("Hit : " + hit + " / Targets : " + nbTargets)
  this.destroy();
  gestionUIScore();
}

function deleteTarget(sprite)
{
  if(sprite.scene != undefined)
  {
    sprite.destroy();
    nbTargetsTemp -= 1;
  }
}

function randomInteger(rangeMin, rangeMax)
{
  return rangeMin + Math.floor(Math.random() * ((rangeMax+1) - rangeMin));
}

function createTarget(nbSpawnTargets)
{
  for(var i=0; i < nbSpawnTargets; i++)
  {
    // Target Creation
    target = scene_FirstScene.add.sprite(randomInteger(windowWidth*0.10, windowWidth - windowWidth*0.10), randomInteger(windowHeight*0.10, windowHeight - windowHeight*0.10), 'target').setScale(0.2);
    target.setInteractive();
    target.on('pointerdown', destroyTarget);
    // Ajout Timer
    scene_FirstScene.time.addEvent({delay: randomInteger(0, 2000) + minimalTimeSpawn, callback: deleteTarget, args: [target]});
    // Count
    nbTargets += 1;
    nbTargetsTemp +=1;
    // UI Update
    gestionUIScore();
  }
}

function gestionUITimer()
{
  // Timer UI
  if(timerUI != undefined)
  {
    timerUI.destroy();
  }
  timerUI = scene_FirstScene.add.text(windowWidth*0.03, windowHeight*0.03, 'Timer : ' + timer, { fontFamily: '"Roboto Condensed"', fontSize: 36 });
}

function gestionUIScore()
{
  // Score UI
  if(scoreUI != undefined)
  {
    scoreUI.destroy();
  }
  scoreUI = scene_FirstScene.add.text(timerUI.x, timerUI.y + timerUI.height, 'Score : ' + hit + ' / ' + nbTargets, { fontFamily: '"Roboto Condensed"', fontSize: 34 });
}

function startTimer(timeCount)
{
  timer += timeCount;
  gestionUITimer();
  console.log(timer);
  clock = scene_FirstScene.time.addEvent({
    delay: 1000,
    callback: startTimer,
    args: [1]
  });
}
