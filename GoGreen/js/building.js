//==================================================================//
// building.js
// - building prefab for the factories
//==================================================================//

var buildingTemp;
//game, key, xposition, yposition, power generated, money generated, maintenance timer, install cost, repair cost, pollution, tile index, terrain modifier, repair status
function Building (game, key, xPos, yPos, power, money, timer, install, repair, pollution, index, boost)
{
    //passing x and y pos and the key
    Phaser.Sprite.call(this, game, xPos, yPos, key);
    this.buildingIcon = game.add.sprite(xPos, yPos, key);
    this.buildingIcon.scale.setTo(.5);
    if (boost == 2){
        this.buildingIconBonus = game.add.sprite(xPos, yPos, 'iconDouble');
        this.buildingIconBonus.scale.setTo(.5);
        this.money = money * 2;
    }
    else{
        this.buildingIconBonus = game.add.sprite(xPos, yPos, 'iconEmpty');
        this.buildingIconBonus.scale.setTo(.5);
        this.money = money;
    }
    this.power = power;
    //this.money = money;
    this.timer = timer;
    this.install = install;
    this.repair = repair;
    this.pollution = pollution;
    this.index = index;
    this.signal = game.add.sprite(xPos, yPos, 'repairStatus');
    this.signal.scale.setTo(.5);

    

    this.initialTimer; //the intial timer that powers the building down
    this.repairTimer; //sets the status to needs repair 
    this.warningTimer; //sets the status to almost broken
}

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = PowerSource;

Building.prototype.update = function(){

}