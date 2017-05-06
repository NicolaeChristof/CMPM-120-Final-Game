var game = new Phaser.Game(500, 350, Phaser.AUTO);

var platforms;
var score = 0;
var scoreText;
var spawnHurdle = 1;
var delay = 3000;
var timeCheck;

// define Preloader state and methods
var Preloader = function(game){};
Preloader.prototype = {
    preload: function(){
        console.log('Preloader: preload');

        // load images
        game.load.image('sky', 'assets/images/sky.png');
        game.load.image('ground', 'assets/images/platform.png');
        game.load.image('hurdles', 'assets/images/hurdle.png');
        game.load.image('MainMenu', 'assets/images/MainMenu.png');
        game.load.image('gameOver', 'assets/images/gameOver.png');

        // load sounds
        game.load.audio('ping', 'assets/sounds/p-ping.mp3');
        game.load.audio('jumping', 'assets/sounds/numkey.wav');
        game.load.audio('death', 'assets/sounds/shot1.wav');
        game.load.audio('backgroundMusic', 'assets/sounds/tommy_in_goa.mp3');

        // load spritesheet
        game.load.spritesheet('runner', 'assets/sprites/dude.png', 32, 48);
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
        console.log('MainMenu: create');
        MainMenu = game.add.tileSprite(0, 0, 500, 350, 'MainMenu');
        startKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    },
    update: function(){
        console.log('MainMenu: create');
    	if(startKey.isDown){
    		game.state.start('Game');
    	}
    }
}


// define Game state and methods
var Game = function(game){};
Game.prototype = {

    preload: function() {
        // preload assets

    },
    
    create: function(){
        // set delay
        delay = 3000;

        // create sounds
        ping = game.add.audio('ping');
        ping.loop = false;

        jumping = game.add.audio('jumping');
        jumping.loop = false;

        death = game.add.audio('death');
        death.loop = false;

        backgroundMusic = game.add.audio('backgroundMusic');

        backgroundMusic.play();

        // ------------------- Set up game physics and background --------------------
    
        // Enable Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
    
        // Sets a background
        sky = game.add.tileSprite(0, 0, 500, 350, 'sky');
    
        // Scale sky to fit screen
        sky.height = game.height;
        sky.width = game.width;
    
        // --------------- Sets platform physics and creates platforms ----------------
    
        // The platforms group contains the ground and the 2 ledges we can jump onto
        platforms = game.add.group();
    
        // We will enable physics for any object that is created in this group
        platforms.enableBody = true;
    
        // Create the ground
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        // Scale the ground to fit the screen
        ground.scale.setTo(1,2);
    
        // Sets ground to be immobile
        ground.body.immovable = true;

        // create bound to kill hurdles
        bounds = game.add.group();
        bounds.enableBody = true;

        // create bound to kill hurdles
        var bound = bounds.create(-64, game.world.height - 112, 'hurdles');
    
        // ------------------- Creates player object and adds physics ----------------
    
        // The player and its settings
        player = game.add.sprite(32, game.world.height - 120, 'runner');
    
        // Enable player physics
        game.physics.arcade.enable(player);
    
        // Player physics properties
        //player.body.bounce.y = 0.2;
        player.body.gravity.y = 900;
        player.body.collideWorldBounds = true;
    
        // Animation
        player.animations.add('right', [5, 6,7,8], 10, true);
        player.animations.add('jump', [6], 10, true);
        //player.animations.add('fall', [0, 1], 10, false);
    
        // ------------------ Create hurdles group and add properties ------------------
    
        // Create hurdle group
        hurdles = game.add.group();
        hurdles.enableBody = true;
    
        //hurdles.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', deleteHurdle, this);
        //hurdles.setAll('checkWorldBounds', true);

        // --------------------------------- Score ------------------------------------
        score = 0;
        scoreText = game.add.text(100, 50, 'hurdles jumped: = 0', { fontSize: '32px', fill: '#000' });
    },

    update: function() {
        // run game loop
    
        sky.tilePosition.y -= 4;
        //ground.tilePostion.x -= 4;
        // ------------------------------ Collisions ---------------------------------

        // Collide the player with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);
    
        // Collide the hurdles with the platforms
        game.physics.arcade.collide(hurdles, platforms);
    
        // Collide the player with the hurdles
        //game.physics.arcade.collide(player, hurdles);
    
        // Check if the player overlaps with a hurdle
        game.physics.arcade.overlap(player, hurdles, gameOver, null, this);
    
        // Takes player to the game over state
        function gameOver(){
        	death.play();
        	backgroundMusic.stop();
            game.state.start('GameOver');
        }

        game.physics.arcade.overlap(bounds, hurdles, killHurdle, null, this);

        function killHurdle(bounds, hurdle){
            hurdle.kill();

            ping.play();

    	// add and update score
    	    score += 1;
    	    scoreText.text = 'hurdles jumped: = ' + score;
        }

        // ------------------------- Checks user input and animate -------------------------
    
        cursors = game.input.keyboard.createCursorKeys();
    
        // Reset the players velocity
        // player.body.velocity.x = 0;
    
        // Allow the player to jump if they are touching ground
        if(cursors.up.isDown && player.body.touching.down && hitPlatform){
        	// Jump
            player.body.velocity.y = -350;
            jumping.play();
            player.animations.play('jump');
        } else if(hitPlatform){
            // Move right
            player.animations.play('right');
        }
    
        // --------------------------------- Spawn Hurdles ----------------------------------
    
        if(spawnHurdle == 1){
    	    var hurdle = hurdles.create(520, game.world.height-112, 'hurdles');
    	    hurdle.body.gravity.x = -100;
        	timeCheck = game.time.now;
        	spawnHurdle = 0;
        }
    
        if(game.time.now - timeCheck > delay){
    	    spawnHurdle = 1;
    	    if(delay > 900){
    		    delay -= 100;
        	}
        }
    }
}

// define GameOver state and methods
var GameOver = function(game){};
GameOver.prototype = {
	create: function(){
		console.log('GameOver: create');
        gameOver = game.add.tileSprite(0, 0, 500, 350, 'gameOver');
        scoreText = game.add.text(130, 50, 'Your score: ' + score, { fontSize: '32px', fill: '#ff0000' });
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