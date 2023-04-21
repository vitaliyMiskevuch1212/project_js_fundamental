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

// Game variables
let clickCount = 0;
let timeLeft = 10;
let timerId = null;
let leaderboard = [];

// Event listeners
startButton.addEventListener("click", startGame);
clickButton.addEventListener("click", incrementClickCount);
closeButton.addEventListener("click", closeModal);
resetButton.addEventListener("click", resetGame); // added reset button listener
clickButton.addEventListener("click", startTimeAndGame);

// Functions
function startGame() {
    startButton.style.display = "none";
    gameSection.style.display = "block";
}
function startTimeAndGame (){
    clickButton.addEventListener("click", incrementClickCount); // додано
    timerElement.textContent = `Час: ${timeLeft} сек.`;
    clickCountElement.textContent = `Кількість кліків: ${clickCount}`;
    timerId = setInterval(decrementTimer, 1000);
}

function decrementTimer() {
    timeLeft--;
    timerElement.textContent = `Час: ${timeLeft} сек.`;
    if (timeLeft === 0) {
        clearInterval(timerId);
        openModal();
    }
}

function incrementClickCount() {
    clickCount++;
    clickCountElement.textContent = `Кількість кліків: ${clickCount}`;
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
    startButton.style.display = "block";
    gameSection.style.display = "none";
    timerElement.textContent = "";
    clickCountElement.textContent = "";
    nameInput.value = "";
    clearInterval(timerId);
    clickButton.removeEventListener("click", incrementClickCount); // додано
}


function submitName() {
    // your code for submitting name goes here
}
