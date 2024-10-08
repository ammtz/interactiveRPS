/*
Manages state updates and transformation logic
*/

import { winnerMap } from './model.mjs';

const evaluateGame = (player, cpu) => 
  player === cpu ? 'tie' : (winnerMap[player] === cpu ? 'win' : 'lose');

const stateTransformations = {
  win: R.evolve({
    score: R.inc,
    message: R.always('You won!')
  }),
  lose: R.evolve({
    lives: R.dec,
    message: R.always('You lost!')
  }),
  tie: R.assoc('message', 'It\'s a tie!')
};

// Updates the game state based on result
const updateState = (result, state) => {
  const updatedState = stateTransformations[result](state);
  
  if (updatedState.lives === 0) {
    // If lives reach zero, game over
    return { ...updatedState, gameOver: true };
  }
  
  return updatedState;
};

export { 
    evaluateGame, 
    updateState 
};
