//==================================================================//
// audioControl.js
// - BGM manager/player
//==================================================================//

function audioControl() {

    function bgmPlay(key, vol) {
        bgmCurrent = game.add.audio(key);
        bgmCurrent.volume = vol;
        bgmCurrent.loop = true;
        bgmCurrent.play();
    }
    
    function bgmSetVolume(vol) {
        bgmCurrent.volume = vol;
    }
    
    function sfxPlay(key, vol) {
        sfxCurrent = game.add.audio(key);
        sfxCurrent.volume = vol;
        sfxCurrent.loop = false;
        sfxCurrent.play();
    }

}

audioControl.prototype = Object.create(Phaser.Sprite.prototype);
audioControl.prototype.constructor = audioControl;
audioControl.prototype.update = function(){
    
}