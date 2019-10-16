class Main_Scene extends Phaser.Scene
{

  constructor()
  {
    super({key:'Main_Scene', active: true});
  }

  create()
  {
    // Inputs
    this.input.keyboard.on('keydown_SPACE', function (event) {
        pauseGame();
    }, this);
  }

}
