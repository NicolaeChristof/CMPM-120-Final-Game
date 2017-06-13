//==================================================================//
//
// gameProperties
// - Properties of the game frame (width/height, etc.)
//
//==================================================================//

var gameScreenProperties = {};
gameScreenProperties.width = 1200; // Game frame width in pixels
gameScreenProperties.height = 1200; // Game frame height in pixels

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

var gridWidth = 6;
var gridHeight = 3;
var gridMaxSize = gridWidth * gridHeight; // The maximum number of tiles for the grid
var gridTileSize = 100;
var gridOffsetX = gridTileSize * 3;
var grid = new Array(gridMaxSize);
var buildingCount = 0;
var totalIncome = new Array(gridMaxSize);  //array with 25 indices to correspond to the tiles
var power = new Array(gridMaxSize); //array with 25 indices to correspond to the tiles
var isOccupied = new Array(gridMaxSize); //occupied status of grid tiles
var totalPollution = new Array(gridMaxSize); //the pollution values generated by all grid tiles

var revenue = 0;
var incomeText;
var money; //player's money
var co2;
var pollution = .01;
var residualPollution = 0;
var voltageWinCondition = 100;
var death;
var deathCause = ''; // 'co2'/'powerless'
var win;

var solarCost = 3000;
var solarPower = 4;
var solarTimer = 240;
var solarRepair = 3000;
var solarIncome = 25;
var solarBuildCostText = NaN;

var coalCost = 1000;
var coalPower = 5;
var coalTimer = 120;
var coalRepair = 1000;
var coalIncome = 30;
var coalBuildCostText = NaN;

var oilCost = 3000;
var oilPower = 8;
var oilTimer = 90;
var oilRepair = 1500;
var oilIncome = 80;
var oilBuildCostText = NaN;

var windCost = 5000;
var windPower = 8;
var windTimer = 30;
var windRepair = 2000;
var windIncome = 80;
var windBuildCostText = NaN;

var hydroCost = 5500;
var hydroPower = 12;
var hydroTimer = 45;
var hydroRepair = 3000;
var hydroIncome = 100;
var hydroBuildCostText = NaN;

var nuclearCost = 10000;
var nuclearPower = 20;
var nuclearTimer = 20;
var nuclearRepair = 2500;
var nuclearIncome = 75;
var nuclearBuildCostText = NaN;
                
var sellCostText;
var repairCostText;

var repair;

var buildingPlaced;
var tutorialEnabled = false;
var tutorialProgress = 0;

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
        loadAllAssets();        
    },
    create: function(){
        console.log('Preloader: create');
        game.state.start('Start');
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); } // Prevent Right Click Pop-ups
    }
}

//------------------------------------------------------------------//
// State: Start
// - Handles the start screen
//------------------------------------------------------------------//

