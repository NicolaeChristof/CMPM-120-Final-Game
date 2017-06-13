//==================================================================//
// researchIcons.js
// - Button prefab for the R&D sidebar
//==================================================================//

function Research(game, key, xPos, yPos, icon)
{
	icon = game.add.button(xPos, yPos, key, actionOnClick, this);
    icon.anchor.setTo(.5);
    icon.scale.setTo(.5);
    this.button = icon;
    this.button.inputEnabled = true;
    
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
    
    function deselect(btn, highlight)
    {
        btn.frame = 0;
        highlight.scale.setTo(0);
    }
    
    function actionOnClick()
    {
        if(paused || pausedEvent) return; // don't do anything when paused
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
        
        if(isSelected)
        {
            if(!isOccupied[selectedTileIndex]){
                if(selectedTerrainKey == 'mountain')
                {
                    removeIcons();
                    if (isResearched('solar'))
                    {
                        solarExist = true;
                        solar =     new PowerSource( game ,'solar', getActButtonX('solar'), getActButtonY('solar'), selectedTileIndex, tileReference);
                        solarBuildCostText = game.add.text(getActButtonX('solar')-40, getActButtonY('solar')+12, '$'+solarCost, {fontSize: '20px', fill: '#00C86E'});
                        solarBuildCostText.stroke = '#000000';
                        solarBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('coal'))
                    {
                        coalExist = true;
                        coal =      new PowerSource( game ,'coal', getActButtonX('coal'), getActButtonY('coal'), selectedTileIndex, tileReference);
                        coalBuildCostText = game.add.text(getActButtonX('coal')-40, getActButtonY('coal')+12, '$'+coalCost, {fontSize: '20px', fill: '#00C86E'});
                        coalBuildCostText.stroke = '#000000';
                        coalBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('wind'))
                    {
                        windExist = true;
                        wind =      new PowerSource( game ,'wind', getActButtonX('wind'), getActButtonY('wind'), selectedTileIndex, tileReference);
                        windBuildCostText = game.add.text(getActButtonX('wind')-40, getActButtonY('wind')+12, '$'+windCost, {fontSize: '20px', fill: '#00C86E'});
                        windBuildCostText.stroke = '#000000';
                        windBuildCostText.strokeThickness = 6;
                    }
                }
                else if(selectedTerrainKey == 'water')
                {
                    removeIcons();
                    if (isResearched('wind'))
                    {
                        windExist = true;
                        wind =      new PowerSource( game ,'wind', getActButtonX('wind'), getActButtonY('wind'), selectedTileIndex, tileReference);
                        windBuildCostText = game.add.text(getActButtonX('wind')-40, getActButtonY('wind')+12, '$'+windCost, {fontSize: '20px', fill: '#00C86E'});
                        windBuildCostText.stroke = '#000000';
                        windBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('oil'))
                    {
                        oilExist = true;
                        oil =      new PowerSource( game ,'oil', getActButtonX('oil'), getActButtonY('oil'), selectedTileIndex, tileReference);
                        oilBuildCostText = game.add.text(getActButtonX('oil')-40, getActButtonY('oil')+12, '$'+oilCost, {fontSize: '20px', fill: '#00C86E'});
                        oilBuildCostText.stroke = '#000000';
                        oilBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('hydro'))
                    {
                        hydroExist = true;
                        hydro =      new PowerSource( game ,'hydro', getActButtonX('hydro'), getActButtonY('hydro'), selectedTileIndex, tileReference);
                        hydroBuildCostText = game.add.text(getActButtonX('hydro')-40, getActButtonY('hydro')+12, '$'+hydroCost, {fontSize: '20px', fill: '#00C86E'});
                        hydroBuildCostText.stroke = '#000000';
                        hydroBuildCostText.strokeThickness = 6;
                    }
                }
                else if(selectedTerrainKey == 'grass')
                {
                    removeIcons();
                    if (isResearched('solar'))
                    {
                        solarExist = true;
                        solar =     new PowerSource( game ,'solar', getActButtonX('solar'), getActButtonY('solar'), selectedTileIndex, tileReference);
                        solarBuildCostText = game.add.text(getActButtonX('solar')-40, getActButtonY('solar')+12, '$'+solarCost, {fontSize: '20px', fill: '#00C86E'});
                        solarBuildCostText.stroke = '#000000';
                        solarBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('coal'))
                    {
                        coalExist = true;
                        coal =      new PowerSource( game ,'coal', getActButtonX('coal'), getActButtonY('coal'), selectedTileIndex, tileReference);
                        coalBuildCostText = game.add.text(getActButtonX('coal')-40, getActButtonY('coal')+12, '$'+coalCost, {fontSize: '20px', fill: '#00C86E'});
                        coalBuildCostText.stroke = '#000000';
                        coalBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('wind'))
                    {
                        windExist = true;
                        wind =      new PowerSource( game ,'wind', getActButtonX('wind'), getActButtonY('wind'), selectedTileIndex, tileReference);
                        windBuildCostText = game.add.text(getActButtonX('wind')-40, getActButtonY('wind')+12, '$'+windCost, {fontSize: '20px', fill: '#00C86E'});
                        windBuildCostText.stroke = '#000000';
                        windBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('oil'))
                    {
                        oilExist = true;
                        oil =      new PowerSource( game ,'oil', getActButtonX('oil'), getActButtonY('oil'), selectedTileIndex, tileReference);
                        oilBuildCostText = game.add.text(getActButtonX('oil')-40, getActButtonY('oil')+12, '$'+oilCost, {fontSize: '20px', fill: '#00C86E'});
                        oilBuildCostText.stroke = '#000000';
                        oilBuildCostText.strokeThickness = 6;
                    }
                    if (isResearched('nuclear'))
                    {
                        nuclearExist = true;
                        nuclear =   new PowerSource( game ,'nuclear', getActButtonX('nuclear'), getActButtonY('nuclear'),  selectedTileIndex, tileReference);
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
                sell = new PowerSource(game, 'sell', 1125, 1150, selectedTileIndex, tileReference);
                sellCostText = game.add.text(1125-40, 1150+12, '+$'+(tileReference.building.install/4), {fontSize: '20px', fill: '#00C86E'});
                sellCostText.stroke = '#000000';
                sellCostText.strokeThickness = 6;
                repairExist = true;
                repair = new PowerSource(game, 'repair', 975, 1150, selectedTileIndex, tileReference);
                repairCostText = game.add.text(975-40, 1150+12, '$'+(tileReference.building.repair), {fontSize: '20px', fill: '#00C86E'});
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

Research.prototype = Object.create(Phaser.Sprite.prototype);
Research.prototype.constructor = Research;

Research.prototype.update = function(){

}