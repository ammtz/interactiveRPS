# dev notes for myself...
### this file will describe the process for creating the rock paper scissors game.

## 1. Plan
    Develop a quick UI to understand elements required and design a first draft of the desired experience.
    Inputs: button clicks
    Outputs: score, lives, timer; Low-level animation, light-weight, pixelart.
## 2. Pseudocode
    V0 - Simple working game...
        - Evaluation algorithm: Rock>scissors, scissors>paper, and paper>rock. Win results in +1 score. Loss results in -1 life.
        - while game is not over, game will keep on going
        - game can be over if player hits "exit" or lives get to 0
        - randomize computer selection after user picks
        - calculate outcome when timer runs out OR user+cpu picks are in. 
        - show outcome to user
        - store scores
        
## 3. Divide and conquer
    Chunk division: 
    Develop UI in HTML+CSS
        - Done 09.10.2024
    Develop functionality in vanilla JS (ES6) for UI
        - done 09.18.2024
    Develop backend data storage in node
        - 09.20.2024
---
    added functionality to the timer
    made some updates to the layout with a new file (just testing for now...)
    will add this new layout tomorrow to the index.html file

---
Future improvements
1. beautify
    - add better clock animation for suspense
    - add actual match selections from both user and cpu
    - add game over flashing screen as gameboy game over animations
        
2. survival mode
    - improved main menu UI
        - add game type survival mode toggle to main menu
    - add survival mode logic and UI enhancements
        - timer
            - show user a timer (animation optional) that goes from x to 0.
                - if game type is survival, timer begins at 5 and is reduced every turn by 0.5 seconds until x is 0.5
    - reduce status animation times so user feels a sense of "progressive" urgency over time

3. leaderboards
    - leaderboard button in main menu
    - create leaderboard UI
        - table with name, score, date
        - button to return to main menu
    - leaderboard database with name, date, score
    - at game over: record name, date, score if score is in top 5
        
4. play against an AI
    - Create a ML algorithm that learns your patters over time
    - In the thinking state, instead of using random algorithm for computer selection, use the output of this ML model
    - Create a "let me train" option in the main menu that allows ML algorithm to employ reinforcement learning to predict your next selection
    - Parameter stored at the end of each game so algorithm is better and better each time you play
