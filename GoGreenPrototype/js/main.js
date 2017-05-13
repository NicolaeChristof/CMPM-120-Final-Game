var game = new Phaser.Game(1000, 700, Phaser.AUTO);


// define Preloader state and methods
var Preloader = function(game){};
Preloader.prototype = {
    preload: function(){
        console.log('Preloader: preload');
        game.load.image('sky', 'assets/randall.png');
        game.load.image('wind', 'assets/UpWind.png');
        game.load.image('nuclear', 'assets/UpNuclear.png');
        game.load.image('solar', 'assets/UpSolar.png');
        game.load.image('coal', 'assets/UpCoal.png');
        game.load.image('hydro', 'assets/UpHydro.png');
        game.load.image('city', 'assets/city2.png');
        game.load.image('co2' , 'assets/co2.png');
        game.load.image('grid' , 'assets/BField.png');
        game.load.image('controlpanel' , 'assets/ButtonUI.png');




        game.load.audio('bgm', ['assets/music/GoesWithEverything.ogg','assets/music/Goes With Everything.mp3' ]);
        game.load.audio('scream', ['assets/music/scream.ogg','assets/music/scream.mp3' ]);
        game.load.audio('sound', 'assets/music/TWR.ogg');



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
var co2;
var pollution = .01;
var death = false;
// define Game state and methods
var Game = function(game){};
Game.prototype = {

    preload: function() {
        // preload assets
        console.log("Game: preload")

    },
    
    create: function(){
        //add sky
        //music = game.add.audio('music');
        bSound = game.add.audio('sound');
        scream = game.add.audio('scream');
        //music.play();
        
        city = game.add.sprite(500, 300, 'city');
        co2 = game.add.sprite(500, -200, 'co2');
        sky = game.add.sprite(500, 0, 'sky');
        bUI = game.add.sprite(0, 500, 'controlpanel');
        
        //add grid
        for(var x = 0; x < 500; x+=100)
        {
            for(var y = 0; y < 500; y+=100)
            {
                button = new Tile(game, 'grid', x , y);
            }
        }
        
        //function for clicking on grid
        function gridClick()
        {
            console.log("grid pressed");
            bSound.play();
        }



        //button prefabs
        solar =     new PowerSource( game ,'solar', 50, 550, 2, 6, 2000, 4, 0, 0);
        coal =      new PowerSource( game ,'coal', 150, 550, 10, 6, 1000, 4, 1, 10);
        wind =      new PowerSource( game ,'wind', 250, 550, 30, 6, 1500, 4, 0, 0);
        hydro =      new PowerSource( game ,'hydro', 350, 550, 70, 8, 1000, 4, 0, 0);
        nuclear =   new PowerSource( game ,'nuclear', 450, 550, 120, 6, 3000, 4, 0, 10);
        
        
        

        //add text to track sources and money
        windText = game.add.text(16 , 75, 'Wind Sources: ' + wind.num , { fontSize: '20px', fill: '#FFF' });
        nuclearText = game.add.text(16 , 100, 'Nuclear Sources: ' + nuclear.num , { fontSize: '20px', fill: '#FFF' });
        solarText = game.add.text(16 , 125, 'Solar Sources: ' + solar.num , { fontSize: '20px', fill: '#FFF' });
        coalText = game.add.text(16 , 150, 'Coal Sources: ' + coal.num , { fontSize: '20px', fill: '#FFF' });
        hydroText = game.add.text(16 , 175, 'Hydro Sources: ' + hydro.num , { fontSize: '20px', fill: '#FFF' });
        moneyText = game.add.text(520, 10, 'Money: ' + money, { fontSize: '32px', fill: '#FFF' });
        powerText = game.add.text(520, 45, 'Power Generated: 0' , { fontSize: '20px', fill: '#FFF' });
    },
    
    //increases money based off the number of sources
    update: function() {
        //update text: Should be in the prefab once all the icons are finished
        //compare by keys and then update when necessary
        /*
        windText.text = 'Wind Sources: ' + wind.num;
        nuclearText.text = 'Nuclear Sources: ' + nuclear.num;
        solarText.text = 'Solar Sources: ' + solar.num;
        coalText.text = 'Coal Sources: ' + coal.num;
        */
        //increase income by the amounts
        income = (wind.num * wind.power) + (nuclear.num * nuclear.power) +
        (solar.num * solar.power) + (coal.num * coal.power) + (hydro.num * hydro.power);
        powerText.text = 'Power Generated: ' + income + ' Volts';
        money += income;

        pollution = coal.num * .01;
        //update money
        moneyText.text = 'Money: ' + money;
        if(co2.y < 200)
        {
            co2.y+= pollution;
        }
        else 
        {
            if(!death)
            {
                scream.play();
                death = true;
            }
            
        }
        
    }
}

// define GameOver state and methods
var GameOver = function(game){};
GameOver.prototype = {
	create: function(){
		console.log('GameOver: create');
    
        restartKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
	},
	update: function(){
	    console.log('GameOver: update');
    	if(restartKey.isDown){
    		game.state.start('Game');
    	}
	}
}

game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);
game.state.start('Preloader');