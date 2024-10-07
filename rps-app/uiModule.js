// uiModule.js

// DOM Elements
const playerZone = document.getElementById('player-zone');
const cpuZone = document.getElementById('cpu-zone');
const scoreBox = document.getElementById('scoreBox');
const messageBox = document.getElementById('messageBox');
const livesBox = document.getElementById('livesBox');

const rockButton = document.getElementById('rockButton');
const paperButton = document.getElementById('paperButton');
const scissorsButton = document.getElementById('scissorsButton');

const updateScore = (score) => {
    scoreBox.textContent = `Score: ${score}`;
};

const updateLives = (lives) => {
    livesBox.textContent = `Lives: ${lives}`;
};

const updateMessage = (message) => {
    messageBox.textContent = message;
};

const updatePlayerZone = (choice) => {
    playerZone.textContent = `P1 - ${choice}`;
};

const updateCpuZone = (choice) => {
    cpuZone.textContent = `CPU- ${choice}`;
};

const disableButtons = () => {
    [rockButton, paperButton, scissorsButton].forEach(btn => btn.disabled = true);
};

const enableButtons = () => {
    [rockButton, paperButton, scissorsButton].forEach(btn => btn.disabled = false);
};

// Exports
export {
    playerZone,
    cpuZone,
    scoreBox,
    messageBox,
    livesBox,
    rockButton,
    paperButton,
    scissorsButton,
    updateScore,
    updateLives,
    updateMessage,
    updatePlayerZone,
    updateCpuZone,
    disableButtons,
    enableButtons
};
