export const initialState = {
    score: 0,
    lives: 3,
    message: 'Choose Rock, Paper, or Scissors!',
    playerChoice: null,
    cpuChoice: null
};

// Update function (handles state transitions)
export const update = (action, state) => {
    switch (action.type) {
        case 'PLAYER_CHOICE':
            const cpuChoice = cpuChoiceGenerator();
            const outcome = determineOutcome(action.choice, cpuChoice);
            return updateGameState(outcome, action.choice, cpuChoice, state);
        default:
            return state;
    }
};

// Logic for determining outcome and updating state
const cpuChoiceGenerator = () => {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
};

const determineOutcome = (playerChoice, cpuChoice) => {
    if (playerChoice === cpuChoice) return 'tie';
    if (
        (playerChoice === 'rock' && cpuChoice === 'scissors') ||
        (playerChoice === 'paper' && cpuChoice === 'rock') ||
        (playerChoice === 'scissors' && cpuChoice === 'paper')
    ) return 'win';
    return 'lose';
};

const updateGameState = (outcome, playerChoice, cpuChoice, state) => {
    if (outcome === 'win') {
        return {
            ...state,
            score: state.score + 1,
            message: 'You Win!',
            playerChoice,
            cpuChoice
        };
    } else if (outcome === 'lose') {
        return {
            ...state,
            lives: state.lives - 1,
            message: 'You Lose!',
            playerChoice,
            cpuChoice
        };
    } else {
        return {
            ...state,
            message: "It's a Tie!",
            playerChoice,
            cpuChoice
        };
    }
};
