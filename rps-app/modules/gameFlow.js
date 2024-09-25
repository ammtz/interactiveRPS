// this module handles game flow

import { getCpuChoice, determineRoundWinner, createCountdownLoop } from './gameLogic.js';
import { updateUI, toggleButtonActivation } from './ui.js';
import { createRetroDotsAnimation, stopAnimation } from './animation.js';

export const handleGameFlow = (playerChoice, score, lives) => {
    // Start retro dot animation in the CPU zone
    const animationId = createRetroDotsAnimation('cpu-zone');

    // Simulate CPU thinking time (2 seconds)
    setTimeout(() => {
        // Stop the animation
        stopAnimation(animationId);

        // Get CPU choice after the animation
        const cpuChoice = getCpuChoice();

        // Determine the result of the round
        const result = determineRoundWinner(playerChoice, cpuChoice);

        // Update score and lives based on the result
        if (result === 'win') {
            score.player++;
        } else if (result === 'loss') {
            score.cpu++;
            lives--;
        }

        // Update the UI with the result, score, and lives
        updateUI(score, lives, 0, `Player chose ${playerChoice}, CPU chose ${cpuChoice}. Result: ${result}`);

    }, 2000); // delay to simulate CPU thinking
};
