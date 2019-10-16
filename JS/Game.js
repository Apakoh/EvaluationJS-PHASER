// Variables
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

const configGame = {
  type: Phaser.AUTO,
  width: windowWidth,
  height: windowHeight,
  transparent: true,
  scene: [Main_Scene, First_Scene]
};

const game = new Phaser.Game(configGame);
