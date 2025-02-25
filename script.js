const player = document.getElementById("player");
const fallingBox = document.getElementById("falling-box");
const gameContainer = document.getElementById("game-container");
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");
let playerPosition = 175;
let fallingPosition = 0;
let fallingSpeed = 10;
let score = 0;

// Deteksi apakah perangkat Android
function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

// Tampilkan tombol Android jika perangkat Android
if (isAndroid()) {
    document.getElementById("androidButton").style.display = "block";
}

// Fungsi untuk menangani tombol Android (bisa disesuaikan)
document.getElementById("androidButton").addEventListener("click", function() {
    alert("Tombol Android Ditekan!");
});

// Fungsi untuk menggerakkan pemain dengan joystick
let stickOffsetX, stickOffsetY, isDragging = false;

stick.addEventListener("mousedown", (e) => {
    isDragging = true;
    stickOffsetX = e.clientX - stick.offsetLeft;
    stickOffsetY = e.clientY - stick.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        let newX = e.clientX - stickOffsetX - joystick.offsetLeft;
        let newY = e.clientY - stickOffsetY - joystick.offsetTop;
        let dist = Math.sqrt(newX * newX + newY * newY);

        if (dist < 45) {
            stick.style.left = newX + "px";
            stick.style.top = newY + "px";
        } else {
            let angle = Math.atan2(newY, newX);
            stick.style.left = Math.cos(angle) * 45 + "px";
            stick.style.top = Math.sin(angle) * 45 + "px";
        }

        // Gerakkan pemain berdasarkan posisi stick
        playerPosition += (newX / 5);  // Menyesuaikan kecepatan gerak
        if (playerPosition < 0) playerPosition = 0;
        if (playerPosition > 350) playerPosition = 350;
        player.style.left = playerPosition + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    stick.style.left = "0px";
    stick.style.top = "0px";
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