// define Start state and method
gameStates.Start = function(game){};
gameStates.Start.prototype = {
    create: function(){
        //start = game.add.tileSprite(0 , 0, 1000, 1000, 'start');
        titleText = game.add.text(gameScreenProperties.width/2, 280, 'This game uses fullscreen for optimal fitting.', { fontSize: '45px', fill: '#FFF', align: 'center' });
        titleText.anchor.x = .5;
        titleText = game.add.text(gameScreenProperties.width/2, 330, '-Click anywhere to Start and Enable.-', { fontSize: '45px', fill: '#FFF', align: 'center' });
        titleText.anchor.x = .5;
        console.log('Start: create');
    },
    update: function(){
        //start.tilePosition.x -=4;
        //start.tilePosition.y -=2;
        //fullscreen
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.onDown.add(gofull, this);
        
        //----FUNCTION: goFull----//
        
        function gofull() {
            //game.state.start('MainMenu');
            game.state.start('MainMenu');
            game.scale.startFullScreen(false);
        }
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
        bgSky = game.add.tileSprite(0 , 0, gameScreenProperties.width, gameScreenProperties.height, 'sky');
        bgSkyCO2 = game.add.sprite(0, -1600, 'skyCO2');
        bgClouds = game.add.tileSprite(0 , 0, gameScreenProperties.width*2, gameScreenProperties.height, 'startClouds');
        bgSkyCO2.scale.setTo(2);
        bgSkyCO2Rate = 0;
        started = false;
        playedSFX = false;
        title = game.add.sprite(0, 0, 'StartTitle');
        titleMouse = game.add.sprite(200, 600, 'titleMouse');
        titleMouse.animations.add('select', [0,1,0,1], 2, true);
        titleMouse.animations.add('started', [2], 8, true);
        titleMouse.animations.play('select');
        this.camera.flash('#000000');
        bgmPlay('bgmTitle', 1);
        console.log('MainMenu: create');
    },
    update: function(){
        bgSky.tilePosition.x -=4;
        bgSky.tilePosition.y -=2;
        bgClouds.tilePosition.x -= 2;

        game.input.onDown.add(openTheGame, this);
        
        if (started){
            if (bgSkyCO2.y < -100) bgSkyCO2.y += bgSkyCO2Rate;
            bgSkyCO2Rate += 0.4;
            if (bgSkyCO2.y >= -100){
                bgmStop();
                if (!playedSFX) {
                    sfxPlay('sfxBoom', 1);
                    playedSFX=true;
                    this.camera.fade('#FFFFFF', 2000);
                    this.camera.onFadeComplete.add(letUsStartTheGame,this);
                }
            }
        }
        
        //----FUNCTION: openTheGame----//
        
        function openTheGame() {
            started = true;
            titleMouse.animations.play('started');
        }
        
        function letUsStartTheGame() {
            //game.time.events.add(Phaser.Timer.SECOND, function() { game.state.start('AskTutorial')});
            game.state.start('AskTutorial');
        }
    }
}

//------------------------------------------------------------------//
// State: AskTutorial
// - Screen that asks if you want tutorials enabled
//------------------------------------------------------------------//

