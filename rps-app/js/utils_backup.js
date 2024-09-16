// game utility functions
import { startTimer, resetTimer } from './timer.js'; // Import functions from timer.js

// Initialize Game Variables
let score = 0;
let lives = 3;
let timerValue = 5;
let roundResults = [];
let timerInterval;
let gameStarted = false;

/* 
===================
Helper functions
===================
*/
  
// update an element's innerText after a specified delay (delay=0 will update with no delay)
function updateInnerText(elementId, newText, delayMilliseconds) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID '${elementId}' not found.`);
        return;
    }
    if (delayMilliseconds > 0) {
        setTimeout(() => {
            element.innerText = newText;
        }, delayMilliseconds);
    } else element.innerText = newText;
}

// start a "thinking..."" retro animation for an amount of time(ms) asynchronously
function retroThinkingAnimation(elementId, animationDuration) {
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

// get a random choice from R/P/S list
function getRandomChoice() {
    const choices = ['R', 'P', 'S'];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to disable a button
function disableButton(button) {
    button.disabled = true; // Disable the button
    button.style.opacity = '0.5'; // Style the button as disabled
}

// Function to enable a button
function enableButton(button) {
    button.disabled = false; // Enable the button
    button.style.opacity = '1'; // Restore the button's opacity
}

/* 
===================
Game Flow functionality
===================
1 - Show instructions (5 seconds)
2 - Let user choose (5 seconds)
3 - Run CPU choice (100ms)
4 - Evaluate (100ms)
5 - Show round result (win/loss/tie)
6 - Update UI scores and lives
7 - Loop back to step 2
*/

// Show each message with an increasing delay
function showInstructions(elementId, delayMilliseconds) {
    const gameStartMessages = [
        "Welcome!",
        "Select Rock, Paper, or Scissors",
        "Make sure to do it before the time ends!",
        "Don't worry, I'll count your wins, ties, and losses",
        "And if you're good enough...",
        "I'll save your score on our leaderboards ;)",
        "Ready?",
    ];

    gameStartMessages.forEach((message, index) => {
        updateInnerText(elementId, message, delayMilliseconds * index);
    });
}

//
function allowUserChoice(rockElementId, paperElementId, scissorsElementId, clockElementId) {
    const rockButton = document.getElementById(rockElementId);
    const paperButton = document.getElementById(paperElementId);
    const scissorsButton = document.getElementById(scissorsElementId);
    const clockElement = document.getElementById(clockElementId);
    // Enable thinking animation for cpu
    // When time runs out OR user selects: evaluate and show result
    // Reset UI to disabled buttons, blank selection screens, and updated score & lives


    if (!rockButton || !paperButton || !scissorsButton || !clockElement) {
        console.warn('One or more elements not found.');
        return;
    }

    let timer = Number(clockElementId.innerText);
    if (clock > 0) {
        return false;
    } else {
        return true;
    }
}

// cpu selecting animation when timer begins, and ends after delay
function processComputerSelection(elementId, delayMilliseconds) {
    retroThinkingAnimation(elementId, delayMilliseconds);
    setTimeout(() => {
        const computerChoice = getRandomChoice(); // Random choice for computer
    });
}

// kick off round (sends signal when time is up OR a button is clicked)
function roundStart(rockButtonId, paperButtonId, scissorsButtonId, nextFunction) {
    // Get the button elements
    const rockButton = document.getElementById(rockButtonId);
    const paperButton = document.getElementById(paperButtonId);
    const scissorsButton = document.getElementById(scissorsButtonId);

    if (!rockButton || !paperButton || !scissorsButton) {
        console.warn('One or more button elements not found.');
        return;
    }

    // Function to handle button click
    function handleButtonClick(event) {
        clearTimeout(timeoutId); // Clear the timeout if a button is clicked
        const buttonId = event.currentTarget.id; // Get the ID of the clicked button
        // populate the player selection section (add functionality here)
        // trigger the clock to stop (add functionality here)

        evaluateRound(buttonId, ); // Call the next function with the button ID as the signal
    }
    // Start the clock function from timer.js (add functionality here)

    // Attach click event listeners to each button
    rockButton.addEventListener('click', handleButtonClick);
    paperButton.addEventListener('click', handleButtonClick);
    scissorsButton.addEventListener('click', handleButtonClick);
    //enable buttons so user knows he can click now
    enableButton(rockButton);
    enableButton(paperButton);
    enableButton(scissorsButton);
    // watch the clock, and if it reaches 0 stop it, disable event listeners and buttons, and send a loss to evaluateResults() (add functionality here)
    
}

// Example next function that will be called on button click or timeout
function nextFunction(signal) {
    if (signal === 'timeout') {
        console.log('No button was clicked within 5 seconds. Time out signal triggered.');
    } else {
        evaluateRound(signal, computerChoice, true)
    }
    // Add your logic here for what to do with the signal
}

// evaluate round (if userSelectOnTime true)
export function evaluateRound(userChoice, computerChoice, userSelectOnTime) {
    if (!userSelectOnTime) return 'loss';
    if (userChoice === computerChoice) return 'tie';
    if (
        (userChoice === 'R' && computerChoice === 'S') ||
        (userChoice === 'P' && computerChoice === 'R') ||
        (userChoice === 'S' && computerChoice === 'P')
    ) return 'win';
    return 'loss';
}

// store data from round
export function storeRoundData(roundResult, roundResultList){
    roundResultList.push(roundResult);
}; 

// update UI scores and lives
export function updateScreen(scoreElementId, livesElementId, roundResult){
    score = Number(scoreElementId.innerText);
    lives = Number(livesElementId.innerText);
    if (roundResult === 'tie') {
        return;
    } else if (roundResult === 'win') {
        scoreElementId.innerText = score++;
    } else {
        livesElementId.innerText = lives--;
    }
}

// Round End UI refresh and checks
export function roundEnd(livesElementId, messageElementId, playerElementId, cpuElementId, roundResultList){
    let livesCount = Number(livesElementId.innerText);
    if (livesCount > 0) {
        //reset texts
        messageElementId.innerText = "";
        playerElementId.innerText = "";
        cpuElementId.innerText = "";
    } else {
        // count scores
        let wins = list.filter(item => item === 'win').length;
        let loses = list.filter(item => item === 'loss').length;
        let ties = list.filter(item => item === 'tie').length;
        // show end of game UI
        messageElementId.innerText = "GAME OVER";
        playerElementId.innerText = `wins=${wins}  loses=${loses} ties=${ties}`;
        cpuElementId.innerText = ""; 
        // reset game...
        
    }
}
