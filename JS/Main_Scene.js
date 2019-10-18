class Main_Scene extends Phaser.Scene
{
  constructor()
  {
    scene_MainScene = super({key:'Main_Scene', active: true});
  }

  preload()
  {
    this.load.image('Background_Menu', 'Assets/Menu_Background.png');
    this.load.image('New_Game_Menu', 'Assets/New_Game.png');
  }

  create()
  {
    backgroundMenu = scene_MainScene.add.sprite(windowWidth*0.5, windowHeight*0.40, 'Background_Menu').setScale(2);
    new_Game_Menu = scene_MainScene.add.sprite(windowWidth*0.5, windowHeight*0.40, 'New_Game_Menu').setScale(2);

    // Event
    new_Game_Menu.setInteractive();
    new_Game_Menu.on('pointerdown', startNewGame);

    // Inputs
    this.input.keyboard.on('keydown_SPACE', function (event) {
        pauseGame();
    }, this);
  }
}

var backgroundMenu;
var new_Game_Menu;

function startNewGame()
{
  scene_MainScene.scene.launch('First_Scene');
}

function pauseGame()
{
  if(!pause)
  {
    pause = true;
    scene_MainScene.scene.pause("First_Scene");
    scene_MainScene.scene.launch('Pause_Scene');
  }
  else
  {
    pause = false;
    scene_MainScene.scene.sleep('Pause_Scene');
    scene_MainScene.scene.resume("First_Scene");
  }
}
