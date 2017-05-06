var game = new Phaser.Game(1000, 500, Phaser.AUTO);


// define Preloader state and methods
var Preloader = function(game){};
Preloader.prototype = {
    preload: function(){
        console.log('Preloader: preload');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('wind', 'assets/UpWind.png');
        game.load.image('city', 'assets/city.png');

    },
    create: function(){
        console.log('Preloader: create');
        game.state.start('Game');
    }
}

// define MainMenu state and method
var MainMenu = function(game){};
MainMenu.prototype = {
    create: function(){
        console.log('MainMenu: create');
        sky = game.add.sprite(0, 0, 'sky');
        startKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    },
    update: function(){

    	if(startKey.isDown){
    		game.state.start('Game');
    	}
    }
}


var numSources = 1; //number of sources
var income = 0;  //player's income
var money = 0; //player's money
var solarText;
var nuclearText;
var windText;
// define Game state and methods
var Game = function(game){};
Game.prototype = {

    preload: function() {
        // preload assets
        console.log("Game: preload")

    },
    
    create: function(){
        //add sky
        sky = game.add.sprite(0, 0, 'sky');
        city = game.add.sprite(500,0, 'city');


        //button prefabs
        wind = new PowerSource( game ,'wind', 100, 400, 1, 6, 20, 4, 0);
        nuclear = new PowerSource( game ,'wind', 200, 400, 10, 6, 20, 4, 1);
        solar = new PowerSource( game ,'wind', 300, 400, 5, 6, 20, 4, 0);
        

        //add text to track sources and money
        windText = game.add.text(16 , 60, 'Wind Sources: ' + wind.num , { fontSize: '16px', fill: '#FFF' });
        nuclearText = game.add.text(16 , 80, 'Nuclear Sources: ' + nuclear.num , { fontSize: '16px', fill: '#FFF' });
        solarText = game.add.text(16 , 100, 'Solar Sources: ' + solar.num , { fontSize: '16px', fill: '#FFF' });
        moneyText = game.add.text(16, 24, 'Money: ' + money, { fontSize: '32px', fill: '#FFF' });

        
    },
    
    //increases money based off the number of sources
    update: function() {
        //update text: Should be in the prefab once all the icons are finished
        //compare by keys and then update when necessary
        windText.text = 'Wind Sources: ' + wind.num;
        nuclearText.text = 'Nuclear Sources: ' + nuclear.num;
        solarText.text = 'Solar Sources: ' + solar.num;
        //increase income by the amounts
        income = (wind.num * wind.power) + (nuclear.num * nuclear.power) +
        (solar.num * solar.power);
        money += income;
        //update money
        moneyText.text = 'Money: ' + money;
    }
}

// define GameOver state and methods
var GameOver = function(game){};
GameOver.prototype = {
	create: function(){
		console.log('GameOver: create');
    
        startKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
	},
	update: function(){
	    console.log('GameOver: update');
    	if(startKey.isDown){
    		game.state.start('Game');
    	}
	}
}

game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);
game.state.start('Preloader');