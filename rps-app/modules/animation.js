// this module handles animations

export const createRetroDotsAnimation = (elementId, interval = 500) => {
    const element = document.getElementById(elementId);
    if (!element) return null;

    const dots = ['', '.', '..', '...'];
    let index = 0;

    const intervalId = setInterval(() => {
        element.innerText = `CPU is thinking${dots[index]}`;
        index = (index + 1) % dots.length;
    }, interval);

    return intervalId; // Return the interval ID so it can be stopped
};

export const stopAnimation = (intervalId) => {
    clearInterval(intervalId); // Stop the animation when CPU makes a choice
};
