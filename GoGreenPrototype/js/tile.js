/*
Tile.js
Tile prefab for the tiles
*/



//game, key, xposition, yposition
function Tile (game, key, xPos, yPos)
{
	
	//passing x and y pos and the key
	Phaser.Sprite.call(this, game, xPos, yPos, key);
    button = game.add.button(xPos , yPos, key, actionOnClick, this);
    bfx01 = game.add.audio('button');


    //when button is pressed
        function actionOnClick()
        {
          console.log("Tile Pressed");
          bfx01.play();
          if(windExist && money >= windCost)
          {
          	windExist = false;
          	money -= windCost;
          	moneyText.text = 'Money: ' + money;
          	wind.num++;
          	windText.text = 'Wind Sources: ' + wind.num;
          	iconTemp.x = xPos+50;
          	iconTemp.y = yPos+50; 
          }
          else if(coalExist && money >= coalCost)
          {
          	coalExist = false;
          	money -= coalCost;
          	moneyText.text = 'Money: ' + money;
          	coal.num++;
            coalText.text = 'Coal Sources: ' + coal.num;
          	iconTemp.x = xPos+50;
          	iconTemp.y = yPos+50; 
          }
          else if(hydroExist && money >= hydroCost)
          {
          	hydroExist = false;
          	money -= hydroCost;
          	moneyText.text = 'Money: ' + money;
          	hydro.num++;
          	hydroText.text = 'Hydro Sources: ' + hydro.num;
          	iconTemp.x = xPos+50;
          	iconTemp.y = yPos+50; 
          }
          else if(solarExist && money >= solarCost)
          {
          	solarExist = false;
          	money -= solarCost;
          	moneyText.text = 'Money: ' + money;
          	solar.num++;
          	solarText.text = 'Solar Sources: ' + solar.num;
          	iconTemp.x = xPos+50;
          	iconTemp.y = yPos+50; 
          }
          else if(nuclearExist && money >= nuclearCost)
          {
          	nuclearExist = false;
          	money -= nuclearCost;
          	moneyText.text = 'Money: ' + money;
          	nuclear.num++;
          	nuclearText.text = 'Nuclear Sources: ' + nuclear.num;
          	iconTemp.x = xPos+50;
          	iconTemp.y = yPos+50; 
          }
          
          
        }
}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.update = function(){
   
}