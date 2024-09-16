export function isElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        return false;
    } else {
        return true;
    }
}

// get a random choice from R/P/S list
function getRandomChoice() {
    const choices = ['R', 'P', 'S'];
    return choices[Math.floor(Math.random() * choices.length)];
}
  

  // cpu selecting animation when timer begins, and ends after delay
export function processComputerSelection(elementId, delayMilliseconds) {
    RetroAnimation.start(elementId, delayMilliseconds);
    setTimeout(() => {
        const computerChoice = getRandomChoice(); // Random choice for computer
    });
}