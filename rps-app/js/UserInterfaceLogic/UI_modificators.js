// A function that enables/disables all component interactions in UI and colors/greys them out


// A function that takes in a component current text and sets a new text in there
export function changeText(elementId, newText) {
    try { 
        elementId.innerText = newText;
        return true;
    } catch (error) {
        console.error("An error occurred:", error);
        return false;
    }
}

// A function that returns a component innertext string value (too simple, redundant, unnecessary)


// 