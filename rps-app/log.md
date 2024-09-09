# dev notes for myself...
### this file will describe the process for creating the rock paper scissors game.

## 1. Plan
    Does the program have a UI?
        chrome console and alerts only. No GUI.
    What are the inputs?
        User interaction with keyboard - keyup
    What is the desired output?
        Progressive suspense and difficulty
        User must be aware of score, instructions, lives, and timer during the game loop
        Low-level animations that add game experience in a light-weight style
        Use of pixelart is a must ::)
## 2. Pseudocode
    Write up solution in regular human words
        - Points scoring system: Rock beats scissors, scissors beat paper, and paper beats rock
        - while game is not over, game will keep on going
        - game can be over if: user hits "x" or user lives are 0
        - when regular game function is running, ask user to select r/p/s, randomize computer selection, calculate outcome, print outcome to user, store scores
        - when survival game function is running, ask user to select r/p/s within the next 5 seconds, randomize computer selection, calculate outcome, print outcome to user, store scores,             decrease timer by 5%. If user does not select when timer runs out they loose a life
        - when game is over tell user his scores, and if he's top 5 in leaderboards, ask for his name
        - when game is over ask user if he wants to play again. If not, end game loop
        
## 3. Divide and conquer
    Solve small problems, decompose

    chunk 1 - basic game UI
        f1 - a UI that lets user interact with the game
                - must have a main menu with a start game button
                - must have a UI in chrome that shows status, a clock, lives, and score
                    - minimum animations
        f2 - a UI that shows the game
            - instructions (press space to begin)
            - score box
            - lives box
            - timer box
            - state box
        f3 - a UI that shows game over and results

    chunk 2 - basic game functionality
            - instructions
                - show user instructions in the screen before game starts:
                    "click R P or S for Rock, Paper or Scissors. 
                        If you run out of time you loose a life
                        If computer beats you, you lose a life
                        You start with 3 lives.
                        Press space to begin..."
            - score
                - show user current score
                - need a variable that tracks scores in game instance
            - lives
                - show user current lives
                - need a function that tracks lives in game instance
            - timer
                - show user a timer (animation optional) that goes from 5 to 0.
                    - Need a function that initializes timer at 5 and ends at 0 or if user inputs R, P or S
            - state functions
                - round start
                    - reset timer
                    - show "ready?" message (2 seconds)
                    - change state to choose
                - choose
                    - show "make your pick..." message and start event listener for user clicks
                        - when R, P, S, or timer runs out
                            - if timer runs out
                                - append result(lose) to round_results list
                                - change state to round end
                            - else: change state to thinking
                - thinking...
                    - show "thinking..." message (2 seconds)
                    - random algorithm runs in the background and selects an option
                    - evaluate options and return result
                    - append result to round_results list
                    - change state to round end
                - round end
                    - show round results (2 seconds)
                    - update score
                    - update lives
                    - go to round start or to game over
            - game over
                - show wins, loses and ties
                - back to main menu button
                - restart game button

    chunk 3 - beautify
        - add better clock animation for suspense
        - add actual match selections from both user and cpu
        - add game over flashing screen as gameboy game over animations
        
    chunk 4 - survival mode
        f1 - improved main menu UI
                - add game type survival mode toggle to main menu
        f2 - add survival mode logic and UI enhancements
                - timer
                    - show user a timer (animation optional) that goes from x to 0.
                        - if game type is survival
                            - timer begins at 5 and is reduced every turn by 0.5 seconds until x is 0.5
        f3 - reduce status animation times so user feels a sense of "progressive" urgency over time

    chunk 5 - leaderboards
        f1 - leaderboard button in main menu
        f2 - create leaderboard UI
            - table with name, score, date
            - button to return to main menu
        f3 - leaderboard database with name, date, score
        f4 - at game over: record name, date, score if score is in top 5
    
    chunk 4 - play against an AI
        f1 - Create a ML algorithm that learns your patters over time
        f2 - In the thinking state, instead of using random algorithm for computer selection, use the output of this ML model
        f3 - Create a "let me train" option in the main menu that allows ML algorithm to employ reinforcement learning to predict your next selection
        f4 - Parameter stored at the end of each game so algorithm is better and better each time you play