// define AskTutorial state and method
gameStates.AskTutorial = function(game){};
gameStates.AskTutorial.prototype = {
    create: function(){
        //bgSky = game.add.tileSprite(0 , 0, gameScreenProperties.width, gameScreenProperties.height, 'sky');
        console.log('AskTutorial: create');
        tutorialAsk = new eventPopup(game, 'tutorialEnable', 0, 0);
        eventPopupRunEvent(tutorialAsk);
    },
    update: function(){
        //State Switch found inside eventPopup.js
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
        this.camera.flash('#000000', 2000);
        money = 2500;
        death = false;
        win = false;
        buildingPlaced = false;
        bgmPlaying = false;
        initializeResearch();
        startGlobalEvents();
        bgmPlay('bgm', .25);
        
        //add sky
        sky = game.add.sprite(100, 0, 'sky');
        skyCO2 = game.add.sprite(100, -700, 'skyCO2');
        
        bgClouds = game.add.tileSprite(0 , 0, gameScreenProperties.width, gameScreenProperties.height/2, 'startClouds');
        
        buildings = game.add.group();
        city = buildings.create(600, 300, 'city');
        city2 = buildings.create(100, 300, 'city');
        co2clouds1 = game.add.sprite(100, -400, 'co2clouds1');
        co2clouds2 = game.add.sprite(200, -400, 'co2clouds2');
        co2clouds3 = game.add.sprite(0, -400, 'co2clouds3');
        co2GoRight = true;
        curtain = game.add.sprite(100, -800, 'curtain');
        cloud = game.add.sprite(0, 0, 'clouds');
        cloudGoUp = -.1;
        
        
        sideUI = game.add.sprite(0,0, 'hudSidebars');
        sideUI.scale.setTo(.5);
        
        gaugeCO2 = game.add.sprite(25,75, 'gaugeCO2');
        gaugeCO2.scale.setTo(1,0);
        percentageCO2 = 0;
        
        gaugeCO2Loss = game.add.sprite(25,75, 'gaugeCO2Loss');
        gaugeCO2Loss.scale.setTo(1,0);    
        
        tileInfoUI = game.add.sprite(0, gameScreenProperties.height - (gridTileSize * (gridHeight+1)), 'hudInfobox');
        tileInfoUI.scale.setTo(.5);
        
        actionInfoUI = game.add.sprite(gameScreenProperties.width - 300, (gameScreenProperties.height - (gridTileSize * (gridHeight+1))) + 100, 'hudActionbox');
        actionInfoUI.scale.setTo(.5);
        
        moneyInfoUI = game.add.sprite(gameScreenProperties.width - 300, (gameScreenProperties.height - (gridTileSize * (gridHeight+2))) + 100, 'hudMoney');
        moneyInfoUI.scale.setTo(.5);
        
        resourceUI = game.add.sprite(300, gameScreenProperties.height - (gridTileSize * (gridHeight+1)),'hudResources');
        resourceUI.scale.setTo(.5);
        
        //add grid
        
        var j = 0;
        for(var x = gridOffsetX; x < gridOffsetX + (gridWidth * gridTileSize); x+= gridTileSize)
        {
            for(var y = gameScreenProperties.height - (gridTileSize * gridHeight); y < gameScreenProperties.height; y += gridTileSize)
            {
                var key;
                var i = game.rnd.integerInRange(1,11);
                if(i <= 5 || j == 0)
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
                grid[j] = new Tile(game, key, x , y, 'none', null, j);
                j++;
            }
        }
        
        //intialize grid arrays to zero
        for(var i = 0; i < gridMaxSize; i++)
        {
            totalIncome[i] = 0;
            power[i] = 0;
            isOccupied[i] = false;
            totalPollution[i] = 0;
        }
        residualPollution = 0;
        
        //Research buttons
        researchedBuildings[2] = true;
        solarResearch =     new Research( game ,'researchSolar', 1150, 275);
        solarResearchCostText = game.add.text(1112, 275+50-2, '$'+researchCostSolar, { fontSize: '20px', fill: '#00C86E', align: 'center' });
        solarResearchCostText.stroke = '#000000';
        solarResearchCostText.strokeThickness = 6;
        windResearch =      new Research( game ,'researchWind', 1150, 400);
        windResearchCostText = game.add.text(1112, 400+50-2, '$'+researchCostWind, { fontSize: '20px', fill: '#00C86E', align: 'center' });
        windResearchCostText.stroke = '#000000';
        windResearchCostText.strokeThickness = 6;
        oilResearch =       new Research( game ,'researchOil', 1150, 150);
        oilResearchCostText = game.add.text(1112, 150+50-2, '$'+researchCostOil, { fontSize: '20px', fill: '#00C86E', align: 'center' });
        oilResearchCostText.stroke = '#000000';
        oilResearchCostText.strokeThickness = 6;
        hydroResearch =     new Research( game ,'researchHydro', 1150, 525);
        hydroResearchCostText = game.add.text(1112, 525+50-2, '$'+researchCostHydro, { fontSize: '20px', fill: '#00C86E', align: 'center' });
        hydroResearchCostText.stroke = '#000000';
        hydroResearchCostText.strokeThickness = 6;
        nuclearResearch =   new Research( game ,'researchNuclear', 1150, 650);
        nuclearResearchCostText = game.add.text(1112, 650+50-2, '$'+researchCostNuclear, { fontSize: '20px', fill: '#00C86E', align: 'center' });
        nuclearResearchCostText.stroke = '#000000';
        nuclearResearchCostText.strokeThickness = 6;

       
        moneyText = game.add.text(1000, gameScreenProperties.height - 345, money, { fontSize: '32px', fill: '#000', align: 'right' });
        moneyText.anchor.y = .5;
        revenueText = game.add.text(370, gameScreenProperties.height - 345, '+0/s', { fontSize: '24px', fill: '#000' });
        revenueText.anchor.y = .5;
        incomeText = game.add.text(520, 100, '', { fontSize: '32px', fill: '#00FF00' });
        powerText = game.add.text(570, gameScreenProperties.height - 345, '0%' , { fontSize: '24px', fill: '#000' });
        powerText.anchor.y = .5;
        pollutionText = game.add.text(770, gameScreenProperties.height - 345, '0aqi' , { fontSize: '24px', fill: '#000' });
        pollutionText.anchor.y = .5;
        
        
        circledVoltage = game.add.sprite(0, 0, 'loseVoltageCircle');
        circledVoltage.scale.setTo(0);

        hudCostText = game.add.text(125, 890,  '', {fontSize: '32px', fill: '#000'});
        hudPowerText = game.add.text(125, 950, '', {fontSize: '32px', fill: '#000'});
        hudTimerText = game.add.text(125, 1010, '', {fontSize: '32px', fill: '#000'});
        hudRepairText = game.add.text(125, 1060, '', {fontSize: '32px', fill: '#000'});
        hudIncomeText= game.add.text(125, 1115, '', {fontSize: '32px', fill: '#000'});
        
        hudResearchedCoal = game.add.sprite(getActButtonX('coal'), getActButtonY('coal'), 'coal');
        hudResearchedCoal.anchor.setTo(.5);
        hudResearchedCoal.scale.setTo(.4);
        hudResearchedCoal.tint = 0x1E1E1E;
        hudResearchedOil = game.add.sprite(getActButtonX('oil'), getActButtonY('oil'), 'oil');
        hudResearchedOil.anchor.setTo(.5);
        hudResearchedOil.scale.setTo(0);
        hudResearchedOil.tint = 0x1E1E1E;
        hudResearchedSolar = game.add.sprite(getActButtonX('solar'), getActButtonY('solar'), 'solar');
        hudResearchedSolar.anchor.setTo(.5);
        hudResearchedSolar.scale.setTo(0);
        hudResearchedSolar.tint = 0x1E1E1E;
        hudResearchedWind = game.add.sprite(getActButtonX('wind'), getActButtonY('wind'), 'wind');
        hudResearchedWind.anchor.setTo(.5);
        hudResearchedWind.scale.setTo(0);
        hudResearchedWind.tint = 0x1E1E1E;
        hudResearchedHydro = game.add.sprite(getActButtonX('hydro'), getActButtonY('hydro'), 'hydro');
        hudResearchedHydro.anchor.setTo(.5);
        hudResearchedHydro.scale.setTo(0);
        hudResearchedHydro.tint = 0x1E1E1E;
        hudResearchedNuclear = game.add.sprite(getActButtonX('nuclear'), getActButtonY('nuclear'), 'nuclear');
        hudResearchedNuclear.anchor.setTo(.5);
        hudResearchedNuclear.scale.setTo(0);
        hudResearchedNuclear.tint = 0x1E1E1E;
        
        coalExist = false;
        oilExist = false;
        solarExist = false;
        windExist = false;
        hydroExist = false;
        nuclearExist = false;
        sellExist = false;
        repairExist = false;
        
//        solarCostText = game.add.text(getActButtonX('solar'), getActButtonY('solar'), solarCost, { fontSize: '24px', fill: '#FFF', align: 'center' });
//        coalCostText = game.add.text(getActButtonX('coal'), getActButtonY('coal'), solarCost, { fontSize: '24px', fill: '#FFF', align: 'center' });
//        oilCostText = game.add.text(getActButtonX('oil'), getActButtonY('oil'), solarCost, { fontSize: '24px', fill: '#FFF', align: 'center' });
//        hydroCostText = game.add.text(getActButtonX('hydro'), getActButtonY('hydro'), solarCost, { fontSize: '24px', fill: '#FFF', align: 'center' });
//        windText = game.add.text(getActButtonX('wind'), getActButtonY('wind'), solarCost, { fontSize: '24px', fill: '#FFF', align: 'center' });
//        nuclearCostText = game.add.text(getActButtonX('nuclear'), getActButtonY('nuclear'), solarCost, { fontSize: '24px', fill: '#FFF', align: 'center' });

        paused = false;
        pausedEvent = false;
        
        tutorialPopup1 = new eventPopup(game, 'tutorial1', 400, 600);
        tutorialPopup2 = new eventPopup(game, 'tutorial2', 500, 500);
        if (tutorialEnabled) {
            eventPopupRunEvent(tutorialPopup1);
        }
        
        pauseScreen = game.add.sprite(0,0,'pauseScreen');
        pauseScreen.scale.setTo(0);
        
        goalSet = 0;
        
        if(!tutorialEnabled){
            timerValue = 60;
            timerValueText = game.add.text(125, 30,  'Time Until 100% Deadline: ' + timerValue + ' seconds', {fontSize: '32px', fill: '#FFF'});
            timerValueText.stroke = '#000000';
            timerValueText.strokeThickness = 6;
        }
        
//        pauseButton = game.add.button(100, 700, 'pauseButton', pauseGame, this);
//        pauseButton.frame = 0;
//        pauseButton.scale.setTo(.5);
//        
//        function pauseGame() {
//            if(pausedEvent) return;
//            if(paused){
//                paused = false;
//                pauseButton.frame = 0;
//                pauseScreen.scale.setTo(0);
//            }
//            else{
//                paused = true;
//                pauseButton.frame = 1;
//                pauseScreen.scale.setTo(1);
//            }
//        }
    },
    
    //====Game: UPDATE====//
    
    //increases money based off the number of sources
    update: function() {
        
        if(paused || pausedEvent) return; // don't do anything when paused
        
        if(!tutorialEnabled && goalSet == 0){
            goal1 = new eventPopup(game, 'goal1', 0, 0);
            eventPopupRunEvent(goal1);
            goalSet = 1;
        }

        
	  if(coalExist && coal.button.input.pointerOver())
        {
            tileInfoUI.frame = 1;
            hudCostText.text = coalCost;
            hudPowerText.text = coalPower;
            hudTimerText.text = coalTimer;
            hudRepairText.text = coalRepair;
            hudIncomeText.text = coalIncome;           
        }
        else if((oilExist && oil.button.input.pointerOver()) || (!isResearched('oil') && oilResearch.button.input.pointerOver()))
        {
           tileInfoUI.frame = 2;
           hudCostText.text = oilCost;
           hudPowerText.text = oilPower;
           hudTimerText.text = oilTimer;
           hudRepairText.text = oilRepair;
           hudIncomeText.text = oilIncome;
        }
        else if((solarExist && solar.button.input.pointerOver()) || (!isResearched('solar') && solarResearch.button.input.pointerOver()))
        {
           tileInfoUI.frame = 3;
           hudCostText.text = solarCost;
           hudPowerText.text = solarPower;
           hudTimerText.text = solarTimer;
           hudRepairText.text = solarRepair;
           hudIncomeText.text = solarIncome;
        }
        else if((windExist && wind.button.input.pointerOver()) || (!isResearched('wind') && windResearch.button.input.pointerOver()))
        {
           tileInfoUI.frame = 4;
           hudCostText.text = windCost;
           hudPowerText.text = windPower;
           hudTimerText.text = windTimer;
           hudRepairText.text = windRepair;
           hudIncomeText.text = windIncome;
        }
        else if((hydroExist && hydro.button.input.pointerOver()) || (!isResearched('hydro') && hydroResearch.button.input.pointerOver()))
        {
           tileInfoUI.frame = 5;
           hudCostText.text = hydroCost;
           hudPowerText.text = hydroPower;
           hudTimerText.text = hydroTimer;
           hudRepairText.text = hydroRepair;
           hudIncomeText.text = hydroIncome;
        }
        else if((nuclearExist && nuclear.button.input.pointerOver()) || (!isResearched('nuclear') && nuclearResearch.button.input.pointerOver()))
        {
           tileInfoUI.frame = 6;
           hudCostText.text = nuclearCost;
           hudPowerText.text = nuclearPower;
           hudTimerText.text = nuclearTimer;
           hudRepairText.text = nuclearRepair;
           hudIncomeText.text = nuclearIncome;
        }
        else
        {
            tileInfoUI.frame = 0;
            hudCostText.text = '';
            hudPowerText.text = '';
            hudTimerText.text = '';
            hudRepairText.text = '';
            hudIncomeText.text = '';  
        }
	    
        bgClouds.tilePosition.x -= 2;
        cloud.y += cloudGoUp;
        if (cloud.y >= 0){
            cloudGoUp = -.1;
        }
        else if (cloud.y <= -20){
            cloudGoUp = .1;
        }
        
        //update money
        moneyText.text = money;
        revenueText.text = '+' + revenue + '/s';
        voltage = 0;
        pollution = 0;
        for(var i = 0; i < gridMaxSize; i++)
        {
            voltage += power[i];
            pollution += totalPollution[i]; //*1000;
        }
        voltageText = Math.round(voltage / voltageWinCondition * 100);
        powerText.text = voltageText + '%';
        pollutionText.text = Math.round(pollution) + 'aqi';
        
        if (voltage >= voltageWinCondition && pollution <= 0 && !win){
            win = true;
            bgmStop();
            sfxPlay('sfxWin', 1);
            this.camera.fade('#000000', 4000);
            this.camera.onFadeComplete.add(winGame,this);
        }

        if(buildingPlaced && voltage == 0 && !death && !win)
        {
            //game.state.start('GameOver');
            death = true;
            deathCause = 'powerless';
            bgmStop();
            sfxPlay('sfxBoom', 1);
            this.camera.fade('#000000', 4000);
            this.camera.onFadeComplete.add(endGame,this);
        }
        
        
        
        if(goalSet == 1 && timerValue <= 0 && voltageText < 33 && !death && !win)
        {
            //game.state.start('GameOver');
            death = true;
            deathCause = 'deadline';
            bgmStop();
            sfxPlay('sfxBoom', 1);
            this.camera.fade('#000000', 4000);
            this.camera.onFadeComplete.add(endGame,this);
        }
        else if(goalSet == 1 && timerValue <= 0 && voltageText >= 33 && !death && !win){
            if(!tutorialEnabled){
                goal2 = new eventPopup(game, 'goal2', 0, 0);
                eventPopupRunEvent(goal2);
                goalSet = 2;
                timerValue = 60;
            }
        }
        
        if(goalSet == 2 && timerValue <= 0 && voltageText < 66 && !death && !win)
        {
            //game.state.start('GameOver');
            death = true;
            deathCause = 'deadline';
            bgmStop();
            sfxPlay('sfxBoom', 1);
            this.camera.fade('#000000', 4000);
            this.camera.onFadeComplete.add(endGame,this);
        }
        else if(goalSet == 2 && timerValue <= 0 && voltageText >= 66 && !death && !win){
            if(!tutorialEnabled){
                goal3 = new eventPopup(game, 'goal3', 0, 0);
                eventPopupRunEvent(goal3);
                goalSet = 3;
                timerValue = 60;
            }
        }
        
        if(goalSet == 3 && timerValue <= 0 && voltageText < 100 && !death && !win)
        {
            //game.state.start('GameOver');
            death = true;
            deathCause = 'deadline';
            bgmStop();
            sfxPlay('sfxBoom', 1);
            this.camera.fade('#000000', 4000);
            this.camera.onFadeComplete.add(endGame,this);
        }
        else if(goalSet == 3 && timerValue <= 0 && voltageText >= 100 && !death && !win){
            if(!tutorialEnabled){
                goal4 = new eventPopup(game, 'goal4', 0, 0);
                eventPopupRunEvent(goal4);
                goalSet = 4;
                timerValue = 180+60;
            }
        }
        
        if(goalSet == 4 && timerValue <= 0 && voltageText < 100 && pollution > 0 && !death && !win)
        {
            //game.state.start('GameOver');
            death = true;
            deathCause = 'deadline';
            bgmStop();
            sfxPlay('sfxBoom', 1);
            this.camera.fade('#000000', 4000);
            this.camera.onFadeComplete.add(endGame,this);
        }
        
        
        
        if (co2clouds1.x >= 200){
            co2GoRight = false;
        }
        else if (co2clouds1.x <= 0){
            co2GoRight = true;
        }
        
        switch(co2GoRight){
            case true:
                co2clouds1.x += .5;
                co2clouds2.x += .3;
                co2clouds3.x += .2;
                break;
            case false:
                co2clouds1.x -= .5;
                co2clouds2.x -= .3;
                co2clouds3.x -= .2;
                break;
        }
        
        pollution = pollution * .002;
        if(co2clouds1.y >= -400)
        {
            pollution += .0001;
        }

        if(co2clouds1.y < 300)
        {
            skyCO2.y += (pollution+residualPollution);
            co2clouds1.y+= (pollution+residualPollution);
            co2clouds2.y+= (pollution+residualPollution);
            co2clouds3.y+= (pollution+residualPollution);
            percentageCO2 = ((co2clouds1.y+400) / 700);
        }
        else if (!death && !win)
        {
            //scream.play();
            death = true;
            deathCause = 'co2';
            bgmStop();
            sfxPlay('sfxBoom', 1);
            this.camera.fade('#000000', 4000);
            this.camera.onFadeComplete.add(endGame,this);
            //sfxPlay('scream',.5);
            //game.state.start('GameOver');
        }
        
        gaugeCO2.scale.setTo(1,percentageCO2);
        
        if (buildingPlaced && percentageCO2 >= .5)
        {
            if(!bgmPlaying)
            {
                bgmPlaying = true;
                bgmStop();
                bgmPlay('bgm4', .25);
                //bgmPlay('bgm2', 1);
            }
        }
        
        if (death && !win) {
            if (deathCause == 'co2') gaugeCO2Loss.scale.setTo(1,1);
            if (deathCause == 'powerless' || deathCause == 'deadline') circledVoltage.scale.setTo(1);
            if (curtain.y < 0) {
                curtain.y += 20;
            }
        }

        //====TUTORIAL PROGRESSION====//
        
        if(buildingPlaced && tutorialEnabled && tutorialProgress <= 0){
            eventPopupRunEvent(tutorialPopup2);
        }
        
        //====END TUTORIAL PROGRESSION====//
       
        
        if(coalExist){
            if(coalCost > money){
                coalBuildCostText.fill = '#D10000';
            }
            else{
                coalBuildCostText.fill = '#00C86E';
            }
        }
        if(oilExist){
            if(oilCost > money){
                oilBuildCostText.fill = '#D10000';
            }
            else{
                oilBuildCostText.fill = '#00C86E';
            }
        }
        if(solarExist){
            if(solarCost > money){
                solarBuildCostText.fill = '#D10000';
            }
            else{
                solarBuildCostText.fill = '#00C86E';
            }
        }
        if(windExist){
            if(windCost > money){
                windBuildCostText.fill = '#D10000';
            }
            else{
                windBuildCostText.fill = '#00C86E';
            }
        }
        if(hydroExist){
            if(hydroCost > money){
                hydroBuildCostText.fill = '#D10000';
            }
            else{
                hydroBuildCostText.fill = '#00C86E';
            }
        }
        if(nuclearExist){
            if(nuclearCost > money){
                nuclearBuildCostText.fill = '#D10000';
            }
            else{
                nuclearBuildCostText.fill = '#00C86E';
            }
        }
        if(sellExist){
            if (buildingCount <= 1){
                sellCostText.fill = '#D10000';
            }
            else{
                sellCostText.fill = '#00C86E';
            }
        }
        if(repairExist){
            if (money < grid[selectedTileIndex].building.repair){
                repairCostText.fill = '#D10000';
            }
            else{
                repairCostText.fill = '#00C86E';
            }
        }
        
        if(!isResearched('oil')){
            if(researchCostOil > money){
                oilResearchCostText.fill = '#D10000';
            }
            else{
                oilResearchCostText.fill = '#00C86E';
            }
        }

        if(!isResearched('solar')){
            if(researchCostSolar > money){
                solarResearchCostText.fill = '#D10000';
            }
            else{
                solarResearchCostText.fill = '#00C86E';
            }
        }
        if(!isResearched('wind')){
            if(researchCostWind > money){
                windResearchCostText.fill = '#D10000';
            }
            else{
                windResearchCostText.fill = '#00C86E';
            }
        }
        if(!isResearched('hydro')){
            if(researchCostHydro > money){
                hydroResearchCostText.fill = '#D10000';
            }
            else{
                hydroResearchCostText.fill = '#00C86E';
            }
        }
        if(!isResearched('nuclear')){
            if(researchCostNuclear > money){
                nuclearResearchCostText.fill = '#D10000';
            }
            else{
                nuclearResearchCostText.fill = '#00C86E';
            }
        }





        
        if(voltage == 0)
        {
            city.frame = 0;
            city2.frame = 0;
        }
        else if(voltage >= 0 && voltage < voltageWinCondition/3)
        {
            city.frame = 1;
            city2.frame = 1;
        }
        else if(voltage >= (voltageWinCondition/3) && voltage < (voltageWinCondition/3)*2)
        {
            city.frame = 2;
            city2.frame = 2;
        }
        else if(voltage >= voltageWinCondition/3*2 && voltage < voltageWinCondition)
        {
            city.frame = 3;
            city2.frame = 3;
        }
        else if(voltage >= voltageWinCondition)
        {
            city.frame = 4;
            city2.frame = 4;
        }
        
        function endGame() {
            game.state.start('GameOver');
        }
        
        function winGame() {
            game.state.start('Win');
        }
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
        this.camera.flash('#000000', 1000);
        finishedFlash = false;
        this.camera.onFlashComplete.add(finishFlash,this);
        bgSky = game.add.sprite(0, 0, 'skyLose');
        switch(deathCause){
            case 'co2':
                loseText = game.add.sprite(0, 0, 'loseTextCO2');
                break;
            case 'powerless':
                loseText = game.add.sprite(0, 0, 'loseTextPowerless');
                break;
            case 'deadline':
                loseText = game.add.sprite(0, 0, 'loseTextDeadline');
                break;
            default:
                loseText = game.add.sprite(0, 0, 'loseTextCO2');
                break;
         }
        
        restartMouse = game.add.sprite(200, 600, 'restartMouse');
        restartMouse.animations.add('select', [0,1,0,1], 2, true);
        restartMouse.animations.add('started', [2], 8, true);
        restartMouse.animations.play('select');
        started = false;
        playedSFX = false;
        
        function finishFlash() {
            finishedFlash = true;
        }
	},
	update: function(){
        
        if (finishedFlash){
            game.input.onDown.add(openTheGame, this);
        }
        
        if (started){
            bgmStop();
            if (!playedSFX) {
                sfxPlay('sfxBoom', 1);
                playedSFX = true;
                this.camera.fade('#FFFFFF', 2000);
                this.camera.onFadeComplete.add(letUsStartTheGame2,this);
            }
        }
        
        //----FUNCTION: openTheGame----//
        
        function openTheGame() {
            started = true;
            restartMouse.animations.play('started');
        }
        
        function letUsStartTheGame2() {
            game.state.start('Game');
        }
	}
}

