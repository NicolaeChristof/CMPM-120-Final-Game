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
	
	
    income = (wind.num * wind.money) + (nuclear.num * nuclear.money) +
    (solar.num * solar.money) + (coal.num * coal.money) + (oil.num * oil.money) + (hydro.num * hydro.money);
    income = income * 2;
    incomeText.text = '+' + income;
    money += income;
    pollution -= 1;

}

//broken timer code

function buildingTimer(building)
{

  //game.time.events.add(Phaser.Timer.SECOND * 4, decrement(building), this);
}

function decrement(building)
{
      console.log("timer");
      building.kill();
}
