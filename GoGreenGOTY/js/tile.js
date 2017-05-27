/*
Tile.js
Tile prefab for the tiles
*/


var mountainValid = true;
var waterValid = true;
var grassValid = true;
//game, key of the tile, xposition, yposition, occupied, key of the building, reference to building, index of the tile
function Tile (game, key, xPos, yPos, name, building, tileIndex)
{
	
	//passing x and y pos and the key
	Phaser.Sprite.call(this, game, xPos, yPos, key);
    button = game.add.button(xPos , yPos, key, actionOnClick, this);
    bfx01 = game.add.audio('button');
    bfx02 = game.add.audio('wrong');
    bfx03 = game.add.audio('occupied');
    bfx04 = game.add.audio('sell');



    //when button is pressed
        function actionOnClick()
        {
          console.log("Tile Pressed");
          console.log("Tile index: " + tileIndex);

          //check what powersource is being placed and whether the space is occupied
          if(windExist && (money >= windCost) && !(isOccupied[tileIndex]))
          {
          	windExist = false;
            //subtract the cost to install from money
          	money -= windCost;
          	moneyText.text = 'Money: ' + money;

            //spawn an icon in the center of the tile
            iconTemp.kill();
            buildingTemp = new Building(game, 'windBuilding', xPos, yPos, 30, 90, 4, 2000, 4, 0, tileIndex);
            
            
            //play select sound
          	bfx01.play();
          	isOccupied[tileIndex] = true;
            name = 'wind';
            //create a reference to the building
            building = buildingTemp;

            if(key == 'mountain')
            {
               building.power = building.power/2;
               building.money = building.money/2;
            }

            power[tileIndex] = buildingTemp.power;
            income[tileIndex] = buildingTemp.money;
            totalPollution[tileIndex] = buildingTemp.pollution;
            buildingTimer(building);
            buildingPlaced = true;
          }
          else if(coalExist && money >= coalCost && (!isOccupied[tileIndex]) && (key != 'water'))
          {
          	coalExist = false;
          	money -= coalCost;
          	moneyText.text = 'Money: ' + money;

            iconTemp.kill();
            buildingTemp = new Building(game, 'coalBuilding', xPos, yPos, 10, 30, 4, 1500, 4, 10, tileIndex);

          	bfx01.play();
          	isOccupied[tileIndex] = true;
            name = 'coal';
            building = buildingTemp;

            power[tileIndex] = buildingTemp.power;
            income[tileIndex] = buildingTemp.money;
            totalPollution[tileIndex] = buildingTemp.pollution;
            buildingTimer(building);
            buildingPlaced = true;
          }
          else if(oilExist && money >= oilCost && (!isOccupied[tileIndex]) && (key != 'mountain'))
          {
            oilExist = false;
            money -= oilCost;
            moneyText.text = 'Money: ' + money;
            iconTemp.kill();
            buildingTemp =     new Building( game ,'oil', xPos, yPos, 35, 120, 4, 4000, 4, 20, tileIndex);

            bfx01.play();
            isOccupied[tileIndex] = true;
            name = 'oil';
            building = buildingTemp;

            power[tileIndex] = buildingTemp.power;
            income[tileIndex] = buildingTemp.money;
            totalPollution[tileIndex] = buildingTemp.pollution;
            buildingTimer(building);
            buildingPlaced = true;
          }
          //Hydro can only be placed on water
          else if(hydroExist && money >= hydroCost && (!isOccupied[tileIndex]) && (key == 'water'))
          {
          	hydroExist = false;
          	money -= hydroCost;
          	moneyText.text = 'Money: ' + money;
            iconTemp.kill();
            buildingTemp =     new Building( game ,'hydro', xPos, yPos, 70, 140, 4, 5000, 4, 0, tileIndex);

          	bfx01.play();
          	isOccupied[tileIndex] = true;
            name = 'hydro';

            building = buildingTemp;
        
            power[tileIndex] = buildingTemp.power;
            income[tileIndex] = buildingTemp.money;
            totalPollution[tileIndex] = buildingTemp.pollution;
            buildingTimer(building);
            buildingPlaced = true;
          }
          else if(solarExist && money >= solarCost && (!isOccupied[tileIndex]) && (key != 'water'))
          {
          	solarExist = false;
          	money -= solarCost;
          	moneyText.text = 'Money: ' + money;

            iconTemp.kill();
            buildingTemp = new Building( game ,'solar', xPos, yPos, 2, 10, 4, 2000, 4, 0, tileIndex);

          	bfx01.play();
          	isOccupied[tileIndex] = true;
            name = 'solar';
            
            building = buildingTemp;

            power[tileIndex] = buildingTemp.power;
            income[tileIndex] = buildingTemp.money;
            totalPollution[tileIndex] = buildingTemp.pollution;
            buildingTimer(building);
            buildingPlaced = true;
          }
          else if(nuclearExist && money >= nuclearCost && (!isOccupied[tileIndex]) && (key == 'grass'))
          {
          	nuclearExist = false;
            
          	money -= nuclearCost;
          	moneyText.text = 'Money: ' + money;

            iconTemp.kill();
            buildingTemp = new Building(game ,'nuclear', xPos, yPos, 60, 240, 4, 6000, 4, 0, tileIndex);
   
          	bfx01.play();
          	isOccupied[tileIndex] = true;
            name = 'nuclear';
            building = buildingTemp;

            power[tileIndex] = buildingTemp.power;
            income[tileIndex] = buildingTemp.money;
            totalPollution[tileIndex] = buildingTemp.pollution;
            buildingTimer(building);
            buildingPlaced = true;
          }
          //selling
          else if(sellExist && isOccupied[tileIndex])
          {
             if(name == 'wind')
             {
               power[tileIndex] = income[tileIndex] = 0;
               isOccupied[tileIndex] = false;
               bfx04.play();

               money += building.install/2;
               moneyText.text = 'Money: ' + money;
               pollutionTimer(building);
               game.time.events.remove(building.repairTimer);
               building.buildingIcon.destroy();
               building.kill();
             }
             else if(name == 'solar')
             {
               power[tileIndex] = income[tileIndex] = 0;
               isOccupied[tileIndex] = false;
               bfx04.play();

               money += building.install/2;
               moneyText.text = 'Money: ' + money;
               pollutionTimer(building);
               game.time.events.remove(building.repairTimer);
               building.buildingIcon.destroy();
               building.kill();
             }
             else if(name == 'coal')
             {
               power[tileIndex] = income[tileIndex] = 0;
               isOccupied[tileIndex] = false;
               bfx04.play();

               money += building.install/2;
               moneyText.text = 'Money: ' + money;
               pollutionTimer(building);
               game.time.events.remove(building.repairTimer);
               building.buildingIcon.destroy();
               building.kill();
             }
             else if(name == 'oil')
             {
               power[tileIndex] = income[tileIndex] = 0;
               isOccupied[tileIndex] = false;
               bfx04.play();

               money += building.install/2;
               moneyText.text = 'Money: ' + money;
               pollutionTimer(building);
               game.time.events.remove(building.repairTimer);
               building.buildingIcon.destroy();
               building.kill();
             }
             else if(name == 'hydro')
             {
               power[tileIndex] = income[tileIndex] = 0;
               isOccupied[tileIndex] = false;
               bfx04.play();

               money += building.install/2;
               moneyText.text = 'Money: ' + money;
               pollutionTimer(building);
               game.time.events.remove(building.repairTimer);
               building.buildingIcon.destroy();
               building.kill();
             }
             else if(name == 'nuclear')
             {
               power[tileIndex] = income[tileIndex] = 0;
               isOccupied[tileIndex] = false;
               bfx04.play();

               money += building.install/2;
               moneyText.text = 'Money: ' + money;
               pollutionTimer(building);
               game.time.events.remove(building.repairTimer);
               building.buildingIcon.destroy();
               building.kill();

             }
          }
          else if(repairExist && isOccupied[tileIndex])
          {
            game.time.events.remove(building.repairTimer);
            money -= building.repair;
            moneyText.text = 'Money: ' + money;
            power[building.index] = building.power;
            income[building.index] = building.money;
            buildingTimer(building);
          }
          else if(isOccupied[tileIndex] && (windExist || coalExist || hydroExist || nuclearExist || solarExist || oilExist || repairExist))
          {
            bfx03.play();
          }	
          else if(windExist || coalExist || hydroExist || nuclearExist || solarExist || oilExist || repairExist)
          {
          	bfx02.play();
          }
          	
        }
}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.update = function(){
   
}