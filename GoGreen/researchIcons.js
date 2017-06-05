

function Research(game, key, xPos, yPos, icon)
{
	icon = game.add.button(xPos, yPos, key, actionOnClick, this);
    icon.anchor.setTo(.5);
    icon.scale.setTo(.5);
    this.button = icon;
    this.button.inputEnabled = true;

    function actionOnClick()
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
}

Research.prototype = Object.create(Phaser.Sprite.prototype);
Research.prototype.constructor = Research;

Research.prototype.update = function(){

}