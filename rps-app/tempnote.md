#This is just temp notes for keeping up with latest and greatest updates, and next steps... it changes each push (supposedly)
##latest strategy is kinda working...using limited functional approach (ramda composition)
- State Management: The game state (score, lives) is managed through functions in moduleGameState.js
- DOM Elements: All DOM element selections are in moduleDOMElements.js for reuse across modules
- Event Handling: Event listeners in main.js trigger the playRound function

Latest functional strategy:
1. Functional State Handling: Game state (score, lives, and message) is passed as an immutable object and updated via R.assoc (Ramda's immutable update function).
2. Game Logic: The cpuChoiceGenerator and determineOutcome functions are written to avoid side effects and are pure.
3. UI Updates: renderUI function updates the DOM based on the game state object, keeping rendering logic separate from state logic.
4. Event Listeners: The state is updated by playRound in a functional manner and passed along the game flow without mutations.