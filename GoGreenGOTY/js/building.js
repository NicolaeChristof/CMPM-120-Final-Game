//==================================================================//
// building.js
// - building prefab for the factories
//==================================================================//

var buildingTemp;
//game, key, xposition, yposition, power generated, money generated, maintenance timer, install cost, repair cost
function Building (game, key, xPos, yPos, power, money, timer, install, repair, pollution, index)
{
    //passing x and y pos and the key
    Phaser.Sprite.call(this, game, xPos, yPos, key);
    this.buildingIcon = game.add.sprite(xPos, yPos, key);
    this.power = power;
    this.money = money;
    this.timer = timer;
    this.install = install;
    this.repair = repair;
    this.pollution = pollution;
    this.index = index;
    this.repairTimer;
}

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = PowerSource;

Building.prototype.update = function(){

}