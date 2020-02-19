class Cursor {
    constructor() {
        this.y = 7;
        this.x = 2;
        this.score = 0;
    }

    move(y, x) {
        let dy = this.y + y;
        let dx = this.x + x;

        if (dx <= 4 && dx >= 0) {
            this.x = dx;
        }
        
        if (dy < 12 && dy >= 0) {
            this.y = dy;
        }
    }
}

export default Cursor;