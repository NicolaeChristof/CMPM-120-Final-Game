//==================================================================//
// globalEventTimer.js
// - Game time manager per second
//==================================================================//

var timerValue = 0;

function startGlobalEvents() {
    globalTimer = game.time.create(false);
    globalTimer.loop(1000, globalEvents, this);
    globalTimer.start();
}


function globalEvents() {
    if(paused || pausedEvent) return;
    
    revenue = 0;
    pollution = 0;
    if (!tutorialEnabled){
        if (timerValue > 0 && goalSet == 1){
            timerValue -= 1;
            timerValueText.text = 'Time Until 33% Deadline: ' + timerValue + ' seconds';
        }
        else if (timerValue > 0 && goalSet == 2){
            timerValue -= 1;
            timerValueText.text = 'Time Until 66% Deadline: ' + timerValue + ' seconds';
        }
        else if (timerValue > 0 && goalSet == 3){
            timerValue -= 1;
            timerValueText.text = 'Time Until 100% Deadline: ' + timerValue + ' seconds';
        }
        else if (timerValue > 0 && goalSet == 4){
            timerValue -= 1;
            timerValueText.text = 'Neo Paris Agreement Deadline: ' + timerValue + ' seconds';
        }
    }
    for(var i = 0; i < gridMaxSize; i++)
    {
        revenue += totalIncome[i];
        pollution += totalPollution[i];
    }
    revenueText.text = '+' + revenue + '/s';
    money += revenue;
    //pollution -= 1;
    
    if (pollution > 0)
    {
        residualPollution += pollution * .0000075;
        //pollution -= .0003;
    }
    else if (residualPollution > 0)
    {
        residualPollution -= .001
        if (residualPollution < 0){
            residualPollution = -.0001;
        }
    }
}

//broken timer code

function buildingTimer(building)
{
    building.signal.frame = 0;
    building.repairTimer = game.time.events.add(Phaser.Timer.SECOND * (building.timer * .6), repairSwitch, this, building);
    building.warningTimer = game.time.events.add(Phaser.Timer.SECOND * (building.timer * .75), warningSwitch, this, building);
    building.initialTimer = game.time.events.add(Phaser.Timer.SECOND * (building.timer), decay, this, building);

 //console.log(building.initialTimer);
}

function pollutionTimer(building)
{
  var index = building.index;	
  var temp = game.time.events.add(Phaser.Timer.SECOND * 60, removePollution, this, index);
  console.log(temp);
}

function removePollution(index)
{
	totalPollution[index] = 0;
}

function decay(building)
{
      building.signal.frame = 3;
      //console.log("timer");
      //console.log(building.index);
      totalIncome[building.index] = power[building.index] = 0;

}

function repairSwitch(building)
{
    building.signal.frame = 1;
}

function warningSwitch(building)
{
    building.signal.frame = 2;
}
