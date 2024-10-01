(() => {
    // Constants
    const choices = ['rock', 'paper', 'scissors'];

    // Generator for CPU choice
    function* cpuChoiceGenerator() {
        while (true) {
            yield choices[Math.floor(Math.random() * choices.length)];
        }
    }
    const cpuChoiceGen = cpuChoiceGenerator();

    // Game State
    let score = 0;
    let lives = 3;

    // DOM Elements
    const playerZone = document.getElementById('player-zone');
    const cpuZone = document.getElementById('cpu-zone');
    const scoreBox = document.getElementById('scoreBox');
    const messageBox = document.getElementById('messageBox');
    const livesBox = document.getElementById('livesBox');

    const rockButton = document.getElementById('rockButton');
    const paperButton = document.getElementById('paperButton');
    const scissorsButton = document.getElementById('scissorsButton');

    // Pure function to determine the game outcome
    const determineOutcome = (playerChoice, cpuChoice) => {
        if (playerChoice === cpuChoice) {
            return 'tie';
        } else if (
            (playerChoice === 'rock' && cpuChoice === 'scissors') ||
            (playerChoice === 'paper' && cpuChoice === 'rock') ||
            (playerChoice === 'scissors' && cpuChoice === 'paper')
        ) {
            return 'win';
        } else {
            return 'lose';
        }
    };

    // Higher-order function for composing UI update functions
    const compose = (...fns) => arg => fns.reduceRight((acc, fn) => fn(acc), arg);

    // UI Update Functions
    const updateScore = () => {
        scoreBox.textContent = `Score: ${score}`;
    };

    const updateLives = () => {
        livesBox.textContent = `Lives: ${lives}`;
    };

    const updateMessage = (message) => {
        messageBox.textContent = message;
    };

    const updatePlayerZone = (choice) => {
        playerZone.textContent = `Player chose: ${choice}`;
    };

    const updateCpuZone = (choice) => {
        cpuZone.textContent = `CPU chose: ${choice}`;
    };

    // Function to disable game buttons
    const disableButtons = () => {
        [rockButton, paperButton, scissorsButton].forEach(btn => btn.disabled = true);
    };

    // Function to check for game over
    const checkGameOver = () => {
        if (lives <= 0) {
            updateMessage('Game Over!');
            disableButtons();
        }
    };

    // Function to update the UI based on the outcome
    const updateUI = (playerChoice, cpuChoice, outcome) => {
        updatePlayerZone(playerChoice);
        updateCpuZone(cpuChoice);

        if (outcome === 'win') {
            score += 1;
            updateScore();
            updateMessage('You Win!');
        } else if (outcome === 'lose') {
            lives -= 1;
            updateLives();
            updateMessage('You Lose!');
        } else {
            updateMessage('It\'s a Tie!');
        }
    };

    // Main game play function using functional composition
    const playRound = (playerChoice) => {
        const cpuChoice = cpuChoiceGen.next().value;
        const outcome = determineOutcome(playerChoice, cpuChoice);

        compose(
            checkGameOver,
            () => updateUI(playerChoice, cpuChoice, outcome)
        )();
    };

    // Event Listeners
    rockButton.addEventListener('click', () => playRound('rock'));
    paperButton.addEventListener('click', () => playRound('paper'));
    scissorsButton.addEventListener('click', () => playRound('scissors'));

    // Game Initialization
    const init = () => {
        score = 0;
        lives = 3;
        updateScore();
        updateLives();
        updateMessage('Choose Rock, Paper, or Scissors to start!');
    };

    // Start the game
    init();

})();
