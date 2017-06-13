//==================================================================//
// Tile.js
// - Tile prefab for the tiles
//==================================================================//

var isSelected = false;
var selectedButton;
var selectedHighlight;
var selectedTileIndex = -1;
var selectedTerrainKey = '';

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
            solarBuildCostText.kill();
            solarExist = false;
        }
        if(windExist)
        {
            wind.button.kill();
            wind.kill();
            windBuildCostText.kill();
            windExist = false;
        }
        if(coalExist)
        { 
            coal.button.kill();
            coal.kill();
            coalBuildCostText.kill();
            coalExist = false;
        }
        if(oilExist)
        {
            oil.button.kill();
            oil.kill();
            oilBuildCostText.kill();
            oilExist = false;
        }
        if(hydroExist)
        {
            hydro.button.kill();
            hydro.kill();
            hydroBuildCostText.kill();
            hydroExist = false;
        }
        if(nuclearExist)
        {
            nuclear.button.kill();
            nuclear.kill();
            nuclearBuildCostText.kill();
            nuclearExist = false;
        }
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
    }
    
    function actionOnClick()
    {
        console.log("Tile Pressed");
        console.log("Tile index: " + tileIndex);
        
        if(paused || pausedEvent) return; // don't do anything when paused
      
        if(!isSelected)
        {
            if(selectedButton != this.button)
            {
                selectedButton = this.button;
                selectedHighlight = this.selectSprite;
                selectedHighlight.scale.setTo(.5);
                selectedTileIndex = tileIndex;
                selectedTerrainKey = key;
                isSelected = true;
                tileReference = this;
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
                selectedTileIndex = tileIndex;
                selectedTerrainKey = key;
                isSelected = true;
                tileReference = this;
                //isSelected = false;
            }
        }

        if(isSelected)
        {
            if(!isOccupied[tileIndex]){
                if(key == 'mountain')
                {
                    removeIcons();
                    if (isResearched('solar'))
                    {
                        solarExist = true;
                        solar =     new PowerSource( game ,'solar', getActButtonX('solar'), getActButtonY('solar'), tileIndex, this);
                        solarBuildCostText = game.add.text(getActButtonX('solar')-40, getActButtonY('solar')+12, '$'+solarCost, {fontSize: '20px', fill: '#00C86E'});
                        solarBuildCostText.stroke = '#000000';
                        solarBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('coal'))
                    {
                        coalExist = true;
                        coal =      new PowerSource( game ,'coal', getActButtonX('coal'), getActButtonY('coal'), tileIndex, this);
                        coalBuildCostText = game.add.text(getActButtonX('coal')-40, getActButtonY('coal')+12, '$'+coalCost, {fontSize: '20px', fill: '#00C86E'});
                        coalBuildCostText.stroke = '#000000';
                        coalBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('wind'))
                    {
                        windExist = true;
                        wind =      new PowerSource( game ,'wind', getActButtonX('wind'), getActButtonY('wind'), tileIndex, this);
                        windBuildCostText = game.add.text(getActButtonX('wind')-40, getActButtonY('wind')+12, '$'+windCost, {fontSize: '20px', fill: '#00C86E'});
                        windBuildCostText.stroke = '#000000';
                        windBuildCostText.strokeThickness = 6;
                    }
                }
                else if(key == 'water')
                {
                    removeIcons();
                    if (isResearched('wind'))
                    {
                        windExist = true;
                        wind =      new PowerSource( game ,'wind', getActButtonX('wind'), getActButtonY('wind'), tileIndex, this);
                        windBuildCostText = game.add.text(getActButtonX('wind')-40, getActButtonY('wind')+12, '$'+windCost, {fontSize: '20px', fill: '#00C86E'});
                        windBuildCostText.stroke = '#000000';
                        windBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('oil'))
                    {
                        oilExist = true;
                        oil =      new PowerSource( game ,'oil', getActButtonX('oil'), getActButtonY('oil'), tileIndex, this);
                        oilBuildCostText = game.add.text(getActButtonX('oil')-40, getActButtonY('oil')+12, '$'+oilCost, {fontSize: '20px', fill: '#00C86E'});
                        oilBuildCostText.stroke = '#000000';
                        oilBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('hydro'))
                    {
                        hydroExist = true;
                        hydro =      new PowerSource( game ,'hydro', getActButtonX('hydro'), getActButtonY('hydro'), tileIndex, this);
                        hydroBuildCostText = game.add.text(getActButtonX('hydro')-40, getActButtonY('hydro')+12, '$'+hydroCost, {fontSize: '20px', fill: '#00C86E'});
                        hydroBuildCostText.stroke = '#000000';
                        hydroBuildCostText.strokeThickness = 6;
                    }
                }
                else if(key == 'grass')
                {
                    removeIcons();
                    if (isResearched('solar'))
                    {
                        solarExist = true;
                        solar =     new PowerSource( game ,'solar', getActButtonX('solar'), getActButtonY('solar'), tileIndex, this);
                        solarBuildCostText = game.add.text(getActButtonX('solar')-40, getActButtonY('solar')+12, '$'+solarCost, {fontSize: '20px', fill: '#00C86E'});
                        solarBuildCostText.stroke = '#000000';
                        solarBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('coal'))
                    {
                        coalExist = true;
                        coal =      new PowerSource( game ,'coal', getActButtonX('coal'), getActButtonY('coal'), tileIndex, this);
                        coalBuildCostText = game.add.text(getActButtonX('coal')-40, getActButtonY('coal')+12, '$'+coalCost, {fontSize: '20px', fill: '#00C86E'});
                        coalBuildCostText.stroke = '#000000';
                        coalBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('wind'))
                    {
                        windExist = true;
                        wind =      new PowerSource( game ,'wind', getActButtonX('wind'), getActButtonY('wind'), tileIndex, this);
                        windBuildCostText = game.add.text(getActButtonX('wind')-40, getActButtonY('wind')+12, '$'+windCost, {fontSize: '20px', fill: '#00C86E'});
                        windBuildCostText.stroke = '#000000';
                        windBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('oil'))
                    {
                        oilExist = true;
                        oil =      new PowerSource( game ,'oil', getActButtonX('oil'), getActButtonY('oil'), tileIndex, this);
                        oilBuildCostText = game.add.text(getActButtonX('oil')-40, getActButtonY('oil')+12, '$'+oilCost, {fontSize: '20px', fill: '#00C86E'});
                        oilBuildCostText.stroke = '#000000';
                        oilBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('nuclear'))
                    {
                        nuclearExist = true;
                        nuclear =   new PowerSource( game ,'nuclear', getActButtonX('nuclear'), getActButtonY('nuclear'),  tileIndex, this);
                        nuclearBuildCostText = game.add.text(getActButtonX('nuclear')-40, getActButtonY('nuclear')+12, '$'+nuclearCost, {fontSize: '20px', fill: '#00C86E'});
                        nuclearBuildCostText.stroke = '#000000';
                        nuclearBuildCostText.strokeThickness = 6;
                    }
                }
            }
            else
            {
                removeIcons();
                sellExist = true;
                sell = new PowerSource(game, 'sell', 1125, 1150, tileIndex, this);
                sellCostText = game.add.text(1125-40, 1150+12, '+$'+(this.building.install/4), {fontSize: '20px', fill: '#00C86E'});
                sellCostText.stroke = '#000000';
                sellCostText.strokeThickness = 6;
                repairExist = true;
                repair = new PowerSource(game, 'repair', 975, 1150, tileIndex, this);
                repairCostText = game.add.text(975-40, 1150+12, '$'+(this.building.repair), {fontSize: '20px', fill: '#00C86E'});
                repairCostText.stroke = '#000000';
                repairCostText.strokeThickness = 6;
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