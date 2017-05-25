/*
pSource.js
Powersource prefab for the buttons
*/


var iconTemp;
var windExist = false;
var solarExist = false;
var hydroExist = false;
var coalExist = false;
var oilExist = false;
var nuclearExist = false;
var sellExist = false;
var repairExist = false;
//game, key, xposition, yposition
function PowerSource (game, key, xPos, yPos)
{
    
    //passing x and y pos and the key
    //Phaser.Sprite.call(this, game, xPos, yPos, key);
    button = game.add.button(xPos , yPos, key, actionOnClick, this);
    button.anchor.setTo(.5);
    //this.anchor.set(.5);
    
    //when button is pressed
    function actionOnClick()
    {
        console.log("Button Pressed");

            
        //update number of sources when necessary
        if(key == 'wind' && !(windExist))
        {
            setFalse(iconTemp);
            windExist = true;
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'windBuilding');
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
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'coalBuilding');
            iconTemp.anchor.set(.5);
        }
        else if(key == 'oil' && !(oilExist))
        {
            setFalse(iconTemp);
            oilExist = true;
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'oil');
            iconTemp.anchor.set(.5);
        }
        else if(key == 'hydro' && !(hydroExist))
        {
            setFalse(iconTemp);
            hydroExist = true;
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'hydro');
            iconTemp.anchor.set(.5);
        }
        else if(key == 'sell' && !sellExist)
        {
            setFalse(iconTemp);
            sellExist = true;
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'sell2');
            iconTemp.anchor.set(.5);
        }
        else if(key == 'repair' && !repairExist)
        { 
            setFalse(iconTemp);
            repairExist = true;
            iconTemp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'repair2');
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
      
      if(oilExist)
      {
        oilExist = false;
        iconTemp.kill();
      }
      
      if(sellExist)
      {
        sellExist = false;
        iconTemp.kill();
      }

      if(repairExist)
      {
        repairExist = false;
        iconTemp.kill();
      }
    
    }
   
          
}

PowerSource.prototype = Object.create(Phaser.Sprite.prototype);
PowerSource.prototype.constructor = PowerSource;

PowerSource.prototype.update = function(){

}