const BLOCKS = {
    0: ["Red"],
    1: ["Yellow"],
    2: ["Green"],
    3: ["Blue"],
    4: ["Purple"],
    5: ["Grey"]
};

const MOVEMENT = {
	Static : "Static",
	Fall : "Fall",
	Clear : "Clear",
	Null : "Null"
};

export default class Block {
    constructor(props) {
        super(props);
        this.color = BLOCKS[Math.floor(Math.random() * 6)];
        this.movement = MOVEMENT.Static;
    }

}