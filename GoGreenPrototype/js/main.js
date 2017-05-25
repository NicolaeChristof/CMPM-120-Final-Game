var game = new Phaser.Game(1000, 700, Phaser.AUTO);


// define Preloader state and methods
var Preloader = function(game){};
Preloader.prototype = {
    preload: function(){
        console.log('Preloader: preload');
        game.load.image('cloud', 'assets/images/randall.png');
        game.load.image('sky' , 'assets/images/sky.png');
        game.load.image('wind', 'assets/images/UpWind.png');
        game.load.image('windBuilding', 'assets/images/windBuilding.png');
        game.load.image('nuclear', 'assets/images/UpNuclear.png');
        game.load.image('solar', 'assets/images/UpSolar.png');
        game.load.image('coal', 'assets/images/UpCoal.png');
        game.load.image('coalBuilding', 'assets/images/CoalBuilding.png');
        game.load.image('oil', 'assets/images/UpCoal.png');
        game.load.image('hydro', 'assets/images/UpHydro.png');
        game.load.image('co2' , 'assets/images/co2.png');
        game.load.image('grass' , 'assets/images/BField.png');
        game.load.image('controlpanel' , 'assets/images/UI.png');
        game.load.image('start', 'assets/images/Start.png');
        game.load.image('sell', 'assets/images/Sell.png');
        game.load.image('sell2', 'assets/images/SellCursor.png');
        game.load.image('repair', 'assets/images/Repair.png');
        game.load.image('repair2' ,'assets/images/RepairCursor.png');
        game.load.image('mountain', 'assets/images/Mountain.png');
        game.load.image('water', 'assets/images/Water.png');


        game.load.spritesheet('city', 'assets/images/city3.png', 582, 532);

        game.load.audio('bgm', ['assets/music/bgm.ogg','assets/music/bgm.mp3' ]);
        game.load.audio('bgm2', ['assets/music/bgm_4.ogg','assets/music/bgm_4.mp3' ]);
        game.load.audio('scream', ['assets/music/scream.ogg','assets/music/scream.mp3']);
        game.load.audio('button', ['assets/music/select.ogg' , 'assets/music/select.mp3']);
        game.load.audio('wrong', ['assets/music/wrong.ogg' , 'assets/music/wrong.mp3']);
        game.load.audio('sell', ['assets/music/sell.ogg' , 'assets/music/sell.mp3']);
        game.load.audio('occupied', 'assets/music/occupied.ogg');
     
        
    },
    create: function(){
        console.log('Preloader: create');

        game.state.start('MainMenu');
    }
}

// define MainMenu state and method
var MainMenu = function(game){};
MainMenu.prototype = {
    create: function(){
        start = game.add.tileSprite(0 , 0, 1000, 700, 'start');
        titleText = game.add.text(400, 280, 'Go Green', { fontSize: '45px', fill: '#008000' });
        titleText = game.add.text(240, 330, '-Click anywhere to Start-', { fontSize: '45px', fill: '#008000' });
        console.log('MainMenu: create');
        
    },
    update: function(){
            start.tilePosition.x -=4;
            start.tilePosition.y -=2;
            //fullscreen
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.input.onDown.add(gofull, this);
            function gofull() {
                game.state.start('Game');
                game.scale.startFullScreen(false);
            }
        
    }
}



var numSources = 0; //number of sources
var income = new Array(25);  //array with 25 indices to correspond to the tiles
var power = new Array(25); //array with 25 indices to correspond to the tiles
var isOccupied = new Array(25);
var totalPollution = new Array(25);
var revenue = 0;

var incomeText;
var money = 1000000; //player's money
var co2;
var pollution = .01;
var death = false;

var solarCost;
var solarTimer;

var coalCost;
var coalTimer;

var oilCost;
var oilTimer;

var windCost;
var windTimer;

var hydroCost;
var hydroTimer;

var nuclearCost;
var nuclearTimer;

var repair;

var buildingPlaced = false;
var bgmPlaying = false;
var bgm2Playing = false;
var bgmCurrent;
var bgmCurrentKey;

