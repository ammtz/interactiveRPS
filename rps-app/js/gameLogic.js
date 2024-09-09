document.getElementById('start-game-btn').addEventListener('click', function () {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-ui').classList.remove('hidden');
    startGame();
});

document.getElementById('restart-game-btn').addEventListener('click', function () {
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('game-ui').classList.remove('hidden');
    startGame();
});

document.getElementById('return-menu-btn').addEventListener('click', function () {
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !gameStarted) {
        startGame();
        document.getElementById('instructions').style.display = 'none';
    }
});

function startGame() {
    // Initialize game variables like score, timer, lives, etc.
    // Start the game logic here
    console.log("Game Started!");
    gameStarted = true; // Assume you have a flag to indicate game state
}

function gameOver(finalScore) {
    document.getElementById('game-ui').classList.add('hidden');
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('final-score').innerText = `Final Score: ${finalScore}`;
}
