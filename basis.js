// Selecting DOM elements
const startButton = document.getElementById("start-btn");
const gameSection = document.getElementById("game");
const timerElement = document.getElementById("timer");
const clickButton = document.getElementById("click-btn");
const clickCountElement = document.getElementById("click-count");
const modal = document.getElementById("modal");
const nameInput = document.getElementById("name-input");
const closeButton = document.getElementsByClassName("close")[0];
const leaderboardList = document.getElementById("leaderboard");
const resetButton = document.getElementById("reset-btn"); // added reset button
const clickTimer = document.getElementById("click-btn_clicker")
// Game variables
let clickCount = 0;
let timeLeft = 10;
let timerId = null;
let leaderboard = [];
let isTimeUp = false;
//Audio
let audioClick = new Audio("image/audio_editor_output.mp3");
let audioRestart = new Audio("image/pozabavimsja.mp3");
let audioStart = new Audio("image/arthasyes4.mp3");
let audioTimer = new Audio("image/peasantwhat3.mp3");
// Event listeners
startButton.addEventListener("click", startGame);
closeButton.addEventListener("click", closeModal);
resetButton.addEventListener("click", resetGame);
clickButton.addEventListener("click", startGameclick);
clickTimer.addEventListener("click", startTime);
clickButton.addEventListener("click", (ev) => {
    audioClick.play();
});
resetButton.addEventListener("click", (ev) => {
    audioTimer.play();
});
startButton.addEventListener("click", (ev) => {
    audioStart.play();
});
clickTimer.addEventListener("click", (ev) => {
    audioRestart.play();
});
// Functions
function startGame() {
    startButton.style.display = "none";
    gameSection.style.display = "block";
}
function startGameclick (){
    clickButton.addEventListener("click", incrementClickCount); // додано
}
function startTime () {
    timerElement.textContent = `Час: ${timeLeft} сек.`;
    timerId = setInterval(decrementTimer, 1000);
    clickTimer.disabled = true;
}

function decrementTimer() {
    timeLeft--;
    timerElement.textContent = `Час: ${timeLeft} сек.`;
    if (timeLeft === 0) {
        clearInterval(timerId);
        isTimeUp = true;
        openModal();
    }
}

function incrementClickCount() {
    if (timerId !== null) { // check if the timer has started
        if (!isTimeUp) {
            clickCount++;
            clickCountElement.textContent = `Кількість кліків: ${clickCount}`;
        }
    }
}

function openModal() {
    submitName();
    const name = nameInput.value.trim() === "" ? "Гравець" : nameInput.value.trim();
    leaderboard.push({ name: name, score: clickCount });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboardList.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        const li = document.createElement("li");
        if (index === 0 && entry.name === name) {
            li.classList.add("winner");
        }
        li.textContent = `${entry.name}: ${entry.score} кліків`;
        leaderboardList.appendChild(li);
    });
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    resetGame();
}

function resetGame() {
    clickCount = 0;
    timeLeft = 10;
    timerElement.textContent = "";
    clickCountElement.textContent = "";
    nameInput.value = "";
    clearInterval(timerId);
    clickButton.removeEventListener("click", incrementClickCount); // додано
    isTimeUp = false;
    clickTimer.disabled = false;
}
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});


function submitName() {

}
