/*
Tile.js
Tile prefab for the tiles
*/


var mountainValid = false;
var waterValid = false;
//game, key, xposition, yposition, occupied, name of object, reference to building
function Tile (game, key, xPos, yPos, occupied, name, building)
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
          //check what powersource is being placed and whether the space is occupied
          if(windExist && (money >= windCost) && (!occupied))
          {
          	windExist = false;
            //subtract the cost to install from money
          	money -= windCost;
          	moneyText.text = 'Money: ' + money;
            //update the number of sources
          	wind.num++;
          	windText.text = 'Wind Sources: ' + wind.num;
            //spawn an icon in the center of the tile
          	iconTemp.x = xPos+50;
          	iconTemp.y = yPos+50;
            //play select sound
          	bfx01.play();
          	occupied = true;
            name = 'wind';
            //create a reference to the building
            building = iconTemp;

            if(key == 'mountain')
            {
               iconTemp.power = iconTemp.power/2;
            }
            buildingTimer(building);
          }
          else if(coalExist && money >= coalCost && (!occupied) && (key != 'water'))
          {
          	coalExist = false;
          	money -= coalCost;
          	moneyText.text = 'Money: ' + money;
          	coal.num++;
            coalText.text = 'Coal Sources: ' + coal.num;
          	iconTemp.x = xPos+50;
          	iconTemp.y = yPos+50; 
          	bfx01.play();
          	occupied = true;
            name = 'coal';
            building = iconTemp;
            buildingTimer(building);
          }
          else if(oilExist && money >= oilCost && (!occupied) && (key != 'mountain'))
          {
            oilExist = false;
            money -= oilCost;
            moneyText.text = 'Money: ' + money;
            oil.num++;
            oilText.text = 'Oil Sources: ' + coal.num;
            iconTemp.x = xPos+50;
            iconTemp.y = yPos+50; 
            bfx01.play();
            occupied = true;
            name = 'oil';
            building = iconTemp;
            buildingTimer(building);
          }
          //Hydro can only be placed on water
          else if(hydroExist && money >= hydroCost && (!occupied) && (key == 'water'))
          {
          	hydroExist = false;
          	money -= hydroCost;
          	moneyText.text = 'Money: ' + money;
          	hydro.num++;
          	hydroText.text = 'Hydro Sources: ' + hydro.num;
          	iconTemp.x = xPos+50;
          	iconTemp.y = yPos+50; 
          	bfx01.play();
          	occupied = true;
            name = 'hydro';
            building = iconTemp;
            buildingTimer(building);
          }
          else if(solarExist && money >= solarCost && (!occupied) && (key != 'water'))
          {
          	solarExist = false;
          	money -= solarCost;
          	moneyText.text = 'Money: ' + money;
          	solar.num++;
          	solarText.text = 'Solar Sources: ' + solar.num;
          	iconTemp.x = xPos+50;
          	iconTemp.y = yPos+50; 
          	bfx01.play();
          	occupied = true;
            name = 'solar';
            building = iconTemp;
            buildingTimer(building);
          }
          else if(nuclearExist && money >= nuclearCost && (!occupied) && (key == 'grass'))
          {
          	nuclearExist = false;

          	money -= nuclearCost;
          	moneyText.text = 'Money: ' + money;
          	nuclear.num++;
          	nuclearText.text = 'Nuclear Sources: ' + nuclear.num;
          	iconTemp.x = xPos+50;
          	iconTemp.y = yPos+50; 
          	bfx01.play();
          	occupied = true;
            name = 'nuclear';
            building = iconTemp;
            buildingTimer(building);
          }
          //selling
          else if(sellExist && occupied)
          {
             if(name == 'wind')
             {
               wind.num--;
               windText.text = 'Wind Sources: ' + wind.num;
               occupied = false;
               bfx04.play();
               building.kill();
             }
             else if(name == 'solar')
             {
               solar.num--;
               solarText.text = 'Solar Sources: ' + solar.num;
               occupied = false;
               bfx04.play();
               building.kill();
             }
             else if(name == 'coal')
             {
               coal.num--;
               coalText.text = 'Coal Sources: ' + coal.num;
               occupied = false;
               bfx04.play();
               building.kill();
             }
             else if(name == 'oil')
             {
               oil.num--;
               oilText.text = 'Oil Sources: ' + oil.num;
               occupied = false;
               bfx04.play();
               building.kill();
             }
             else if(name == 'hydro')
             {
               hydro.num--;
               hydroText.text = 'Hydro Sources: ' + hydro.num;
               occupied = false;
               bfx04.play();
               building.kill();
             }
             else if(name == 'nuclear')
             {
               nuclear.num--;
               nuclearText.text = 'Nuclear Sources: ' + nuclear.num;
               occupied = false;
               bfx04.play();
               building.kill();
             }
          }
          else if(occupied && (windExist || coalExist || hydroExist || nuclearExist || solarExist || oilExist))
          {
            bfx03.play();
          }	
          else if(windExist || coalExist || hydroExist || nuclearExist || solarExist || oilExist)
          {
          	bfx02.play();
          }
          	
        }
}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.update = function(){
   
}