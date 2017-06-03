//==================================================================//
// Tile.js
// - Tile prefab for the tiles
//==================================================================//

var isSelected = false;
var selectedButton;
var selectedHighlight;

//game, key of the tile, xposition, yposition, occupied, key of the building, reference to building, index of the tile
function Tile (game, key, xPos, yPos, name, building, tileIndex)
{
	
	//passing x and y pos and the key
	Phaser.Sprite.call(this, game, xPos, yPos, key);
    this.button = game.add.button(xPos , yPos, key, actionOnClick, this);
    this.button.scale.setTo(.5);
    
    this.selectSprite = game.add.sprite(xPos, yPos, 'selector');
    this.selectSprite.animations.add('select', [0,1,0,1], 2, true);
    this.selectSprite.animations.play('select');
    this.selectSprite.scale.setTo(0);
    
    bfx01 = game.add.audio('button');
    bfx02 = game.add.audio('wrong');
    bfx03 = game.add.audio('occupied');
    bfx04 = game.add.audio('sell');
    
    function deselect(btn, highlight)
    {
        btn.frame = 0;
        highlight.scale.setTo(0);
    }
    
    //remove icons
    function removeIcons()
    {
        if(solarExist)
        {
            solar.button.kill();
            solar.kill();
            solarExist = false;
        }
        if(windExist)
        {
            wind.button.kill();
            wind.kill();
            windExist = false;
        }
        if(coalExist)
        { 
            coal.button.kill();
            coal.kill();
            coalExist = false;
        }
        if(oilExist)
        {
            oil.button.kill();
            oil.kill();
            oilExist = false;
        }
        if(hydroExist)
        {
            hydro.button.kill();
            hydro.kill();
            hydroExist = false;
        }
        if(nuclearExist)
        {
            nuclear.button.kill();
            nuclear.kill();
            nuclearExist = false;
        }
        if(sellExist)
        {
            sell.button.kill();
            sell.kill();
            sellExist = false;
        }
        if(repairExist)
        {
            repair.button.kill();
            repair.kill();
            repairExist = false;
        }
    }
    
    function actionOnClick()
    {
        console.log("Tile Pressed");
        console.log("Tile index: " + tileIndex);
      
        if(!isSelected)
        {
            if(selectedButton != this.button)
            {
                selectedButton = this.button;
                selectedHighlight = this.selectSprite;
                selectedHighlight.scale.setTo(.5);
                isSelected = true;
            }
        }
        else
        {
            if(selectedButton != this.button)
            {
                deselect(selectedButton, selectedHighlight);
                selectedButton = this.button;
                selectedHighlight = this.selectSprite;
                selectedHighlight.scale.setTo(.5);
                isSelected = true;
                //isSelected = false;
            }
        }

        if(isSelected)
        {
            if(!isOccupied[tileIndex]){
                if(key == 'mountain')
                {
                    removeIcons();
                    solarExist = true;
                    solar =     new PowerSource( game ,'solar', 1150, 950, tileIndex, this);
                    coalExist = true;
                    coal =      new PowerSource( game ,'coal', 950, 950, tileIndex, this);
                    windExist = true;
                    wind =      new PowerSource( game ,'wind', 1050, 950, tileIndex, this);
                }
                else if(key == 'water')
                {
                    removeIcons();
                    windExist = true;
                    wind =      new PowerSource( game ,'wind', 1050, 950, tileIndex, this);
                    oilExist = true;
                    oil =      new PowerSource( game ,'oil', 950, 950, tileIndex, this);
                    hydroExist = true;
                    hydro =      new PowerSource( game ,'hydro', 1150, 950, tileIndex, this);
                }
                else if(key == 'grass')
                {
                    removeIcons();
                    solarExist = true;
                    solar =     new PowerSource( game ,'solar', 950, 1050, tileIndex, this);
                    coalExist = true;
                    coal =      new PowerSource( game ,'coal', 950, 950, tileIndex, this);
                    windExist = true;
                    wind =      new PowerSource( game ,'wind', 1150, 950, tileIndex, this);
                    oilExist = true;
                    oil =      new PowerSource( game ,'oil', 1050, 950, tileIndex, this);
                    nuclearExist = true;
                    nuclear =   new PowerSource( game ,'nuclear', 1050, 1050, tileIndex, this);
                }
            }
            else
            {
                removeIcons();
                sellExist = true;
                sell = new PowerSource(game, 'sell', 975, 1150, tileIndex, this);
                repairExist = true;
                repair = new PowerSource(game, 'repair', 1125, 1150, tileIndex, this);
            }
        }
        else
        {
            removeIcons();
        }
    }
    
}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.update = function(){
   
}