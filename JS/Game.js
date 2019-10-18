// Variables
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

const configGame = {
  type: Phaser.AUTO,
  width: windowWidth,
  height: windowHeight,
  transparent: true,
  scene: [Main_Scene, First_Scene, Pause_Scene]
};

const game = new Phaser.Game(configGame);
var scene_FirstScene;
var scene_MainScene;
var scene_PauseMenu;
