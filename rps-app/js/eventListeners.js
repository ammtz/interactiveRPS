// /js/eventListeners.js

import { handleStartGame, resetGame } from './gameState.js';
import { showElement, hideElement } from './ui.js';

// Directly handle "Play Game" button click
export function onPlayGameClick() {
    handleStartGame();
    document.getElementById('start-game-btn').removeEventListener('click', onPlayGameClick); // Disable listener after click
    document.addEventListener('keyup', onSpaceKeyPress);  // Enable "Space" key listener for in-game controls
}

// Directly handle "Return to Main Menu" button click
export function onReturnMenuClick() {
    hideElement('game-over');
    showElement('main-menu');
    resetGame();
    document.getElementById('return-menu-btn').removeEventListener('click', onReturnMenuClick); // Disable listener after click
    document.getElementById('start-game-btn').addEventListener('click', onPlayGameClick);  // Re-enable "Play Game" listener
}

// Directly handle "Space" key press event
export function onSpaceKeyPress(event) {
    if (event.code === 'Space') {
        handleStartGame();
        document.removeEventListener('keyup', onSpaceKeyPress);  // Disable "Space" key listener after key press
    }
}
