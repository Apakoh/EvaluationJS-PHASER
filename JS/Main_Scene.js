class Main_Scene extends Phaser.Scene
{
  constructor()
  {
    scene_MainScene = super({key:'Main_Scene', active: true});
  }

  preload()
  {
    this.load.image('Background_Menu', 'Assets/Menu_Background.png');
    this.load.image('Play_Menu', 'Assets/Play_Button.png');
    this.load.image('Hit_Target_Menu', 'Assets/Hit_Target.png');

  }

  create()
  {
    backgroundMenu = scene_MainScene.add.sprite(windowWidth*0.5, windowHeight*0.40, 'Background_Menu').setScale(2);
    play_Button_Menu = scene_MainScene.add.sprite(backgroundMenu.x, backgroundMenu.y*0.75, 'Play_Menu').setScale(1.2);
    hit_Target_Menu = scene_MainScene.add.sprite(backgroundMenu.x, play_Button_Menu.y + play_Button_Menu.height*1.2, 'Hit_Target_Menu').setScale(1.2);

    // Event
    hit_Target_Menu.setInteractive();
    hit_Target_Menu.on('pointerdown', startNewGame);

    // Inputs
    this.input.keyboard.on('keydown_SPACE', function (event) {
        pauseGame();
    }, this);
  }
}

var backgroundMenu;
var hit_Target_Menu;
var play_Button_Menu;

function startNewGame()
{
  scene_MainScene.scene.launch('First_Scene');
}

function pauseGame()
{
  if(!pause)
  {
    pause = true;
    scene_MainScene.scene.pause('First_Scene');
    scene_MainScene.scene.launch('Pause_Scene');
  }
  else
  {
    pause = false;
    scene_MainScene.scene.sleep('Pause_Scene');
    scene_MainScene.scene.resume('First_Scene');
  }
}

function menuGame()
{
  scene_MainScene.scene.stop('First_Scene');
  scene_MainScene.scene.stop('Pause_Scene');
  scene_MainScene.scene.launch('Main_Scene');
}
