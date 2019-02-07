document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.scale(10, 10);

    // change;
    function createGrid(width, height) {
        const grid = [];
        while (height > 0) {
            matrix.push(new Array(width).fill(0));
            height--;
        }
        return grid;
    }
});