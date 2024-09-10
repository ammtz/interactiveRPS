// This file manages the state of the game and game transitions.
// /js/gameState.js

import { showElement, hideElement, updateUI, updateSelections, moveUpAnimation, vanishAnimation } from './ui.js';
import { startTimer, resetTimer } from './timer.js';
import { getRandomChoice, evaluateChoices } from './gameLogic.js';

let score = 0;
let lives = 3;
let gameStarted = false;

export function startGame() {
    gameStarted = true;
    resetGame();
    hideElement('main-menu');
    hideElement('game-over');
    showElement('game-ui');
    updateUI(score, lives, 5, "Game Started! Ready to play.");
    gameLoop();
}

export function handleStartGame() {
    if (!gameStarted) {
        startGame();
    }
}

export function resetGame() {
    score = 0;
    lives = 3;
    gameStarted = false;
    updateUI(score, lives, 5, "Game Ready. Press Space to Begin.");
}

function gameLoop() {
    // Logic to manage game rounds
    updateUI(score, lives, 5, "Make your pick...");
    startTimer(5, () => {
        roundEnd('lose'); // Lose round if timer expires
    });

    document.addEventListener('keyup', handleUserChoice);
}

function handleUserChoice(event) {
    if (['R', 'P', 'S'].includes(event.key.toUpperCase())) {
        const userChoice = event.key.toUpperCase();
        resetTimer(); // Stop the timer
        document.removeEventListener('keyup', handleUserChoice); // Disable further input
        proceedWithRound(userChoice);
    }
}

function proceedWithRound(userChoice) {
    updateUI(score, lives, 5, "Thinking...");
    setTimeout(() => {
        const cpuChoice = getRandomChoice();
        updateSelections(userChoice, cpuChoice);
        moveUpAnimation('user-selection');
        moveUpAnimation('cpu-selection');
        const result = evaluateChoices(userChoice, cpuChoice);
        roundEnd(result);
    }, 2000);
}

function roundEnd(result) {
    if (result === 'lose') lives--;
    if (result === 'win') score++;
    updateUI(score, lives, 5, `You ${result}!`);

    setTimeout(() => {
        vanishAnimation('user-selection');
        vanishAnimation('cpu-selection');
        if (lives <= 0) {
            gameOver();
        } else {
            gameLoop(); // Start next round
        }
    }, 2000);
}

function gameOver() {
    updateUI(score, lives, 5, "Game Over");
    hideElement('game-ui');
    showElement('game-over');
    document.getElementById('final-score').innerText = `Final Score: ${score}`;
    gameStarted = false;
}
