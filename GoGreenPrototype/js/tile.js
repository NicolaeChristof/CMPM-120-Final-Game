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



    //when button is pressed
        function actionOnClick()
        {
          console.log("Tile Pressed");
          
          
        }
}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.update = function(){
   
}