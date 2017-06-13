//==================================================================//
// pSource.js
// - Powersource prefab for the buttons
//==================================================================//

var iconTemp;
var windExist = false;
var solarExist = false;
var hydroExist = false;
var coalExist = false;
var oilExist = false;
var nuclearExist = false;
var sellExist = false;
var repairExist = false;
var tileReference;

//game, key, xposition, yposition, index of the tile, reference in the tile
function PowerSource (game, key, xPos, yPos, index , tile, icon)
{
    
    //passing x and y pos and the key
    //Phaser.Sprite.call(this, game, xPos, yPos, key);

    icon = game.add.button(xPos, yPos, key, pSourceClick, this);
    icon.anchor.setTo(.5);
    icon.scale.setTo(.4);
    this.button = icon;
    this.button.inputEnabled = true;
    this.sellDenyIcon = game.add.sprite(xPos, yPos, 'redX');
    this.sellDenyIcon.anchor.setTo(.5);
    this.sellDenyIcon.scale.setTo(0);
    tileReference = tile;
    // ToDo: MAKE BUTTON SPRITES FOR UNAVALIABILITY
    
    function updateX(iconKey){
        switch(iconKey){
            case 'wind':
                if(windCost > money){
                    this.sellDenyIcon.scale.setTo(.4);
                }
                else{
                    this.sellDenyIcon.scale.setTo(0);
                }
                break;
            case 'solar':
                if(solarCost > money){
                    this.sellDenyIcon.scale.setTo(.4);
                }
                else{
                    this.sellDenyIcon.scale.setTo(0);
                }
                break;
            case 'coal':
                if(coalCost > money){
                    this.sellDenyIcon.scale.setTo(.4);
                }
                else{
                    this.sellDenyIcon.scale.setTo(0);
                }
                break;
            case 'oil':
                if(oilCost > money){
                    this.sellDenyIcon.scale.setTo(.4);
                }
                else{
                    this.sellDenyIcon.scale.setTo(0);
                }
                break;
            case 'hydro':
                if(hydroCost > money){
                    this.sellDenyIcon.scale.setTo(.4);
                }
                else{
                    this.sellDenyIcon.scale.setTo(0);
                }
                break;
            case 'nuclear':
                if(nuclearCost > money){
                    this.sellDenyIcon.scale.setTo(.4);
                }
                else{
                    this.sellDenyIcon.scale.setTo(0);
                }
                break;
        }
    }

    function pSourceClick()
    {
        console.log("Button Pressed");
        if(paused || pausedEvent) return; // don't do anything when paused
        
            if(isSelected)
            {
                if(isOccupied[index] == false && (key != 'sell' && key != 'repair'))
                {
                    //update number of sources when necessary
                    createNewBuilding(key, tile, index);
                }
                else
                {
                    switch(key) {
                        case 'sell':
                            if(buildingCount <= 1){
                                sfxPlay('sfxInvalid', 1);
                            }
                            else{
                                sfxPlay('sfxSell', .5);
                                clearGridArrays(index, tile.building);
                                if(sellExist)
                                {
                                    sell.button.kill();
                                    sell.kill();
                                    sellCostText.kill();
                                    sellExist = false;
                                }
                                if(repairExist)
                                {
                                    repair.button.kill();
                                    repair.kill();
                                    repairCostText.kill();
                                    repairExist = false;
                                }
                                buildingCount -= 1;
                            }
                            break;
                        case 'repair':
                            if(money >= tile.building.repair)
                            {
                                sfxPlay('sfxRepair', .5);
                                money-= tile.building.repair;
                                totalIncome[tile.building.index] = tile.building.money;
                                power[tile.building.index] = tile.building.power;
                                game.time.events.remove(tile.building.initialTimer);
                                game.time.events.remove(tile.building.repairTimer);
                                game.time.events.remove(tile.building.warningTimer);
                                buildingTimer(tile.building);
                            }
                            else{
                                sfxPlay('sfxInvalid', 1);
                            }
                            break;
                    }
                }
            }
        
        function createNewBuilding(key, tile, index){
            var spriteKey = '';
            var power = 0;
            var moneyGenerated = 0;
            var timer = 0;
            var install = 0;
            var repair = 0;
            var pollution = 0;
            var bonus = 0;
            var buyCost = 0;
            
            switch(key){
                case 'wind':
                    spriteKey = 'windOW';
                    power = windPower;
                    moneyGenerated = windIncome;
                    timer = windTimer;
                    repair = windRepair;
                    pollution = 0;
                    if(tile.key == 'mountain')
                    {
                        power /= 2;
                        bonus = 3;
                    }
                    buyCost = windCost;
                    break;
                case 'solar':
                    spriteKey = 'solarOW';
                    power = solarPower;
                    moneyGenerated = solarIncome;
                    timer = solarTimer;
                    repair = solarRepair;
                    pollution = 0;
                    buyCost = solarCost;
                    break;
                case 'coal':
                    spriteKey = 'coalOW';
                    power = coalPower;
                    moneyGenerated = coalIncome;
                    timer = coalTimer;
                    repair = coalRepair;
                    pollution = 1.5;
                    if(tile.key == 'mountain')
                    {
                        power *= 2;
                        pollution *= 2;
                        bonus = 2;
                    }
                    buyCost = coalCost;
                    break;
                case 'oil':
                    spriteKey = 'oilOW';
                    power = oilPower;
                    moneyGenerated = oilIncome;
                    timer = oilTimer;
                    repair = oilRepair;
                    pollution = 4;
                    if(tile.key == 'water')
                    {
                        power *= 2;
                        pollution *= 2;
                        bonus = 2;
                    }
                    buyCost = oilCost;
                    break;
                case 'hydro':
                    spriteKey = 'hydroOW';
                    power = hydroPower;
                    moneyGenerated = hydroIncome;
                    timer = hydroTimer;
                    repair = hydroRepair;
                    pollution = 0;
                    buyCost = hydroCost;
                    break;
                case 'nuclear':
                    spriteKey = 'nuclearOW';
                    power = nuclearPower;
                    moneyGenerated = nuclearIncome;
                    timer = nuclearTimer;
                    repair = nuclearRepair;
                    pollution = 0;
                    buyCost = nuclearCost;
                    break;
            }
            if (money < buyCost){
                sfxPlay('sfxInvalid', 1);
            }
            else
            {
                tile.name = key;
                buildingTemp = new Building(game, spriteKey, tile.x, tile.y, power, moneyGenerated, timer, buyCost, repair, pollution, index, bonus);
                tile.building = buildingTemp;
                buildingTimer(tile.building);
                if(tile.key == 'water'){
                    sfxPlay('sfxBuildWater', 1);
                }
                else{
                    sfxPlay('sfxBuild', 1);
                }
                money -= buyCost;
                buildingCount += 1;
                setGridArrays(index, tile.building);
            }
        }
        
        function setGridArrays(index, building){
            isOccupied[index] = true;
            totalIncome[index] = building.money;
            power[index] = building.power;
            totalPollution[index] = building.pollution;
            buildingPlaced = true;
        }
        
        function clearGridArrays(index, building){
            isOccupied[index] = false;
            totalIncome[index] = 0;
            power[index] = 0;
            totalPollution[index] = 0;
            money = money + (building.install/4);

            game.time.events.remove(tile.building.initialTimer);
            game.time.events.remove(tile.building.repairTimer);
            game.time.events.remove(tile.building.warningTimer);
            building.signal.kill();
            building.buildingIcon.kill();
            building.buildingIconBonus.kill();
            building.kill();
        }
    }

    function setFalse(sprite)
    {
        if(solarExist) solarExist = false;
        if(coalExist) solarExist = false;
        if(windExist) solarExist = false;
        if(hydroExist) solarExist = false;
        if(nuclearExist) solarExist = false;
        if(oilExist) solarExist = false;
        if(sellExist) solarExist = false;
        if(repairExist) solarExist = false;
        if(anyExist) iconTemp.kill();
        
        function anyExist() {
            return (solarExist || coalExist || windExist || hydroExist || nuclearExist || oilExist || sellExist || repairExist);
        }
        
    }     
}

PowerSource.prototype = Object.create(Phaser.Sprite.prototype);
PowerSource.prototype.constructor = PowerSource;

PowerSource.prototype.update = function(){

}
