export default class NullBlock extends Block {
    constructor(props) {
        super(props);
        this.color = BLOCKS[Math.floor(Math.random() * 6)];
        this.movement = MOVEMENT.Static;
    }
}