//------------------------------------------------------------------//
// State: Win
// - Handles the win screen
//------------------------------------------------------------------//

gameStates.Win = function(game){};
gameStates.Win.prototype = {
	create: function(){
		console.log('Win: create');
        bgmStop();
        this.camera.flash('#000000', 1000);
        finishedFlash = false;
        this.camera.onFlashComplete.add(finishFlash,this);
        bgSky = game.add.sprite(0, 0, 'skyWin');
        bgSky.animations.add('twinkle', [0,1,0,1], 5, true);
        bgSky.animations.play('twinkle');
        
        winText = game.add.sprite(0, 0, 'winText');
        
        starWin = game.add.sprite(600, 900, 'starWin');
        starWin.anchor.x = .5;
        starWin.anchor.y = .5;
        
        groundWin = game.add.sprite(0, 0, 'groundWin');
        
        restartMouse = game.add.sprite(200, 600, 'restartMouse');
        restartMouse.animations.add('select', [0,1,0,1], 2, true);
        restartMouse.animations.add('started', [2], 8, true);
        restartMouse.animations.play('select');
        started = false;
        playedSFX = false;
        
        function finishFlash() {
            finishedFlash = true;
        }
	},
	update: function(){
        starWin.angle += 1;
        
        if (finishedFlash){
            game.input.onDown.add(openTheGame, this);
        }
        
        if (started){
            bgmStop();
            if (!playedSFX) {
                sfxPlay('sfxBoom', 1);
                playedSFX=true;
                this.camera.fade('#FFFFFF', 2000);
                this.camera.onFadeComplete.add(letUsStartTheGame3,this);
            }
        }
        
        //----FUNCTION: openTheGame----//
        
        function openTheGame() {
            started = true;
            restartMouse.animations.play('started');
        }
        
        function letUsStartTheGame3() {
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
game.state.add('Start', gameStates.Start);
game.state.add('MainMenu', gameStates.MainMenu);
game.state.add('AskTutorial', gameStates.AskTutorial);
game.state.add('Game', gameStates.Play);
game.state.add('GameOver', gameStates.GameOver);
game.state.add('Win', gameStates.Win);

//------------------------------------------------------------------//
// Start Game
//------------------------------------------------------------------//

game.state.start('Preloader');