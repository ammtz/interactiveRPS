// /js/main.js

// Import utility functions from utils.js
import {
    showInstructions,
    startGame,
    resetGame,
  } from "./utils.js"; // Adjust the import statement to import specific functions
  

  let gameStarted = false;
  
  // Initialization Module to Set Up the Game
  (function init() {
    showInstructions(); // Show instructions at the start
  
    // Event Listeners
    document
      .getElementById("start-game-btn")
      .addEventListener("click", startGame);
    document
      .getElementById("restart-game-btn")
      .addEventListener("click", startGame);
    document.getElementById("return-menu-btn").addEventListener("click", function () {
      document.getElementById("game-over").classList.add("hidden");
      document.getElementById("main-menu").classList.remove("hidden");
      resetGame(); // Reset the game to initial state
    });
  
    // Start Game on Space Key Press
    document.addEventListener("keyup", function (event) {
      if (event.code === "Space" && !gameStarted) {
        startGame();
        document.getElementById("instructions").style.display = "none";
      }
    });
  })();
  