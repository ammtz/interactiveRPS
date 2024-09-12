// Handles timer functionality like starting and resetting timers for each game round.

let timerId; // Variable to store the animation frame ID

export function startTimer(duration, onTimeout) {
    let timerValue = duration;
    const timerDisplay = document.getElementById('timer-box');
    const startTime = performance.now(); // Record the start time

    // Function to update the timer display using requestAnimationFrame
    function updateTimer(currentTime) {
        // Calculate elapsed time in seconds
        const elapsedTime = (currentTime - startTime) / 1000;

        // Calculate remaining time
        const remainingTime = Math.max(0, timerValue - elapsedTime);

        // Update the display with the formatted time
        timerDisplay.innerText = `Time: 00:${remainingTime.toFixed(2)}`;

        // Check if time has run out
        if (remainingTime > 0) {
            timerId = requestAnimationFrame(updateTimer); // Store the ID and continue animating if time remains
        } else {
            onTimeout(); // Time has run out, handle timeout
        }
    }

    // Start the animation
    timerId = requestAnimationFrame(updateTimer);
}



export function resetTimer() {
    if (timerId) {
        cancelAnimationFrame(timerId); // Cancel the animation frame
        timerId = null; // Reset the timer ID
    }
}
