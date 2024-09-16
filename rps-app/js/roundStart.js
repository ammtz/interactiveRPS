import { startTimer, resetTimer } from './timer.js'; // Import functions from timer.js

// Function to kick off the round
function roundStart(rockButtonId, paperButtonId, scissorsButtonId, clockElementId, nextFunction) {
    // Get the button elements
    const rockButton = document.getElementById(rockButtonId);
    const paperButton = document.getElementById(paperButtonId);
    const scissorsButton = document.getElementById(scissorsButtonId);
    const clockElement = document.getElementById(clockElementId);

    if (!rockButton || !paperButton || !scissorsButton || !clockElement) {
        console.warn('One or more button elements not found.');
        return;
    }

    // Function to handle button click
    function handleButtonClick(event) {
        clearTimeout(timeoutId); // Clear the timeout if a button is clicked
        resetTimer(clockElementId); // Stop the clock timer
        disableButtons(); // Disable all buttons to prevent further clicks
        const buttonId = event.currentTarget.id; // Get the ID of the clicked button
        // Populate the player selection section (add functionality here)
        evaluateRound(buttonId); // Call the next function with the button ID as the signal
    }

    // Function to disable all buttons
    function disableButtons() {
        [rockButton, paperButton, scissorsButton].forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.5'; // Visually indicate disabled state
        });
    }

    // Function to enable all buttons
    function enableButtons() {
        [rockButton, paperButton, scissorsButton].forEach(button => {
            button.disabled = false;
            button.style.opacity = '1'; // Reset opacity
        });
    }

    // Attach click event listeners to each button
    rockButton.addEventListener('click', handleButtonClick);
    paperButton.addEventListener('click', handleButtonClick);
    scissorsButton.addEventListener('click', handleButtonClick);

    // Enable buttons so the user knows they can click
    enableButtons();

    // Start the clock function from timer.js
    startTimer(clockElementId, 5); // Start a 5-second timer

    // Set a timeout to handle if time runs out
    const timeoutId = setTimeout(() => {
        console.log('Time ran out! Sending timeout signal.');
        disableButtons(); // Disable buttons when time runs out
        resetTimer(clockElementId); // Stop the clock timer
        evaluateRound('timeout'); // Send a timeout signal to evaluateResults
    }, 5000); // 5-second timeout

    // Watch the clock and handle if it reaches 0
    const clockWatcher = setInterval(() => {
        const timerText = clockElement.innerText;
        const remainingTime = parseFloat(timerText.split(' ')[1]);

        if (remainingTime <= 0) {
            clearInterval(clockWatcher); // Stop watching the clock
            clearTimeout(timeoutId); // Clear the timeout if clock reaches 0
            disableButtons(); // Disable buttons when time runs out
            evaluateRound('timeout'); // Send a loss signal to evaluateResults
        }
    }, 100); // Check every 100 milliseconds for more accurate timing
}

// Example evaluateRound function (replace with your actual logic)
function evaluateRound(result) {
    if (result === 'timeout') {
        console.log('Round ended: Time ran out. You lose!');
        // Add your logic here for handling the timeout/loss
    } else {
        console.log(`Round ended: Player chose ${result}. Evaluating result...`);
        // Add your logic here for handling player choice
    }
}

// Example function to enable buttons (modify as needed)
function enableButton(button) {
    button.disabled = false;
    button.style.opacity = '1'; // Reset opacity
}

// Example usage
roundStart('rockButton', 'paperButton', 'scissorsButton', 'clockElement', evaluateRound);