// define Game state and methods
var Game = function(game){};
Game.prototype = {

    preload: function() {
        // preload assets
        console.log("Game: preload")

    },
    
    create: function(){


        startGlobalEvents();
        bgm = game.add.audio('bgm');
        scream = game.add.audio('scream');
        bgmPlay('bgm', 1);

        
        
        //add sky
        sky = game.add.sprite(500, 100, 'sky');
        city = game.add.sprite(500, 168, 'city');
        co2 = game.add.sprite(500, -400, 'co2');
        cloud = game.add.sprite(500, 0, 'cloud');
        bUI = game.add.sprite(0, 500, 'controlpanel');
        
        
        //add grid
        var j = 0;
        for(var x = 0; x < 500; x+=100)
        {
            for(var y = 0; y < 500; y+=100)
            {
                
                var key;
                var i = game.rnd.integerInRange(1,10);
                if(i <= 5)
                {
                    key = 'grass';
                }
                else if((i > 5) && (i <= 8))
                {
                    key = 'mountain';
                }
                else
                {
                    key = 'water';
                }

                button = new Tile(game, key, x , y, 'none', null, j);

                j++;
            }
        }
        
        //intialize arrays to zero
        for(var i = 0; i < 25; i++)
        {
            income[i] = power[i] = 0;
            isOccupied[i] = false;
            totalPollution[i] = 0;
        }
        
        //button prefabs
        //game, key, xposition, yposition, power generated, money generated, maintenance timer, install cost, repair cost, starting amount of factories, pollution
        solarCost = 2000;
        solar =     new PowerSource( game ,'solar', 50, 550, 2, 10, 4, solarCost, 4, 0, 0);
        coalCost = 1500;
        coal =      new PowerSource( game ,'coal', 150, 550, 10, 30, 4, coalCost, 4, 0, 10);
        windCost = 3000;
        wind =      new PowerSource( game ,'wind', 250, 550, 30, 90, 4, windCost, 4, 0, 0);
        oilCost = 4000;
        oil =      new PowerSource( game ,'oil', 350, 550, 35, 120, 4, oilCost, 4, 0, 20);
        hydroCost = 5000;
        hydro =      new PowerSource( game ,'hydro', 450, 550, 70, 140, 4, hydroCost, 4, 0, 0);
        nuclearCost = 6000;
        nuclear =   new PowerSource( game ,'nuclear', 50, 650, 60, 240, 4, nuclearCost, 4, 0, 10);
        sell = new PowerSource( game ,'sell', 150, 650);
        repair = new PowerSource( game, 'repair', 250, 650);
        
        /*
        windText = game.add.text(16 , 75, 'Wind Sources: ' + wind.num , { fontSize: '20px', fill: '#FFF' });
        nuclearText = game.add.text(16 , 100, 'Nuclear Sources: ' + nuclear.num , { fontSize: '20px', fill: '#FFF' });
        solarText = game.add.text(16 , 125, 'Solar Sources: ' + solar.num , { fontSize: '20px', fill: '#FFF' });
        coalText = game.add.text(16 , 150, 'Coal Sources: ' + coal.num , { fontSize: '20px', fill: '#FFF' });
        oilText = game.add.text(16 , 175, 'Oil Sources: ' + coal.num , { fontSize: '20px', fill: '#FFF' });
        hydroText = game.add.text(16 , 200, 'Hydro Sources: ' + hydro.num , { fontSize: '20px', fill: '#FFF' });
        */
        moneyText = game.add.text(520, 10, 'Money: ' + money, { fontSize: '32px', fill: '#FFF' });
        incomeText = game.add.text(520, 100, '', { fontSize: '32px', fill: '#00FF00' });
        powerText = game.add.text(520, 45, 'Power Generated: 0' , { fontSize: '20px', fill: '#FFF' });

    },
    
    //increases money based off the number of sources
    update: function() {
         

         if (buildingPlaced)
        {
            if(!bgmPlaying)
            {
                bgmPlaying = true;
                bgmCurrent.stop();
                bgmPlay('bgm2', 1);

            }
           
        }

        var temp = 0;
        pollution = 0;
        for(var i = 0; i < 25; i++)
        {
            temp += power[i];
            pollution += totalPollution[i];
        }
        
        pollution = pollution * .001;
        voltage = temp;
        
        powerText.text = 'Power Generated: ' + voltage + ' Volts';  
        
        if(co2.y >= -400)
        {
            pollution += .005;
        }
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

        //if an icon is clicked set the position to the mouse
        if(windExist || coalExist || hydroExist || nuclearExist || solarExist || sellExist || oilExist || repairExist)
        {
            iconTemp.x = game.input.mousePointer.x;
            iconTemp.y = game.input.mousePointer.y;
        }

        if(voltage < 100)
        {
            city.frame = 0;
        }
        else if(voltage >= 100 && voltage< 200)
        {
            city.frame = 1;
        }
        else if(voltage >= 200 && voltage < 300)
        {
            city.frame = 2;
        }
        else if(voltage >= 300 && voltage < 400)
        {
            city.frame = 3;
        }
        else if(voltage >= 400 && voltage < 500)
        {
            city.frame = 4;
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