const BLOCKS = {
    0: ["R"],
    1: ["Y"],
    2: ["G"],
    3: ["B"],
    4: ["P"],
    5: ["S"]
};

export default class Block {
    constructor(pos) {
        this.pos = pos;
        this.color = this.randomBlock();
    }

    randomBlock() {
        return BLOCKS[Math.floor(Math.random() * 6)];
    }

    
}
