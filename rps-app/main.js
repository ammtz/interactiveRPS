import { initialState, getRandomChoice } from './model.mjs';
import { render, gameOverView } from './view.mjs';
import { evaluateGame, updateState } from './update.mjs';

// Game state
let state = initialState;

// Core game logic pipeline
const gamePipeline = R.pipe(
  // Set the player's choice
  R.curry((choice, state) => R.assoc('playerChoice', choice, state)),
  
  // Get CPU's choice and set it
  (state) => R.assoc('cpuChoice', getRandomChoice(), state),
  
  // Evaluate game result
  (state) => {
    const result = evaluateGame(state.playerChoice, state.cpuChoice);
    return { state, result };
  },
  
  // Update the state based on the result
  ({ state, result }) => updateState(result, state)
);

// Main game logic
const playGame = (playerChoice) => {
  state = gamePipeline(playerChoice, state); // Apply pipeline

  if (state.gameOver) {
    gameOverView(state.score); // Trigger game over view
  } else {
    render(state); // Re-render the UI
  }
};

// Attach event listeners to buttons
const gameButtons = [
  { id: 'rockButton', move: 'rock' },
  { id: 'paperButton', move: 'paper' },
  { id: 'scissorsButton', move: 'scissors' }
];

gameButtons.forEach(({ id, move }) => {
  document.getElementById(id).addEventListener('click', () => playGame(move));
});

// Initial render
render(state);
