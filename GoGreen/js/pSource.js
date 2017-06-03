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

//game, key, xposition, yposition, index of the tile, reference in the tile
function PowerSource (game, key, xPos, yPos, index , tile, icon)
{
    
    //passing x and y pos and the key
    //Phaser.Sprite.call(this, game, xPos, yPos, key);

    icon = game.add.button(xPos, yPos, key, pSourceClick, this);
    icon.anchor.setTo(.5);
    icon.scale.setTo(.5);
    this.button = icon;
    this.button.inputEnabled = true;
    // ToDo: MAKE BUTTON SPRITES FOR UNAVALIABILITY
    
    

    function pSourceClick()
    {
        console.log("Button Pressed");
        if (key != 'researchCoal' && key != 'researchOil' && key != 'researchSolar' && key != 'researchWind' && key != 'researchHydro' && key != 'researchNuclear'){
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
                            clearGridArrays(index, tile.building);
                            break;
                        case 'repair':
                            if(money >= tile.building.repair)
                            {
                                money-= tile.building.repair;
                                game.time.events.remove(tile.building.initialTimer);
                                game.time.events.remove(tile.building.repairTimer);
                                game.time.events.remove(tile.building.warningTimer);
                                buildingTimer(tile.building);
                            }
                            break;
                    }
                }
            }
        }
        else 
        {
            switch(key) {
                case 'researchCoal':
                    research('coal');
                    break;
                case 'researchOil':
                    research('oil');
                    break;
                case 'researchSolar':
                    research('solar');
                    break;
                case 'researchWind':
                    research('wind');
                    break;
                case 'researchHydro':
                    research('hydro');
                    break;
                case 'researchNuclear':
                    research('nuclear');
                    break;        
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
                    power = 30;
                    moneyGenerated = 90;
                    timer = 4;
                    install = 2000;
                    repair = 4;
                    pollution = 0;
                    if(tile.key == 'mountain')
                    {
                        power /= 2;
                    }
                    buyCost = windCost;
                    break;
                case 'solar':
                    spriteKey = 'solarOW';
                    power = 30;
                    moneyGenerated = 90;
                    timer = 4;
                    install = 2000;
                    repair = 4;
                    pollution = 0;
                    buyCost = solarCost;
                    break;
                case 'coal':
                    spriteKey = 'coalOW';
                    power = 30;
                    moneyGenerated = 90;
                    timer = 4;
                    install = 2000;
                    repair = 4;
                    pollution = 10;
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
                    power = 30;
                    moneyGenerated = 90;
                    timer = 4;
                    install = 2000;
                    repair = 4;
                    pollution = 20;
                    oilCost = oilCost;
                    break;
                case 'hydro':
                    spriteKey = 'hydroOW';
                    power = 30;
                    moneyGenerated = 90;
                    timer = 4;
                    install = 2000;
                    repair = 4;
                    pollution = 0;
                    buyCost = hydroCost;
                    break;
                case 'nuclear':
                    spriteKey = 'nuclearOW';
                    power = 100;
                    moneyGenerated = 90;
                    timer = 4;
                    install = 2000;
                    repair = 4;
                    pollution = 0;
                    buyCost = nuclearCost;
                    break;
            }
            if (money < buyCost){
                
            }
            else
            {

                tile.name = key;
                buildingTemp = new Building(game, spriteKey, tile.x, tile.y, power, moneyGenerated, timer, install, repair, pollution, index, bonus);
                tile.building = buildingTemp;
                buildingTimer(tile.building);
                sfxPlay('sfxBuild', 1);
                money -= buyCost;
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
