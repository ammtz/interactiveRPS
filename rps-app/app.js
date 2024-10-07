import { initialState, update } from './updateModule.js';
import { view } from './viewModule.js';
import { rockButton, paperButton, scissorsButton } from './viewModule.js';

// Holds the current state of the game
let state = initialState;

// Dispatch actions and update state
const dispatch = (action) => {
    state = update(action, state); // Update state
    view(state);                   // Render new UI
};

// Set up event listeners and dispatch actions
const init = () => {
    state = initialState;
    view(state);
    rockButton.addEventListener('click', () => dispatch({ type: 'PLAYER_CHOICE', choice: 'rock' }));
    paperButton.addEventListener('click', () => dispatch({ type: 'PLAYER_CHOICE', choice: 'paper' }));
    scissorsButton.addEventListener('click', () => dispatch({ type: 'PLAYER_CHOICE', choice: 'scissors' }));
};

export { init };
