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
    (solar.num * solar.money) + (coal.num * coal.money) + (hydro.num * hydro.money);
    income = income * 2;
    incomeText.text = '+' + income;
    money += income;
}

function buildingTimer(building)
{
  seconds = 2;
  timer = game.time.create(false);
  timer.add(Phaser.Timer.SECOND, decrement(seconds, building),this);

}

function decrement(seconds, building)
{
	seconds--;
	if(seconds == 0)
	{
      building.kill();
	}
}