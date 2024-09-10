// Handles timer functionality like starting and resetting timers for each game round.

let timerInterval;

export function startTimer(duration, onTimeout) {
    let timerValue = duration;
    const timerDisplay = document.getElementById('timer-box');
    timerDisplay.innerText = `Time: 00:${timerValue.toFixed(2)}`;

    timerInterval = setInterval(() => {
        timerValue -= 0.1;
        timerDisplay.innerText = `Time: 00:${timerValue.toFixed(2)}`;
        if (timerValue <= 0) {
            clearInterval(timerInterval);
            onTimeout();
        }
    }, 100);
}

export function resetTimer() {
    clearInterval(timerInterval);
}
