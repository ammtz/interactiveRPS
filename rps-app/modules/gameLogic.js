// This module handles game logic

export const determineRoundWinner = (playerChoice, cpuChoice) => {
    if (playerChoice === cpuChoice) return 'tie';

    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper',
    };

    return winConditions[playerChoice] === cpuChoice ? 'win' : 'loss';
};

// get CPU choice
const getCpuChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

// start a new round
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
  