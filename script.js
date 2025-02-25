const player = document.getElementById("player");
const fallingBox = document.getElementById("falling-box");
const gameContainer = document.getElementById("game-container");
let playerPosition = 175;
let fallingPosition = 0;
let fallingSpeed = 10;
let score = 0;
document.addEventListener("keydown", function(event) {
if (event.key === "ArrowLeft" && playerPosition > 0) {
playerPosition -= 20;
} else if (event.key === "ArrowRight" && playerPosition < 350) {
playerPosition += 20;
}
player.style.left = playerPosition + "px";
});
function dropBox() {
fallingPosition += fallingSpeed;
fallingBox.style.top = fallingPosition + "px";
if (fallingPosition > 450) {
if (Math.abs(playerPosition - parseInt(fallingBox.style.left)) < 40) {
score++;
alert("Berhasil menangkap! Skor: " + score);
}
fallingPosition = 0;
fallingBox.style.left = Math.floor(Math.random() * 370) + "px";
}
requestAnimationFrame(dropBox);
}
dropBox();