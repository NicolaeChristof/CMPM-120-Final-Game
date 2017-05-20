/*
pSource.js
Powersource prefab for the buttons
*/


var iconTemp;
//var windTemp;
var windExist = false;
//var solarTemp;
var solarExist = false;
//var hydroTemp;
var hydroExist = false;
//var coalTemp;
var coalExist = false;
//var nuclearTemp;
var nuclearExist = false;
//game, key, xposition, yposition, power generated, maintenance timer, install cost, repair cost, starting amount of factories
function PowerSource (game, key, xPos, yPos, power, timer, install, repair, amount, pollution)
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

            
        //update number of sources when necessary
        if(key == 'wind' && !(windExist))
        {
            setFalse(iconTemp);
            windExist = true;
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'wind');
            iconTemp.anchor.set(.5);
        }
        else if(key == 'nuclear' && !(nuclearExist))
        {
            setFalse(iconTemp);
            nuclearExist = true;
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'nuclear');
            iconTemp.anchor.set(.5);
        }
        else if(key == 'solar' && !(solarExist))
        {
            setFalse(iconTemp);
            solarExist = true;
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'solar');
            iconTemp.anchor.set(.5);
        }
        else if(key == 'coal' && !(coalExist))
        {
            setFalse(iconTemp);
            coalExist = true;
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'coal');
            iconTemp.anchor.set(.5);
        }
        else if(key == 'hydro' && !(hydroExist))
        {
            setFalse(iconTemp);
            hydroExist = true;
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'hydro');
            iconTemp.anchor.set(.5);
        }
            
    }

    function setFalse(sprite)
    {
      if(solarExist)
      {
        solarExist = false;
        iconTemp.kill();
      }

      if(coalExist)
      {
        coalExist = false;
        iconTemp.kill();
      }

      if(windExist)
      {
        windExist = false;
        iconTemp.kill();
      }

      if(hydroExist)
      {
        hydroExist = false;
        iconTemp.kill();
      }

      if(nuclearExist)
      {
        nuclearExist = false;
        iconTemp.kill();
      }
    }
          
}

PowerSource.prototype = Object.create(Phaser.Sprite.prototype);
PowerSource.prototype.constructor = PowerSource;

PowerSource.prototype.update = function(){

}