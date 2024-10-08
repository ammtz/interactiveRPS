// Initialize the game state globally
let state = {
  playerChoice: null,
  cpuChoice: null,
  score: 0,
  lives: 3,
  message: ''
};

// Winner map to lookup the winning cases
const winnerMap = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

// Function to get a random CPU choice
function getRandomChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Function to evaluate the game
const evaluateGame = (player, cpu) => 
  player === cpu ? 'tie' : (winnerMap[player] === cpu ? 'win' : 'lose');

// Function to update the state based on the result
const updateState = (result, state) => {
  const stateTransformations = {
    win: R.evolve({
      score: R.inc, // Increment score
      message: R.always('You won!')
    }),
    lose: R.evolve({
      lives: R.dec, // Decrement lives
      message: R.always('You lost!')
    }),
    tie: R.assoc('message', 'It\'s a tie!')
  };

  const updatedState = stateTransformations[result](state);

  if (updatedState.lives === 0) {
    gameOver(updatedState.score);
  }

  return updatedState;
};

// Function to display game over and reset button
function gameOver(finalScore) {
  const modal = document.createElement('div');
  modal.setAttribute('id', 'gameOverModal');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.padding = '20px';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  modal.style.color = '#fff';
  modal.style.textAlign = 'center';
  modal.style.borderRadius = '10px';

  const message = document.createElement('p');
  message.textContent = `Game Over! Your final score is: ${finalScore}`;
  modal.appendChild(message);

  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.style.marginTop = '10px';
  playAgainButton.onclick = resetGame;

  modal.appendChild(playAgainButton);
  document.body.appendChild(modal);
}

// Function to reset the game
function resetGame() {
  const modal = document.getElementById('gameOverModal');
  if (modal) {
    document.body.removeChild(modal);
  }

  state = {
    playerChoice: null,
    cpuChoice: null,
    score: 0,
    lives: 3,
    message: ''
  };

  enableButtons();
  render();
}

// Re-enable buttons after reset
function enableButtons() {
  document.getElementById('rockButton').disabled = false;
  document.getElementById('paperButton').disabled = false;
  document.getElementById('scissorsButton').disabled = false;
}

// Function to render the UI
function render() {
  document.getElementById('player-zone').textContent = state.playerChoice || 'Player';
  document.getElementById('cpu-zone').textContent = state.cpuChoice || 'CPU';
  document.getElementById('scoreBox').textContent = `Score: ${state.score}`;
  document.getElementById('livesBox').textContent = `Lives: ${state.lives}`;
  document.getElementById('messageBox').textContent = state.message;
}

// Main game logic function
function playGame(playerChoice) {
  state.playerChoice = playerChoice;
  state.cpuChoice = getRandomChoice();
  const result = evaluateGame(state.playerChoice, state.cpuChoice);
  state = updateState(result, state);
  render();
}

// Attach event listeners for the game buttons
document.getElementById('rockButton').addEventListener('click', () => playGame('rock'));
document.getElementById('paperButton').addEventListener('click', () => playGame('paper'));
document.getElementById('scissorsButton').addEventListener('click', () => playGame('scissors'));

// Initial render to display the initial state
render();
