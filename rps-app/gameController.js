// gameController.js

import {
    score,
    lives,
    incrementScore,
    decrementLives,
} from './gameModule.js';

import {
    updateScore,
    updateLives,
    updateMessage,
    updatePlayerZone,
    updateCpuZone,
    disableButtons,
} from './uiModule.js';

export const checkGameOver = () => {
    if (lives <= 0) {
        updateMessage('Game Over!');
        disableButtons();
    }
};

export const updateUI = (playerChoice, cpuChoice, outcome) => {
    updatePlayerZone(playerChoice);
    updateCpuZone(cpuChoice);

    if (outcome === 'win') {
        incrementScore();
        updateScore(score);
        updateMessage('You Win!');
    } else if (outcome === 'lose') {
        decrementLives();
        updateLives(lives);
        updateMessage('You Lose!');
    } else if (outcome === 'tie') {
        updateMessage("It's a Tie!");
    } else {
        // Handle null and other values...
        updateMessage('...');
    }
};

function* rpsGenerator() {
    const sequence = ["rock", "paper", "scissors", "shoot!"];
    let index = 0;

    while (true) {
        yield sequence[index];
        index = (index + 1) % sequence.length; // Loop through the sequence
    }
}

// Function to run the generator every second
export function startRpsSequence() {
    const generator = rpsGenerator(); // Initialize the generator
    
    const interval = setInterval(() => {
        const nextValue = generator.next().value; // Get the next value from the generator
        console.log(nextValue); // Display the current value
        if (nextValue === "shoot!") {
            clearInterval(interval); // Stop after "shoot!"
        }
    }, 1000); // Execute every 1000ms (1 second)
}

