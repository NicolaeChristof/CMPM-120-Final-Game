//==================================================================//
// assetLoader.js
// - Handles asset loading
//==================================================================//

function loadAllAssets() {
    loadAllImages();
    loadAllSprites();
    loadAllAudio();
}

//----LOAD IMAGES----//
function loadAllImages() {
    //game.load.image('cloud', 'assets/images/randall.png');
    game.load.image('clouds', 'assets/images/clouds.png');
    game.load.image('sky' , 'assets/images/sky.png');
    game.load.image('skyCO2' , 'assets/images/skyCO2.png');
    game.load.image('co2clouds1' , 'assets/images/co2clouds1.png');
    game.load.image('co2clouds2' , 'assets/images/co2clouds2.png');
    game.load.image('co2clouds3' , 'assets/images/co2clouds3.png');
    
    game.load.image('curtain' , 'assets/images/curtain.png');

    game.load.image('wind', 'assets/images/UpWind.png');
    game.load.image('windOW', 'assets/images/WindOW.png');

    game.load.image('nuclear', 'assets/images/UpNuclear.png');
    game.load.image('nuclearOW', 'assets/images/NuclearOW.png');

    game.load.image('solar', 'assets/images/UpSolar.png');
    game.load.image('solarOW', 'assets/images/SolarOW.png');

    game.load.image('coal', 'assets/images/UpCoal.png');
    game.load.image('coalOW', 'assets/images/CoalOW.png');

    game.load.image('oil', 'assets/images/UpOil.png');
    game.load.image('oilOW', 'assets/images/OilOW.png');

    game.load.image('hydro', 'assets/images/UpHydro.png');
    game.load.image('hydroOW', 'assets/images/HydroOW.png');

    game.load.image('controlpanel' , 'assets/images/UI2.png');

    game.load.image('start', 'assets/images/Start.png');
    game.load.image('startClouds', 'assets/images/StartClouds.png');

    game.load.image('sell', 'assets/images/Sell.png');
    game.load.image('sell2', 'assets/images/SellCursor.png');

    game.load.image('repair', 'assets/images/Repair.png');
    game.load.image('repair2' ,'assets/images/RepairCursor.png');
    
    //game.load.image('city2', 'assets/images/city.png');
    
    game.load.image('hudInfobox', 'assets/images/hudInfo.png');
    game.load.image('hudSidebars', 'assets/images/hudSidebars.png');
    game.load.image('hudResources', 'assets/images/hudInfoResources.png');
    game.load.image('hudMoney', 'assets/images/hudInfoMoney.png');
    
    game.load.image('StartTitle', 'assets/images/StartGameTitle.png');
    
    game.load.image('gaugeCO2', 'assets/images/gaugeCO2.png');
    game.load.image('gaugeCO2Loss', 'assets/images/gaugeCO2Loss.png');
    
    game.load.image('iconEmpty', 'assets/images/iconEmpty.png');
    game.load.image('iconDouble', 'assets/images/iconDouble.png');
    
    game.load.image('loseVoltageCircle', 'assets/images/loseVoltageCircle.png');
    game.load.image('skyLose', 'assets/images/skyLose.png');
    game.load.image('loseTextCO2', 'assets/images/loseTextCO2.png');
    game.load.image('loseTextPowerless', 'assets/images/loseTextPowerless.png');
    
    game.load.image('winText', 'assets/images/WinText.png');
    game.load.image('starWin', 'assets/images/StarWin.png');
    game.load.image('groundWin', 'assets/images/GroundWin.png');
}

//----LOAD SPRITESHEETS----//
function loadAllSprites() {
    game.load.spritesheet('grass', 'assets/images/FieldSS.png', 200, 200);
    game.load.spritesheet('mountain', 'assets/images/mountainSS.png', 200, 200);
    game.load.spritesheet('water', 'assets/images/waterSS.png' , 200, 200);
    game.load.spritesheet('city', 'assets/images/City.png', 500, 500);
    game.load.spritesheet('titleMouse', 'assets/images/StartMouseUI.png', 800, 200);
    game.load.spritesheet('restartMouse', 'assets/images/RestartMouseUI.png', 800, 200);
    
    game.load.spritesheet('skyWin', 'assets/images/skyWin.png', 1200, 1200);
}

function loadAllAudio() {
    //----LOAD BGM----//
    game.load.audio('bgm', ['assets/audio/bgm/bgm.ogg','assets/audio/bgm/bgm.mp3' ]);
    game.load.audio('bgm2', ['assets/audio/bgm/bgm_2.ogg','assets/audio/bgm/bgm_2.mp3' ]);
    game.load.audio('bgmTitle', ['assets/audio/bgm/bgm_title.ogg','assets/audio/bgm/bgm_title.mp3' ]);

    //----LOAD SFX----//
    game.load.audio('scream', ['assets/audio/sfx/scream.ogg','assets/audio/sfx/scream.mp3']);
    game.load.audio('button', ['assets/audio/sfx/select.ogg' , 'assets/audio/sfx/select.mp3']);
    game.load.audio('wrong', ['assets/audio/sfx/wrong.ogg' , 'assets/audio/sfx/wrong.mp3']);
    game.load.audio('sell', ['assets/audio/sfx/sell.ogg' , 'assets/audio/sfx/sell.mp3']);
    game.load.audio('occupied', 'assets/audio/sfx/occupied.ogg');
    game.load.audio('sfxBoom', ['assets/audio/sfx/sfx_boom.ogg' , 'assets/audio/sfx/sfx_boom.mp3']);
    game.load.audio('sfxWin', ['assets/audio/sfx/sfx_win.ogg' , 'assets/audio/sfx/sfx_win.mp3']);
    game.load.audio('sfxBuild', ['assets/audio/sfx/sfx_build.ogg' , 'assets/audio/sfx/sfx_build.mp3']);
}