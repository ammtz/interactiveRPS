// main.js (Single JS file for the Rock Paper Scissors game)

// Get references to HTML elements
const playerZone = document.getElementById('player-zone');
const cpuZone = document.getElementById('cpu-zone');
const scoreBox = document.getElementById('scoreBox');
const livesBox = document.getElementById('livesBox');
const messageBox = document.getElementById('messageBox');
const rockButton = document.getElementById('rockButton');
const paperButton = document.getElementById('paperButton');
const scissorsButton = document.getElementById('scissorsButton');
const startGameBtn = document.getElementById('start-game-btn');

// Initialize game variables
let score = 0;
let lives = 3;
let gameActive = false;

// Possible choices
const choices = ['Rock', 'Paper', 'Scissors'];

// Function to start the game
function startGame() {
    score = 0;
    lives = 3;
    gameActive = true;
    updateScore();
    updateLives();
    messageBox.textContent = 'Game Started! Make your move.';
    playerZone.textContent = '';
    cpuZone.textContent = '';
    enableButtons();
}

// Function to update score display
function updateScore() {
    scoreBox.textContent = `Score: ${score}`;
}

// Function to update lives display
function updateLives() {
    livesBox.textContent = `Lives: ${lives}`;
}

// Function to generate CPU choice
function getCpuChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(playerChoice, cpuChoice) {
    if (playerChoice === cpuChoice) {
        return 'tie';
    } else if (
        (playerChoice === 'Rock' && cpuChoice === 'Scissors') ||
        (playerChoice === 'Paper' && cpuChoice === 'Rock') ||
        (playerChoice === 'Scissors' && cpuChoice === 'Paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

// Function to handle player's move
function playerMove(playerChoice) {
    if (!gameActive) {
        messageBox.textContent = 'Click "Play Game" to start.';
        return;
    }
    const cpuChoice = getCpuChoice();
    playerZone.textContent = `You chose: ${playerChoice}`;
    cpuZone.textContent = `CPU chose: ${cpuChoice}`;
    const result = determineWinner(playerChoice, cpuChoice);
    if (result === 'win') {
        score++;
        updateScore();
        messageBox.textContent = 'You win this round!';
    } else if (result === 'lose') {
        lives--;
        updateLives();
        messageBox.textContent = 'You lose this round!';
        if (lives === 0) {
            gameActive = false;
            messageBox.textContent = 'Game Over! Click "Play Game" to restart.';
            disableButtons();
        }
    } else {
        messageBox.textContent = "It's a tie!";
    }
}

// Function to enable buttons
function enableButtons() {
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
}

// Function to disable buttons
function disableButtons() {
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
}

// Add event listeners to buttons
rockButton.addEventListener('click', () => playerMove('Rock'));
paperButton.addEventListener('click', () => playerMove('Paper'));
scissorsButton.addEventListener('click', () => playerMove('Scissors'));
startGameBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    startGame();
});

// Initially disable game buttons until game starts
disableButtons();
messageBox.textContent = 'Click "Play Game" to start.';
playerZone.textContent = '';
cpuZone.textContent = '';
updateScore();
updateLives();
