//==================================================================//
// eventPopup.js
// - Handles textbox system
//==================================================================//

var currentEvents = new Array(6);
var activeEvent;
var paused = false;
var pausedEvent = false;

function eventPopupActivate(popup){
    popup.button.inputEnabled = true;
    popup.button.scale.setTo(0.75);
    //popup.button.frame = 0;
}

function eventPopupRunEvent(popup){
    if(paused || pausedEvent) return; // don't do anything when paused

    if(popup.choiceType == 'ok'){
        popup.eventWindow.panel.scale.setTo(1);
        popup.eventWindow.info.scale.setTo(1);
        popup.eventWindow.boxImage.scale.setTo(1);
        popup.eventWindow.okayButton.scale.setTo(1);
    }
    else if(popup.choiceType == 'choice'){
        popup.eventWindow.panel.scale.setTo(1);
        popup.eventWindow.info.scale.setTo(1);
        popup.eventWindow.boxImage.scale.setTo(1);
        popup.eventWindow.yesButton.scale.setTo(1);
        popup.eventWindow.noButton.scale.setTo(1);
    }
    pausedEvent = true;
}

//------------------------------------------------------------------//
// Prefab: eventPopup
// - The event object
//------------------------------------------------------------------//

function eventPopup(game, key, xPos, yPos) //, icon)
{
    //this.pauseScreenTextless = game.add.sprite(0,0,'pauseScreenTextless');
    //this.pauseScreenTextless.scale.setTo(0);
    this.button = game.add.button(xPos, yPos, 'popupBubble', actionOnClick, this);
    this.button.animations.add('plain', [1,4], 4, true);
    this.button.animations.add('mild', [2,5], 4, true);
    this.button.animations.add('spicy', [3,6], 4, true);
    this.button.animations.add('tutorial', [7,8], 4, true);
    
    
    switch(key){
        case 'tutorial1':
            this.choiceType = 'ok';
            this.button.animations.play('tutorial');
            break;
        case 'tutorial2':
            this.choiceType = 'ok';
            this.button.animations.play('tutorial');
            break;
        case 'tutorialEnable':
            this.choiceType = 'choice';
            //this.button.frame = 0;
            break;
        case 'goal1':
            this.choiceType = 'ok';
            break;
        default:
            this.choiceType = 'ok';
            this.button.animations.play('plain');
            break;
    }
    this.button.scale.setTo(0);
    
    //this.button = icon;
    this.button.inputEnabled = false;
    this.button.frame = 0;
    this.eventWindow = new eventWindow(game, key, 200, 300, this, this.choiceType);
    this.eventWindow.panel.scale.setTo(0);
    this.eventWindow.info.scale.setTo(0);
    this.eventWindow.boxImage.scale.setTo(0);
    this.eventWindow.okayButton.scale.setTo(0);
    this.eventWindow.yesButton.scale.setTo(0);
    this.eventWindow.noButton.scale.setTo(0);
    
    function actionOnClick()
    {
        if(paused || pausedEvent) return; // don't do anything when paused
        
        if(this.choiceType == 'ok'){
            this.eventWindow.panel.scale.setTo(1);
            this.eventWindow.info.scale.setTo(1);
            this.eventWindow.boxImage.scale.setTo(1);
            this.eventWindow.okayButton.scale.setTo(1);
        }
        else if(this.choiceType == 'choice'){
            this.eventWindow.panel.scale.setTo(1);
            this.eventWindow.info.scale.setTo(1);
            this.eventWindow.boxImage.scale.setTo(1);
            this.eventWindow.yesButton.scale.setTo(1);
            this.eventWindow.noButton.scale.setTo(1);
        }
        pausedEvent = true;
    }
}

eventPopup.prototype = Object.create(Phaser.Sprite.prototype);
eventPopup.prototype.constructor = eventPopup;

eventPopup.prototype.update = function(){

}

//------------------------------------------------------------------//
// Prefab: eventWindow
// - The event object's text window
//------------------------------------------------------------------//

