/*
Manages state, game rules, and data
*/


// game start state
const initialState = {
    playerChoice: null,
    cpuChoice: null,
    score: 0,
    lives: 3,
    message: ''
  };
  
  // game rules (winning scenarios)
  const winnerMap = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };
  
  // Random CPU choice "generator"
  const getRandomChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
  };
  
  export { 
      initialState, 
      winnerMap, 
      getRandomChoice 
  };