class Pause_Scene extends Phaser.Scene
{

  constructor()
  {
    super({key:'Pause_Scene', active: false});
  }

  preload()
  {
    this.load.image('Background_Pause', 'Pause_Menu_Background.png');
    this.load.image('Play_Button', 'Play_Button.png');
    this.load.image('Pause_Button', 'Pause_Button.png');
  }

  create()
  {
    background_Pause = this.add.tileSprite(windowWidth, windowHeight, windowWidth*0.5, windowHeight*0.5, 'Background_Pause');
    play_Button = this.add.sprite(background_Pause.width, background_Pause.height, 'Play_Button').setScale(1);
    pause_Button = this.add.sprite(background_Pause.width, background_Pause.height, 'Pause_Button').setScale(1);
  }

}

var background_Pause;
var play_Button;
var pause_Button;
