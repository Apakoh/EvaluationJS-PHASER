class Pause_Scene extends Phaser.Scene
{

  constructor()
  {
    scene_PauseMenu = super({key:'Pause_Scene', active: false});
  }

  preload()
  {
    this.load.image('Background_Pause', 'Assets/Pause_Menu_Background.png');
    this.load.image('Play_Button', 'Assets/Play_Button.png');
    this.load.image('Pause_Button', 'Assets/Pause_Button.png');
  }

  create()
  {
    play_Button = scene_PauseMenu.add.sprite(windowWidth*0.5, windowHeight*0.40, 'Play_Button').setScale(1.5);
    textPause = scene_PauseMenu.add.text(play_Button.x - play_Button.width/1.40, play_Button.y - play_Button.height/0.7, '-- Pause --', { fontFamily: '"Roboto Condensed"', fontSize: 80 });
    // Event
    play_Button.setInteractive();
    play_Button.on('pointerdown', pauseGame);
  }

}

// Sprites
var background_Pause;
var play_Button;
var pause_Button;

// Text
var textPause;
