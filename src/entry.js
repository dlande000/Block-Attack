document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.scale(10, 10);

    const board = new Array(12).fill(new Array(6).fill(0));

});