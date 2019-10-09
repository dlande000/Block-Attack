class Audio {
    constructor(file) {
        this.source = file;
        this.musicPlaying = false;
    }

    playMusic() {
        this.musicPlaying = true;
        this.source.play();
    }

    stopMusic() {
        this.musicPlaying = false;
        this.source.pause();
        this.source.currentTime = 0;
    }

    playSoundEffect() {
        this.source.play();
                setTimeout(() => {
                    this.source.pause();
                    this.source.currentTime = 0;
                }, 450);
    }
}

export default Audio;