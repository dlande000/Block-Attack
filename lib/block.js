const BLOCKS = {
    0: ["R"],
    1: ["Y"],
    2: ["G"],
    3: ["B"],
    4: ["P"],
    5: ["S"]
};

export default class Block {
    randomBlock() {
        return BLOCKS[Math.floor(Math.random() * 6)];
    }

    drop() {
        
    }
}
