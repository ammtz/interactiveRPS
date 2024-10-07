// DOM elements
const playerZone = document.getElementById('player-zone');
const cpuZone = document.getElementById('cpu-zone');
const scoreBox = document.getElementById('scoreBox');
const messageBox = document.getElementById('messageBox');
const livesBox = document.getElementById('livesBox');

const rockButton = document.getElementById('rockButton');
const paperButton = document.getElementById('paperButton');
const scissorsButton = document.getElementById('scissorsButton');

// Pure view function
export const view = (state) => {
    updateScore(state.score);
    updateLives(state.lives);
    updateMessage(state.message);
    updatePlayerZone(state.playerChoice);
    updateCpuZone(state.cpuChoice);
};

// UI helper functions
const updateScore = (score) => scoreBox.textContent = `Score: ${score}`;
const updateLives = (lives) => livesBox.textContent = `Lives: ${lives}`;
const updateMessage = (message) => messageBox.textContent = message;
const updatePlayerZone = (choice) => playerZone.textContent = `P1 - ${choice}`;
const updateCpuZone = (choice) => cpuZone.textContent = `CPU - ${choice}`;

// Export UI elements for event listeners
export { rockButton, paperButton, scissorsButton };
