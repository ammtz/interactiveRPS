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
  // format time in ss.mmm
  const formatTime = (milliseconds) => {
    const secondsLeft = Math.floor(milliseconds / 1000);
    const millisecondsLeft = Math.floor(milliseconds % 1000);
    return `${secondsLeft.toString().padStart(2, '0')}.${millisecondsLeft.toString().padStart(3, '0')}`;
  };

  // update the text content of a UI element
  const updateElementText = (element, text) => {
    if (element) element.innerText = text;
  };

  // Create a countdown loop using rAF with customizable refresh rates (all the way down to 16ms)
  const createCountdownLoop = (duration, updateInterval, onUpdate, onEnd) => {
    let startTime = null;
    let remainingTime = duration * 1000; // Convert duration to milliseconds

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
          requestAnimationFrame(countdown); // Schedule next frame after the specified interval
        }, Math.min(updateInterval, remainingTime)); // Ensure the interval doesn't overshoot the remaining time
      } else {
        onEnd(); // Call the onEnd callback when countdown finishes
      }
    };

    // Start the countdown animation
    requestAnimationFrame(countdown);
  };

  // Function to create a retro 3-dot animation effect
  const createRetroDotsAnimation = (elementId, interval = 500) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const dots = ['', '.', '..', '...'];
    let index = 0;

    setInterval(() => {
      element.innerText = `Loading${dots[index]}`;
      index = (index + 1) % dots.length;
    }, interval);
  };

  // Main function to start the countdown
  function start(elementId, duration) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with ID '${elementId}' not found.`);
      return false;
    }

    createCountdownLoop(
      duration,
      (remainingTime) => updateElementText(element, formatTime(remainingTime)),
      () => updateElementText(element, '00.000')
    );

    return true; // Return true to indicate the countdown started successfully
  }

  // Public API of the module
  return {
    start,
    createRetroDotsAnimation, // Exposing the retro dots animation function for use
  };
})();

