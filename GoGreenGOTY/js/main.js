//==================================================================//
//
// gameProperties
// - Properties of the game frame (width/height, etc.)
//
//==================================================================//

var gameScreenProperties = {};
gameScreenProperties.width = 1100; // Game frame width in pixels
gameScreenProperties.height = 1000; // Game frame height in pixels

//==================================================================//
//
// Game Variables
// - For handling gameplay resources/logic
//
//==================================================================//

//------------------------------------------------------------------//
// Grid Arrays
// - Stores the data+properties of the grid space
//------------------------------------------------------------------//

var gridMaxSize = 30; // The maximum number of tiles for the grid
var income = new Array(gridMaxSize);  //array with 25 indices to correspond to the tiles
var power = new Array(gridMaxSize); //array with 25 indices to correspond to the tiles
var isOccupied = new Array(gridMaxSize); //occupied status of grid tiles
var totalPollution = new Array(gridMaxSize); //the pollution values generated by all grid tiles

var revenue = 0;
var incomeText;
var money; //player's money
var co2;
var pollution = .01;
var death;

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

var buildingPlaced;

var bgmPlaying;

//==================================================================//
//
// gameStates
// - Setup the game state functions
//
//==================================================================//

var gameStates = {};

//------------------------------------------------------------------//
// State: Preloader
// - Handles the initialization of all game assets
//------------------------------------------------------------------//

gameStates.Preloader = function(game){};
gameStates.Preloader.prototype = {
    preload: function(){
        console.log('Preloader: preload');
        
        //----LOAD IMAGES----//
        
        game.load.image('cloud', 'assets/images/randall.png');
        game.load.image('sky' , 'assets/images/sky.png');
        game.load.image('co2' , 'assets/images/co2.png');

        game.load.image('wind', 'assets/images/UpWind.png');
        game.load.image('windOW', 'assets/images/WindOW.png');

        game.load.image('nuclear', 'assets/images/UpNuclear.png');

        game.load.image('solar', 'assets/images/UpSolar.png');

        game.load.image('coal', 'assets/images/UpCoal.png');
        game.load.image('coalOW', 'assets/images/CoalOW.png');

        game.load.image('oil', 'assets/images/UpCoal.png');
        game.load.image('oilOW', 'assets/images/OilOW.png');

        game.load.image('hydro', 'assets/images/UpHydro.png');
        
        game.load.image('controlpanel' , 'assets/images/UI2.png');

        game.load.image('start', 'assets/images/Start.png');

        game.load.image('sell', 'assets/images/Sell.png');
        game.load.image('sell2', 'assets/images/SellCursor.png');

        game.load.image('repair', 'assets/images/Repair.png');
        game.load.image('repair2' ,'assets/images/RepairCursor.png');
        
        game.load.spritesheet('grass', 'assets/images/FieldSS.png', 200, 200);
        //game.load.image('grass' , 'assets/images/Field.png');
        //game.load.image('grassHL' , 'assets/images/FieldHL.png');
        game.load.spritesheet('mountain', 'assets/images/mountainSS.png', 200, 200);
        //game.load.image('mountain', 'assets/images/Mountain.png');
        //game.load.image('mountainHL' , 'assets/images/MountainHL.png');
        game.load.spritesheet('water', 'assets/images/waterSS.png' , 200, 200);
        //game.load.image('water', 'assets/images/Water.png');
        //game.load.image('waterHL', 'assets/images/WaterHL.png');
        game.load.image('city2', 'assets/images/city.png');
        
        //----LOAD SPRITESHEETS----//

        game.load.spritesheet('city', 'assets/images/city3.png', 582, 532);
        
        //----LOAD BGM----//

        game.load.audio('bgm', ['assets/audio/bgm/bgm.ogg','assets/audio/bgm/bgm.mp3' ]);
        game.load.audio('bgm2', ['assets/audio/bgm/bgm_4.ogg','assets/audio/bgm/bgm_4.mp3' ]);
        
        //----LOAD SFX----//
        
        game.load.audio('scream', ['assets/audio/sfx/scream.ogg','assets/audio/sfx/scream.mp3']);
        game.load.audio('button', ['assets/audio/sfx/select.ogg' , 'assets/audio/sfx/select.mp3']);
        game.load.audio('wrong', ['assets/audio/sfx/wrong.ogg' , 'assets/audio/sfx/wrong.mp3']);
        game.load.audio('sell', ['assets/audio/sfx/sell.ogg' , 'assets/audio/sfx/sell.mp3']);
        game.load.audio('occupied', 'assets/audio/sfx/occupied.ogg');
     
        
    },
    create: function(){
        console.log('Preloader: create');
        game.state.start('MainMenu');
    }
}

//------------------------------------------------------------------//
// State: MainMenu
// - Handles the start screen
//------------------------------------------------------------------//

