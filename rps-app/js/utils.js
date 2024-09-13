// game utility functions

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
// update an element's innerText
function modifyInnerTextById(elementId, newText) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = newText;
    } else {
        console.warn(`Element with ID '${elementId}' not found.`);
    }
}
  
// update an element's innerText after a specified delay
function updateInnerTextAfterDelay(elementId, newText, delayMilliseconds) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID '${elementId}' not found.`);
        return;
    }

    setTimeout(() => {
        element.innerText = newText;
    }, delayMilliseconds);
}

// start a thinking... retro animation for some time (in milliseconds)
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

// get a random cpu choice
function getRandomChoice() {
    const choices = ['R', 'P', 'S'];
    return choices[Math.floor(Math.random() * choices.length)];
}

/* 
===================
Game Flow function exports
===================
*/

// initial game instructions
export function showInstructions(elementId, delayMilliseconds) {
    gameStartMessages = [
        "Welcome!",
        "Select Rock, Paper, or Scissors",
        "Make sure to do it before the time ends!",
        "Don't worry, I'll count your wins, ties, and losses",
        "And if you're good enough...",
        "I'll save your score on our leaderboards ;)",
        "Ready?",
    ];
    // show each message with a delay
    for (let i = 0; i < gameStartMessages.length; i++) {
        updateInnerTextAfterDelay(elementId, gameStartMessages[i], delayMilliseconds);
    }
}

// cpu selecting an option (when timer arrives at 0)
export function processComputerSelection(elementId, delayMilliseconds) {
    retroThinkingAnimation(elementId, delayMilliseconds);
    setTimeout(() => {
        const computerChoice = getRandomChoice(); // Random choice for computer
    });
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
