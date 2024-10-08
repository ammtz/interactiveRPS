/*
Manages DOM updates and rendering
*/

// Render the UI
const render = (state) => {
    document.getElementById('player-zone').textContent = state.playerChoice || 'Player';
    document.getElementById('cpu-zone').textContent = state.cpuChoice || 'CPU';
    document.getElementById('scoreBox').textContent = `Score: ${state.score}`;
    document.getElementById('livesBox').textContent = `Lives: ${state.lives}`;
    document.getElementById('messageBox').textContent = state.message;
  };
  
  // Game over view logic
  const gameOverView = (finalScore) => {
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
    overlay.classList.add('overlay');
  
    const modal = document.createElement('div');
    modal.setAttribute('id', 'gameOverModal');
    modal.classList.add('game-over-modal');
  
    const message = document.createElement('p');
    message.textContent = `Game Over! Your final score is: ${finalScore}`;
    modal.appendChild(message);
  
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.classList.add('play-again-button');
    playAgainButton.onclick = () => window.location.reload(); // Reload to reset everything
    modal.appendChild(playAgainButton);
  
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  };
  
  export { 
      render,
      gameOverView,
  };
  