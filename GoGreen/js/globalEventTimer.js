//==================================================================//
// globalEventTimer.js
// - Game time manager per second
//==================================================================//

function startGlobalEvents() {
    globalTimer = game.time.create(false);
    globalTimer.loop(1000, globalEvents, this);
    globalTimer.start();
}


function globalEvents() {
    revenue = 0;
    pollution = 0;
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
        residualPollution += pollution * .0001;
    }
    else if (residualPollution > 0)
    {
        residualPollution -= .001
        if (residualPollution < 0){
            residualPollution = .0001;
        }
    }
}

//broken timer code

function buildingTimer(building)
{
 building.repairTimer = game.time.events.add(Phaser.Timer.SECOND * 30, decay, this, building);
 console.log(building.repairTimer);
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
      console.log("timer");
      console.log(building.index);
      totalIncome[building.index] = power[building.index] = 0;
}
