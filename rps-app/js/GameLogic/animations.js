export const RetroAnimation = (() => {
    // Usage Example: RetroAnimation.start('elementId', 2000); // Starts the animation for 2000ms
    function start(elementId, animationDuration) {
      const element = document.getElementById(elementId);
      if (!element) {
        console.warn(`Element with ID '${elementId}' not found.`);
        return;
      }
  
      let dotCount = 0;
      const maxDots = 3;
      const intervalDuration = animationDuration / 8;
      const animationInterval = setInterval(() => {
        dotCount = (dotCount + 1) % (maxDots + 1);
        element.innerText = "Thinking" + '.'.repeat(dotCount);
      }, intervalDuration);
  
      setTimeout(() => {
        clearInterval(animationInterval);
      }, animationDuration);
    }
  
    // Public API of the module
    return {
      start,
    };
  })();



export const CountdownTimer = (() => {
// Usage example: CountdownTimer.start('elementId', 10);
    function start(elementId, duration) {
        const element = document.getElementById(elementId);
        if (!element) {
        console.warn(`Element with ID '${elementId}' not found.`);
        return false;
        }

        let startTime = null;
        let remainingTime = duration * 1000; // Convert to milliseconds

        function countdown(timestamp) {
        if (!startTime) startTime = timestamp; // Initialize start time
        const elapsed = timestamp - startTime; // Calculate elapsed time
        remainingTime = Math.max(0, duration * 1000 - elapsed); // Calculate remaining time

        const secondsLeft = Math.floor(remainingTime / 1000); // Get full seconds
        const millisecondsLeft = Math.floor(remainingTime % 1000); // Get remaining milliseconds
        const formattedTime = `${secondsLeft.toString().padStart(2, '0')}.${millisecondsLeft.toString().padStart(3, '0')}`; // Format to ss.mmm

        element.innerText = formattedTime; // Update the element's text with the formatted time

        if (remainingTime > 0) {
            requestAnimationFrame(countdown); // Continue the countdown
        } else {
            element.innerText = '00.000'; // Ensure the element shows 00.000 when finished
            return true; // Return true when the countdown reaches 0
        }
        }

        requestAnimationFrame(countdown); // Start the countdown animation
        return true; // Return true to indicate the countdown started successfully
    }

    // Public API of the module
    return {
        start,
    };
})();
