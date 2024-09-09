// Initialize Game Variables
let score = 0;
let lives = 3;
let timerValue = 5;
let roundResults = [];
let timerInterval;
let gameStarted = false;

// Functions to Handle Different Game Actions

function showInstructions() {
    const instructionsText = `
        Click R, P, or S for Rock, Paper, or Scissors.
        If you run out of time, you lose a life.
        If the computer beats you, you lose a life.
        You start with 3 lives.
        Press space to begin...
    `;
    document.getElementById('instructions').innerText = instructionsText;
}

function resetGame() {
    score = 0;
    lives = 3;
    timerValue = 5;
    roundResults = [];
    updateStatus(score, lives, timerValue);
}

function startGame() {
    gameStarted = true;
    resetGame();
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('game-ui').classList.remove('hidden');
    roundStart(); // Begin the first round
}

function roundStart() {
    updateStateMessage("Ready?");
    setTimeout(() => {
        choose();
    }, 2000); // Show "Ready?" for 2 seconds
}

function choose() {
    updateStateMessage("Make your pick...");
    startTimer(); // Start the timer for user input
    document.addEventListener('keyup', handleUserChoice);
}

function startTimer() {
    timerValue = 5; // Reset timer to 5 seconds
    const timerDisplay = document.getElementById('timer-box');
    timerDisplay.innerText = `Time: ${timerValue}`;
    
    timerInterval = setInterval(() => {
        timerValue--;
        timerDisplay.innerText = `Time: ${timerValue}`;
        
        if (timerValue <= 0) {
            clearInterval(timerInterval);
            handleTimeout(); // If time runs out, handle timeout
        }
    }, 1000); // Update every second
}

function handleUserChoice(event) {
    const choice = event.key.toUpperCase();
    if (['R', 'P', 'S'].includes(choice)) {
        clearInterval(timerInterval); // Stop the timer
        document.removeEventListener('keyup', handleUserChoice); // Remove the event listener
        thinking(choice); // Go to the thinking state
    }
}

function handleTimeout() {
    document.removeEventListener('keyup', handleUserChoice); // Remove the event listener
    roundResults.push('lose'); // Append result (lose) to round results
    roundEnd('lose');
}

function thinking(userChoice) {
    updateStateMessage("Thinking...");
    setTimeout(() => {
        const computerChoice = getRandomChoice(); // Random choice for computer
        const result = evaluateChoices(userChoice, computerChoice);
        roundResults.push(result);
        roundEnd(result);
    }, 2000); // Simulate thinking for 2 seconds
}

function getRandomChoice() {
    const choices = ['R', 'P', 'S'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function evaluateChoices(userChoice, computerChoice) {
    if (userChoice === computerChoice) return 'tie';
    if (
        (userChoice === 'R' && computerChoice === 'S') ||
        (userChoice === 'P' && computerChoice === 'R') ||
        (userChoice === 'S' && computerChoice === 'P')
    ) return 'win';
    return 'lose';
}

function roundEnd(result) {
    updateStateMessage(`You ${result}!`);
    
    if (result === 'lose') {
        lives--;
    } else if (result === 'win') {
        score++;
    }

    updateStatus(score, lives, timerValue); // Update UI with new score and lives

    setTimeout(() => {
        if (lives <= 0) {
            gameOver();
        } else {
            roundStart(); // Start a new round
        }
    }, 2000); // Show result for 2 seconds
}

function gameOver() {
    updateStateMessage("Game Over");
    document.getElementById('game-ui').classList.add('hidden');
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('final-score').innerText = `Final Score: ${score}`;
    gameStarted = false;
}

function updateStateMessage(message) {
    document.getElementById('state-box').innerText = message;
}

function updateStatus(score, lives, time) {
    document.getElementById('score-box').innerText = `Score: ${score}`;
    document.getElementById('lives-box').innerText = `Lives: ${lives}`;
    document.getElementById('timer-box').innerText = `Time: ${time}`;
}

// Initialization Module to Set Up the Game
(function init() {
    showInstructions(); // Show instructions at the start

    // Event Listeners
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('restart-game-btn').addEventListener('click', startGame);
    document.getElementById('return-menu-btn').addEventListener('click', function () {
        document.getElementById('game-over').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
        resetGame(); // Reset the game to initial state
    });

    // Start Game on Space Key Press
    document.addEventListener('keyup', function (event) {
        if (event.code === 'Space' && !gameStarted) {
            startGame();
            document.getElementById('instructions').style.display = 'none';
        }
    });
})();
