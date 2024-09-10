// Handles core game logic like user choices, computer choices, and determining results.

export function getRandomChoice() {
    const choices = ['R', 'P', 'S'];
    return choices[Math.floor(Math.random() * choices.length)];
}

export function evaluateChoices(userChoice, computerChoice) {
    if (userChoice === computerChoice) return 'tie';
    if (
        (userChoice === 'R' && computerChoice === 'S') ||
        (userChoice === 'P' && computerChoice === 'R') ||
        (userChoice === 'S' && computerChoice === 'P')
    ) return 'win';
    return 'lose';
}
