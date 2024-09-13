let timerId; // Variable to store the animation frame ID

// Function to start the timer and return whether it reaches zero or not
export function startTimer(elementId, duration) {
    let timerValue = duration; // Total duration of the timer in seconds
    const timerDisplay = document.getElementById(elementId); // Timer display element

    // Ensure the timer display element exists
    if (!timerDisplay) {
        console.warn(`Timer display element with ID '${elementId}' not found.`);
        return false; // Return false if the element is not found
    }

    let startTime; // Variable to store the start time of the timer

    // Function to update the timer display using requestAnimationFrame
    function updateTimer(currentTime) {
        if (!startTime) startTime = currentTime; // Initialize start time on the first frame

        // Calculate elapsed time in seconds
        const elapsedTime = (currentTime - startTime) / 1000;

        // Calculate remaining time
        const remainingTime = Math.max(0, timerValue - elapsedTime);

        // Format the remaining time as ss.mmm (seconds and milliseconds)
        const seconds = Math.floor(remainingTime).toString().padStart(2, '0'); // Get seconds part
        const milliseconds = ((remainingTime % 1) * 1000).toFixed(0).padStart(3, '0'); // Get milliseconds part

        // Update the display with the formatted time (ss.mmm format)
        timerDisplay.innerText = `Time: ${seconds}.${milliseconds}`;

        // Check if time has run out
        if (remainingTime > 0) {
        timerId = requestAnimationFrame(updateTimer); // Continue animating if time remains
        } else {
        resetTimer(elementId); // Stop the timer
        return true; // Return true since the timer reached zero
        }
    }

    // Reset any previous timer before starting a new one
    resetTimer(elementId);

    // Start the animation
    timerId = requestAnimationFrame(updateTimer);

    // Return false if the timer is stopped or canceled before reaching zero
    return false;
}

// Function to reset the timer
function resetTimer(elementId) {
  if (timerId) {
    cancelAnimationFrame(timerId);
    timerId = null;
    const timerDisplay = document.getElementById(elementId);
    if (timerDisplay) {
      timerDisplay.innerText = '00.000';
    }
  }
}
