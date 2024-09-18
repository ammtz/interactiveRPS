// Update text boxes at round end
export function updateUI(score, lives, timerValue, message) {
    document.getElementById('score-box').innerText = `Score: ${score}`;
    document.getElementById('lives-box').innerText = `Lives: ${lives}`;
    document.getElementById('timer-box').innerText = `Time: ${timerValue}`;
    document.getElementById('state-box').innerText = message;
}

// Function to toggle button activation
export const toggleButtonActivation = () => {
    const buttons = document.querySelectorAll('#rockButton, #paperButton, #scissorsButton');
    
    // Check the current state of the first button and toggle all buttons
    const isDisabled = buttons[0].disabled;
    
    buttons.forEach(button => {
        button.disabled = !isDisabled; // Toggle the disabled state
    });
};