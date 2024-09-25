// This file handles all UI-related updates and utility functions like showing/hiding elements and updating the UI.

export function showElement(elementId) {
    document.getElementById(elementId).classList.remove('hidden');
}

export function hideElement(elementId) {
    document.getElementById(elementId).classList.add('hidden');
}

export function updateUI(score, lives, timerValue, message) {
    document.getElementById('score-box').innerText = `Score: ${score}`;
    document.getElementById('lives-box').innerText = `Lives: ${lives}`;
    document.getElementById('timer-box').innerText = `Time: ${timerValue}`;
    document.getElementById('state-box').innerText = message;
}

export function updateSelections(userChoice, cpuChoice) {
    document.getElementById('user-selection').innerText = `Your Choice: ${userChoice}`;
    document.getElementById('cpu-selection').innerText = `CPU Choice: ${cpuChoice}`;
}

export function moveUpAnimation(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('move-up');
    element.addEventListener('animationend', () => {
        element.classList.remove('move-up'); // Clean up after the animation
    });
}

export function vanishAnimation(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('vanish');
    element.addEventListener('animationend', () => {
        element.classList.add('hidden'); // Hide the element after animation
        element.classList.remove('vanish'); // Clean up after the animation
    });
}
