// main.js
// Module imports
import {
    score,
    lives,
    resetGameState,
    cpuChoiceGenerator,
    determineOutcome,
} from './gameModule.js';

import {
    rockButton,
    paperButton,
    scissorsButton,
    updateScore,
    updateLives,
    updateMessage,
    disableButtons,
    enableButtons,
} from './uiModule.js';

import {
    checkGameOver,
    updateUI,
    startRpsSequence
} from './gameController.js';


// Main game flow function (round-based)
const playRound = (playerChoice) => {
    // First disable buttons to prevent multi-clicks and tell user to chill for a sec
    disableButtons();
    // Add their choice and show a temporary message before the timeout function runs through
    updateUI(playerChoice, 'thinking...', null);

    // Do the round calculations
    const cpuChoice = cpuChoiceGenerator();
    const outcome = determineOutcome(playerChoice, cpuChoice);

    // Run the timeout function for dramatic effects before showing the result
    setTimeout(() => {
        // Update the UI with the actual CPU choice and outcome
        updateUI(playerChoice, cpuChoice, outcome);
        checkGameOver();

        // Re-enable buttons if the game is not over
        if (lives > 0) {
            enableButtons();
        }
    }, 1000);
};

// Event Listeners
rockButton.addEventListener('click', () => playRound('rock'));
paperButton.addEventListener('click', () => playRound('paper'));
scissorsButton.addEventListener('click', () => playRound('scissors'));

// Game Initialization
const init = () => {
    resetGameState();
    updateScore(score);
    updateLives(lives);
    updateMessage('Choose Rock, Paper, or Scissors to start!');
};

// Start the game
init();
