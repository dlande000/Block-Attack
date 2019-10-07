class Block {
    constructor() {
        this.value = this.randomBlock();
    }

    randomBlock() {
        const blocks = "RYGBDP";
        return blocks[Math.floor(Math.random() * 6)];
    }
}

export default Block;