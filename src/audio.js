class Audio {
    constructor() {
        this.music = document.getElementById("music");
        this.soundEffect = document.getElementById("sound-effect");
        this.musicPlaying = false;
    }

    playMusic() {
        if (!this.musicPlaying) {
            this.music.pause();
            this.music.currentTime = 0;
        } else {
            this.music.play();
        }
    }

    playSoundEffect() {
        if (this.musicPlaying) {
            this.soundEffect.play();
            setTimeout(() => {
                this.soundEffect.pause();
                this.soundEffect.currentTime = 0;
            }, 450);
        }
    }
}

export default Audio;