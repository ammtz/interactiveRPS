// this module is the entry point for the application

import { handleGameFlow } from './gameFlow.js';


// Initialize the game round
function startGameRound() {
  const duration = 5; // 5 seconds countdown
  const updateInterval = 1000; // Update every 1 second

  // Start the countdown and get the cancel function
  const cancelCountdown = createCountdownLoop(
    duration,
    updateInterval,
    (remainingTime) => {
      // Update the message box with the remaining time
      document.getElementById('message-box').innerText = `Time left: ${(remainingTime / 1000).toFixed(0)}s`;
    },
    () => {
      // Timeout has ended, automatically evaluate the round as a loss
      alert("You took too long! You lose this round.");
      // Handle the loss by timeout (e.g., update score, lives)
      handleTimeoutLoss();
    }
  );

  // Start CPU thinking animation
  createRetroDotsAnimation('cpu-zone', duration * 1000); // Run the animation for 5 seconds

  // Event listeners for player choices
  document.getElementById('rockButton').addEventListener('click', () => {
    cancelCountdown(); // Cancel the countdown when player chooses
    handlePlayerChoice('rock');
  });
  document.getElementById('paperButton').addEventListener('click', () => {
    cancelCountdown();
    handlePlayerChoice('paper');
  });
  document.getElementById('scissorsButton').addEventListener('click', () => {
    cancelCountdown();
    handlePlayerChoice('scissors');
  });

  // Activate buttons for player choice
  toggleButtonActivation(); // Enable buttons
}

// Function to handle player choice and proceed with game flow
function handlePlayerChoice(playerChoice) {
  // Disable buttons once the player makes a choice
  toggleButtonActivation(); // Disable buttons

  // Evaluate the round and move to the next round after evaluation
  handleGameFlow(playerChoice, score, lives);

  // After 3 seconds, restart the round if the game is not over
  setTimeout(() => {
    if (lives > 0) {
      startGameRound(); // Start a new round after 3 seconds
    } else {
      alert("Game over! Restart to play again.");
    }
  }, 3000); // 3-second delay to restart the round
}

// Function to handle loss by timeout
function handleTimeoutLoss() {
  // Update the game state to reflect the loss due to timeout
  score.cpu++; // Increase CPU score
  lives--; // Decrease player lives

  // After 3 seconds, start the next round if the game is still active
  setTimeout(() => {
    if (lives > 0) {
      startGameRound(); // Start a new round after 3 seconds
    } else {
      alert("Game over! Restart to play again.");
    }
  }, 3000); // 3-second delay to restart the round
}

// Create countdown loop for the game
const createCountdownLoop = (duration, updateInterval, onUpdate, onEnd) => {
  let startTime = null;
  let remainingTime = duration * 1000; // Convert duration to milliseconds
  let animationFrameId; // Store the animation frame ID for cancellation

  // Internal function to manage countdown with controlled updates
  const countdown = (timestamp) => {
    if (!startTime) startTime = timestamp; // Initialize the start time
    const elapsedTime = timestamp - startTime; // Calculate elapsed time
    remainingTime = Math.max(0, duration * 1000 - elapsedTime); // Calculate remaining time and clamp to 0

    // Call the onUpdate callback with the remaining time
    onUpdate(remainingTime);

    if (remainingTime > 0) {
      // Use setTimeout to control when the next rAF is called
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(countdown); // Schedule next frame after the specified interval
      }, Math.min(updateInterval, remainingTime)); // Ensure the interval doesn't overshoot the remaining time
    } else {
      onEnd(); // Call the onEnd callback when countdown finishes
    }
  };

  // Start the countdown animation
  animationFrameId = requestAnimationFrame(countdown);

  // Return a cancel function to stop the countdown early
  return () => cancelAnimationFrame(animationFrameId);
};

// Initial game state
let score = { player: 0, cpu: 0 };
let lives = 3;

// Start the first round
startGameRound();
