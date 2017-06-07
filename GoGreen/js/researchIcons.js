

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
                        solar =     new PowerSource( game ,'solar', getActButtonX('solar'), getActButtonY('solar'), selectedTileIndex, this);
                    }
                    if (isResearched('coal'))
                    {
                        coalExist = true;
                        coal =      new PowerSource( game ,'coal', getActButtonX('coal'), getActButtonY('coal'), selectedTileIndex, this);
                    }
                    if (isResearched('wind'))
                    {
                        windExist = true;
                        wind =      new PowerSource( game ,'wind', getActButtonX('wind'), getActButtonY('wind'), selectedTileIndex, this);
                    }
                }
                else if(selectedTerrainKey == 'water')
                {
                    removeIcons();
                    if (isResearched('wind'))
                    {
                        windExist = true;
                        wind =      new PowerSource( game ,'wind', getActButtonX('wind'), getActButtonY('wind'), selectedTileIndex, this);
                    }
                    if (isResearched('oil'))
                    {
                        oilExist = true;
                        oil =      new PowerSource( game ,'oil', getActButtonX('oil'), getActButtonY('oil'), selectedTileIndex, this);
                    }
                    if (isResearched('hydro'))
                    {
                        hydroExist = true;
                        hydro =      new PowerSource( game ,'hydro', getActButtonX('hydro'), getActButtonY('hydro'), selectedTileIndex, this);
                    }
                }
                else if(selectedTerrainKey == 'grass')
                {
                    removeIcons();
                    if (isResearched('solar'))
                    {
                        solarExist = true;
                        solar =     new PowerSource( game ,'solar', getActButtonX('solar'), getActButtonY('solar'), selectedTileIndex, this);
                    }
                    if (isResearched('coal'))
                    {
                        coalExist = true;
                        coal =      new PowerSource( game ,'coal', getActButtonX('coal'), getActButtonY('coal'), selectedTileIndex, this);
                    }
                    if (isResearched('wind'))
                    {
                        windExist = true;
                        wind =      new PowerSource( game ,'wind', getActButtonX('wind'), getActButtonY('wind'), selectedTileIndex, this);
                    }
                    if (isResearched('oil'))
                    {
                        oilExist = true;
                        oil =      new PowerSource( game ,'oil', getActButtonX('oil'), getActButtonY('oil'), selectedTileIndex, this);
                    }
                    if (isResearched('nuclear'))
                    {
                        nuclearExist = true;
                        nuclear =   new PowerSource( game ,'nuclear', getActButtonX('nuclear'), getActButtonY('nuclear'),  selectedTileIndex, this);
                    }
                }
            }
            else
            {
                removeIcons();
                sellExist = true;
                sell = new PowerSource(game, 'sell', 1125, 1150, selectedTileIndex, this);
                repairExist = true;
                repair = new PowerSource(game, 'repair', 975, 1150, selectedTileIndex, this);
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