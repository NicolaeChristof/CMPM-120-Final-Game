//==================================================================//
// audioControl.js
// - BGM manager/player
//==================================================================//
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

