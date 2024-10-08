# dev notes for myself...
### this file will describe the process for creating the rock paper scissors game.

## 1. Plan
    Develop a quick UI to understand elements required and design a first draft of the desired experience
    Inputs: button clicks
    Outputs: score, lives, timer; Low-level animation, light-weight, pixelart

## 2. Pseudocode: main logic
    V0 - Simple working game...
        - Evaluation pairs, e.g., player_choice:cpu_choice, and an outcome(win/lose/tie)
        - score updates when evaluation is a win, +1
        - lives updates when evaluation is a loss, -1
        - game over when lives reach 0
        - show user score, lives, their choice, and cpu choice
        - after game over, show user total score
        
## 3. Implement
    MVU architecture:
        Model - data in app (state: player selection, cpu selection, score, lives, messages)
        View - 5 zones (1 for each state variable), and 3 buttons
        Update - handle logic for changing view

    - MVP
    -- Simple, single file JS
    

---
Future improvements
1. beautify
    - add clock animation and functionality (lose a life when clock runs out) for suspense
    - add user vs cpu pixel fight animation
    - add game over flashing screen as gameboy game over animations
        
2. survival mode
    - CPU choice pops up and user has 3 seconds to react, each round timer is 15% quicker
    - add mode as toggle in UI

3. leaderboards
    - database with score, name, date for top 10 players
    - leaderboard button in main menu
    - leaderboard table view
        
4. turn into a boxing game
    - jab/hook/uppercut/parry, 2 second choice window, player can wait to react, but cpu chooses at random intervals between 0 and 2 seconds
    - If time runs out and player does not choose, they get punched
    - Point-based system, rounds of 30 seconds. Punch hit +1
    - User interaction with wasd? (immersive experience)
    - round evaluation: jab beats uppercut, hook beats jab, uppercut beats hook, parry is automatic tie, after 3 straight parries, player cannot defend :)