// define MainMenu state and method
gameStates.MainMenu = function(game){};
gameStates.MainMenu.prototype = {
    create: function(){
        start = game.add.tileSprite(0 , 0, 1000, 1000, 'start');
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
        
        //----FUNCTION: goFull----//
        
        function gofull() {
            game.state.start('Game');
            game.scale.startFullScreen(false);
        }
    }
}

//------------------------------------------------------------------//
// State: Play
// - Handles the core game loop
//------------------------------------------------------------------//

// define Game state and methods
gameStates.Play = function(game){};
gameStates.Play.prototype = {

    //====Game: PRELOAD====//
    
    preload: function() {
        // preload assets
        console.log("Game: preload")
    },
    
    //====Game: CREATE====//
    
    create: function(){
        money = 10000;
        death = false;
        buildingPlaced = false;
        bgmPlaying = false;

        startGlobalEvents();
        bgm = game.add.audio('bgm');
        scream = game.add.audio('scream');
        bgmPlay('bgm', .25);
        
        //add sky
        sky = game.add.sprite(500, 100, 'sky');
        sky2 = game.add.sprite(0,100, 'sky');
        buildings = game.add.group();
        city = buildings.create(500, 168, 'city');
        city2 = buildings.create(0, 168, 'city');
        co2 = game.add.sprite(500, -400, 'co2');
        co2_2 = game.add.sprite(0, -400, 'co2');
        cloud = game.add.sprite(500, 0, 'cloud');
        cloud2 = game.add.sprite(0, 0, 'cloud');
        bUI = game.add.sprite(1000, 0, 'controlpanel');
        bUI.scale.setTo(.5);
        
        //add grid
        
        var j = 0;
        for(var x = 0; x < 800; x+= 100)
        {
            for(var y = 700; y < 1000; y+=100)
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
        
        //intialize grid arrays to zero
        for(var i = 0; i < gridMaxSize; i++)
        {
            income[i] = power[i] = 0;
            isOccupied[i] = false;
            totalPollution[i] = 0;
        }
        
        /*
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
        
       
        moneyText = game.add.text(520, 10, 'Money: ' + money, { fontSize: '32px', fill: '#FFF' });
        incomeText = game.add.text(520, 100, '', { fontSize: '32px', fill: '#00FF00' });
        powerText = game.add.text(520, 45, 'Power Generated: 0' , { fontSize: '20px', fill: '#FFF' });
        */

    },
    
    //====Game: UPDATE====//
    
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


        /*
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

         if(buildingPlaced && voltage == 0)
        {
            game.state.start('GameOver');
        }
        */
        
        if(co2.y >= -400)
        {
            pollution += .00001;
        }
        
        //update money
        //moneyText.text = 'Money: ' + money;

        if(co2.y < 200)
        {
            co2.y+= pollution;
            co2_2.y+= pollution;
        }
        else if (!death)
        {
            scream.play();
            death = true;
            
            //game.state.start('GameOver');
        }

        /*
        //if an icon is clicked set the position to the mouse
        if(windExist || coalExist || hydroExist || nuclearExist || solarExist || sellExist || oilExist || repairExist)
        {
            iconTemp.x = game.input.mousePointer.x;
            iconTemp.y = game.input.mousePointer.y;
        }

        if(voltage == 0)
        {
            city.frame = 0;
            city2.frame = 0;
        }
        else if(voltage >= 0 && voltage< 200)
        {
            city.frame = 1;
            city2.frame = 1;
        }
        else if(voltage >= 200 && voltage < 300)
        {
            city.frame = 2;
            city.frame = 
        }
        else if(voltage >= 300 && voltage < 400)
        {
            city.frame = 3;
        }
        else if(voltage >= 400 && voltage < 500)
        {
            city.frame = 4;
        }
        */
    }
}

//------------------------------------------------------------------//
// State: GameOver
// - Handles the lose screen
//------------------------------------------------------------------//

// define GameOver state and methods
/* 
Add a win state based off whether the player has full power and no non-renewable sources
Store a boolean to check and call a timer so the game state change isn't immediate
*/
gameStates.GameOver = function(game){};
gameStates.GameOver.prototype = {
	create: function(){
		console.log('GameOver: create');
        bgmStop();
        restartKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
	},
	update: function(){
    	if(restartKey.isDown){
    		game.state.start('Game');

    	}
	}
}

//==================================================================//
//
// game
// - Setup the game application
//
//==================================================================//

var game = new Phaser.Game(gameScreenProperties.width, gameScreenProperties.height, Phaser.AUTO);

//------------------------------------------------------------------//
// Add Game States
//------------------------------------------------------------------//

game.state.add('Preloader', gameStates.Preloader);
game.state.add('MainMenu', gameStates.MainMenu);
game.state.add('Game', gameStates.Play);
game.state.add('GameOver', gameStates.GameOver);

//------------------------------------------------------------------//
// Start Game
//------------------------------------------------------------------//

game.state.start('Preloader');