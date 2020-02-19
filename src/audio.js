class Audio {
    constructor(file) {
        this.source = file;
    }

    playMusic() {
        this.source.play();
    }

    stopMusic() {
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