function eventWindow(game, key, xPos, yPos, popup, type){
    this.panel = game.add.sprite(xPos, yPos, 'messageBox');
    this.info = game.add.text(xPos+60, yPos+60, 'Hello World!\nHello World!\nHello World!\nHello World!\nHello World!\nHello World!\nHello World!\nHello World!' , { fontSize: '20px', fill: '#000' });
    this.boxImage = game.add.sprite(xPos+540, yPos+60, 'boxImage');
    this.textIndex = 0;
    this.textQueue;
    this.approveType = type;
    this.okayButton = game.add.button(xPos+60, yPos+300, 'okayButtonLong', okay, this);
    this.yesButton = game.add.button(xPos+60, yPos+300, 'yesButton', yes, this);
    this.noButton = game.add.button(xPos+300, yPos+300, 'noButton', no, this);
    
    switch(key){
        case 'tutorial1':
            this.textQueue = new Array(5);
            this.textQueue[0] = "Welcome to the office, Mayor!\nMy name is Mr. Green. I will be acting as your \nautomated AI advisor.\n\nAs indicated in the Neo Paris Agreement, you \nhave been assigned to revamp Greenvale's \nenergy to clean, nonrenwable sources.";
            this.textQueue[1] = "Unfortunately, there are major issues.\nAs you know, recently an earthquake severely\ndamaged Greenvale's infrastructure.\n\nThe city has gone dark, the terrain of the city's \noutskirts has been drastically altered, and much \nof our funds have gone towards relief efforts.";
            this.textQueue[2] = "As such, unfortunately we do not have the \nimmediate resources to fully commit to the \nNeo Paris Agreement.\n\nWe need to start from scratch!";
            this.textQueue[3] = "Let's begin with the interface.\nThe commitment begins with repowering the city!\n\nThe bottom grid represents Terrain Tiles.\nThis represents the space you have to\nconstruct power sources.";
            this.textQueue[4] = "Clicking on a tile reveals available buildings\nto build on the bottom right.\nNot all buildings can be placed on given tiles.\nClicking these icons\nwill purchase the building for that tile.\nRight now, we only have the resources to\nconstruct a Coal Plant.\nTry building one right now.";
            this.info.text = this.textQueue[this.textIndex];
            break;
        case 'tutorial2':
            this.textQueue = new Array(13);
            this.textQueue[0] = "Great job!\n\nYou may have noticed that hovering\nover your available buildings brings up\ninformation where tile info is supposed to be.";
            this.textQueue[1] = "The information given here are as follows,\nfrom top to bottom:\n- Cost\n- Voltage Given\n- Time until Breakdown\n- Repair Cost\n- Money gained per second";
            this.textQueue[2] = "Cost indicates how much Money it takes to\nplace the building.\n\nVoltage indicates the percentage of power the\nbuilding contributes to the city.\n\nMoney per second is self-descriptive.";
            this.textQueue[3] = "Time until Breakdown indicates how many\nseconds until the building stop producing\nMoney and Voltage.\n\nThis is important, as having 0 Voltage after\nplacing a building leads to a GAME OVER.";
            this.textQueue[4] = "Repair Cost is the cost of preventing this\nfrom happening.\n\nTo offset Breakdowns, clicking on a building will\nbring up a Repair button that, when clicked,\nwill deduct that cost from your money.";
            this.textQueue[5] = "A bubble will appear on the top right corners\nof buildings that need repairs.\n\nIt takes a while for buildings to fully breakdown,\nbut still be wary and repair diligently.";
            this.textQueue[6] = "If a building is too costly to repair, you can\nalso sell a building to remove it from play\nand gain half of its buying cost back.\nSell button appears right of the Repair button.\n\nYou can't sell a building if it's the only\none left.";
            this.textQueue[7] = "One other implicit piece of info:\nDifferent tile types can affect the output of\nthe buildings that you buy.\n\nFor instance, if you placed the Coal Plant\nonto a gray Mountain tile, the \nmoney/voltage/pollution outputs are all doubled!\nFactor this into decision making.";
            this.textQueue[8] = "The next mechanic that we'll discuss is R&D.\nTo the right of the screen are new buildings\nyou can purchase to build.\nIf you want to work faster towards\nrenewable energy, it's highly recommended that\nyou purchase these options,\nelse Coal will be all you have.";
            this.textQueue[9] = "These buildings have different properties\nthan Coal that you can figure out\nas you play the game.\n\nR&D is the only way to truly win, so definitely\npay attention to what you can unlock.";
            this.textQueue[10] = "Lastly, let's go over win/loss conditions.\n\nYou win by having 100% Voltage or more, and\n0aqi pollution rating.\n\nYou lose if you get to 0% Voltage or if\nthe CO2 gauge on the left fills full.";
            this.textQueue[11] = "You can also lose from not meeting Deadlines,\ngoals that are set for you within the game.\nThese timed events will make you lose if\nthe condition isn't fulfilled when their timers\nreach 0.";
            this.textQueue[12] = "And that's all you need to know!\n\nThis tutorial could've been better, but this\ngame has been rushed to hell and back!\n\nLet's GO!";
            this.info.text = this.textQueue[this.textIndex];
            break;
        case 'tutorialEnable':
            this.info.text = "Do you wish to go through a\ntutorial of the game first?";
            break;
        case 'goal1':
            this.info.text = "Get to 33% energy in 1 minute!\nDoesn't have to be renewable, but people\nare demanding responsibility fast!\n\nTry not to let this initial CO2 footprint\nget too high...";
            break;
        case 'goal2':
            this.info.text = "Hey chief, think you can do 66% energy\nin 1 minute?\n\nCity's satisfied with the progress so far,\nand would like to go further!\n\n...watch the clouds, though.";
            break;
        case 'goal3':
            this.info.text = "We're getting there!\n\n100% energy in 1 minute, let's go!\nGreenvale is counting on you!";
            break;
        case 'goal4':
            this.info.text = "Fantastic!\nNow that we've completed the deadline,\nwe need to convert to renewable energy.\n\nGet the city to 100% Voltage & 0aqi Pollution\nbefore 4 minutes!\nThe world is waiting for us to\ncomply with the Neo Paris Agreement!";
            break;
    }
    
//    switch(this.approveType){
//        case 'ok':
//            this.okayButton = game.add.button(xPos+60, yPos+300, 'okayButtonLong', okay, this);
//            break;
//        case 'choice':
//            this.okayButton = game.add.button(xPos+60, yPos+300, 'okayButtonLong', okay, this);
//            break;
//        default:
//            this.okayButton = game.add.button(xPos+60, yPos+300, 'okayButtonLong', okay, this);
//            break;
//    }
    
    function okay(){
        sfxPlay('sfxButton', 1);
        switch(key){
            case 'tutorial1':
                if(this.textIndex >= this.textQueue.length-1){
                    obliterateThisEvent(this);
                }
                else{
                    this.textIndex++;
                    this.info.text = this.textQueue[this.textIndex];
                }
                break;
            case 'tutorial2':
                if(this.textIndex >= this.textQueue.length-1){
                    tutorialProgress = 1;
                    tutorialEnabled = false;
                    bgmStop();
                    game.state.start('Game');
                    obliterateThisEvent(this);
                }
                else{
                    this.textIndex++;
                    this.info.text = this.textQueue[this.textIndex];
                }
                break;
            case 'goal1':
                obliterateThisEvent(this);
                break;
            case 'goal2':
                obliterateThisEvent(this);
                break;
            case 'goal3':
                obliterateThisEvent(this);
                break;
            case 'goal4':
                obliterateThisEvent(this);
                break;
        }
    }
    
    function yes(){
        sfxPlay('sfxButton', 1);
        switch(key){
            case 'tutorialEnable':
                tutorialEnabled = true;
                obliterateThisEvent(this);
                game.state.start('Game');
                break;
        }
    }
    
    function no(){
        sfxPlay('sfxButton', 1);
        switch(key){
            case 'tutorialEnable':
                tutorialEnabled = false;
                obliterateThisEvent(this);
                game.state.start('Game');
                break;
        }
    }
    
    function obliterateThisEvent(thisEvent){
        pausedEvent = false;
        thisEvent.panel.kill();
        thisEvent.info.kill();
        thisEvent.boxImage.kill();
        thisEvent.okayButton.kill();
        thisEvent.yesButton.kill();
        thisEvent.noButton.kill();
        //popup.pauseScreenTextless.kill();
        popup.button.kill();
        popup.kill();
        thisEvent.kill();
    }
}
    
eventWindow.prototype = Object.create(Phaser.Sprite.prototype);
eventWindow.prototype.constructor = eventWindow;

eventWindow.prototype.update = function(){

}