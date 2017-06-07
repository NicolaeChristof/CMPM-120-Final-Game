//==================================================================//
// eventPopup.js
// - Tile prefab for the tiles
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
            this.textQueue[4] = "Clicking on a tile brings up info about the tile \non the bottom left of the screen, and available \nbuildings to build on the bottom right.\n\nRight now, we only have the resources to\nconstruct a Coal Plant.\nTry building one right now.";
            this.info.text = this.textQueue[this.textIndex];
            break;
        case 'tutorial2':
            this.textQueue = new Array(1);
            this.textQueue[0] = "Great job!"
            this.info.text = this.textQueue[this.textIndex];
            break;
        case 'tutorialEnable':
            this.info.text = "Do you wish to go through a\ntutorial of the game first?";
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
                tutorialProgress = 1;
                obliterateThisEvent(this);
                break;
        }
    }
    
    function yes(){
        switch(key){
            case 'tutorialEnable':
                tutorialEnabled = true;
                game.state.start('Game');
                obliterateThisEvent(this);
                break;
        }
    }
    
    function no(){
        switch(key){
            case 'tutorialEnable':
                tutorialEnabled = false;
                game.state.start('Game');
                obliterateThisEvent(this);
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