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
  this.load.image('background', 'Assets/cloud.jpg');
  this.load.image('target', 'Assets/target.png');

}
function create()
{
  background = this.add.tileSprite(0, 0, windowWidth*2, windowHeight*2, 'background');
}



function update()
{
  background._tilePosition.x += 2;

  target = this.add.sprite(randomInteger(windowWidth), randomInteger(windowHeight), 'target').setScale(0.2);
  this.time.addEvent({delay: 1000,callback: deleteTarget,args: [target]});
  nbTargets += 1;
  target.setInteractive();
  target.on('pointerdown', destroyTarget);
}



var background;
var target;
var nbTargets = 0;
var hit = 0;
const game = new Phaser.Game(config);

function destroyTarget()
{
  hit += 1;
  console.log("Hit : " + hit + " / Targets : " + nbTargets)
  this.destroy();
}

function deleteTarget(sprite)
{
  sprite.destroy();
}

function randomInteger(range)
{
  return Math.floor(Math.random() * Math.floor(range+1));
}
