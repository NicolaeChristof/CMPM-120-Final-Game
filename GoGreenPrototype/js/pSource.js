/*
pSource.js
Powersource prefab for the buttons
*/



//game, key, xposition, yposition, power generated, maintenance timer, install cost, repair cost, starting amount of factories
function PowerSource (game, key, xPos, yPos, power, timer, install, repair, amount)
{
	this.num = amount;
	//passing x and y pos and the key
	Phaser.Sprite.call(this, game, xPos, yPos, key);
    button = game.add.button(xPos , yPos, key, actionOnClick, this);
    button.anchor.setTo(.5);
	this.anchor.set(.5);
	this.power = power;

    //when button is pressed
        function actionOnClick()
        {
          console.log("Button Pressed");
          //take away money and add energy sources
          if(money >= install)
          {
            this.num++;
            money -= install;
            moneyText.text = 'Money: ' + money;

            //update number of sources when necessary
            if(key == 'wind')
            {
            	windText.text = 'Wind Sources: ' + wind.num;
            }
            else if(key == 'nuclear')
            {
            	nuclearText.text = 'Nuclear Sources: ' + nuclear.num;
            }
        	else if(key == 'solar')
        	{
        		solarText.text = 'Solar Sources: ' + solar.num;
        	}
        	else if(key == 'coal')
        	{
        		coalText.text = 'Coal Sources: ' + coal.num;
        	}
        	
          }
          
        }
}

PowerSource.prototype = Object.create(Phaser.Sprite.prototype);
PowerSource.prototype.constructor = PowerSource;

PowerSource.prototype.update = function(){
   
}