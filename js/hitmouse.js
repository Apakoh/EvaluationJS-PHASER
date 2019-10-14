var windowWidth = window.innerWidth ;
var windowHeight = window.innerHeight ;

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

function preload()
{
  this.load.image('background', 'cloud.jpg');
  this.load.image('target', 'target.png');

}
function create()
{
  background = this.add.tileSprite(0, 0, windowWidth*2, windowHeight*2, 'background');
  //plane  = this.add.image(400, 300, 'planeSU57').setScale(1);
  target = this.add.sprite(400, 300, 'target').setScale(1);
}
function update()
{

}


const game = new Phaser.Game(config);
