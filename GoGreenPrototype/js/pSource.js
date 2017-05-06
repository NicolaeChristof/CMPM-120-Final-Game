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
          if(money >= 100)
          {
            this.num++;
            money -= 100;
            moneyText.text = 'Money: ' + money;
          }
          
        }
}

PowerSource.prototype = Object.create(Phaser.Sprite.prototype);
PowerSource.prototype.constructor = PowerSource;

PowerSource.prototype.update = function(){
   
}