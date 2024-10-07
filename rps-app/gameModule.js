// gameModule.js

// Constants
const choices = ['rock', 'paper', 'scissors'];

// Game State
let score = 0;
let lives = 3;

const resetGameState = () => {
    score = 0;
    lives = 3;
};

const incrementScore = () => {
    score += 1;
};

const decrementLives = () => {
    lives -= 1;
};

/* Will use simple function for now..
// Generator for CPU choice
function* cpuChoiceGenerator() {
    while (true) {
        yield choices[Math.floor(Math.random() * choices.length)];
    }
}
*/
function cpuChoiceGenerator() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Pure function to determine the game outcome
const determineOutcome = (playerChoice, cpuChoice) => {
    if (playerChoice === cpuChoice) {
        return 'tie';
    } else if (
        (playerChoice === 'rock' && cpuChoice === 'scissors') ||
        (playerChoice === 'paper' && cpuChoice === 'rock') ||
        (playerChoice === 'scissors' && cpuChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
};

// Exports
export {
    choices,
    score,
    lives,
    resetGameState,
    incrementScore,
    decrementLives,
    cpuChoiceGenerator,
    determineOutcome,
};
