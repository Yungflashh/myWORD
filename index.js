"use strict";
let container = document.getElementById("container");
let attemptsContainer = document.getElementById("attempts");
let wordguess = ["CRYPT"];
let currentWordIndex = 0;
let maxAttempts = 5;
let attempts = 0;
alert(` Welcome to My WORD

    How to Play
   
   1. Start the Game:
      - When you begin, you’ll see a selection of hidden words. The game randomly picks one for you to guess.
   
   2. Input Fields:
      - For each letter in the hidden word, you’ll see an empty box (input field) where you can type your guesses.
   
   3. Making Your Guess:
      - Start typing letters into the input fields, one at a time. You can only enter one letter per box.
      - Once you type a letter, that box will be disabled to prevent changes, so you can focus on the next letter.
   
   4. Getting Feedback:
      - After filling in all the boxes, the game checks your letters:
        - Green Box: The letter is correct and in the right position!
        - Yellow Box: The letter is correct but in the wrong position.
        - White Box: The letter is not in the word at all.
   
   5. Tracking Your Progress:
      - After each guess, your attempt will be displayed above the input fields, showing what you typed and which attempt number it is.
      - You have a total of five attempts to guess the word.
   
   6. Continuing the Game:
      - If your guess is incorrect but you still have attempts left, new input boxes will appear beneath your previous guesses. Keep trying!
   
   7. Winning or Losing:
      - If you guess the word correctly, you’ll see a congratulatory message!
      - If you use all five attempts without guessing correctly, you’ll be notified that the game is over.
   
   Enjoy the Challenge!
   
   The Word Guessing Game is not just about finding the correct letters; it's about strategy and deduction. Have fun guessing, and see how quickly you can figure out the hidden word! Happy playing!`);
function createInputFields(word) {
    let splitWord = word.split("");
    // Create a new div for the current attempt
    let attemptDiv = document.createElement("div");
    attemptDiv.className = "attempt";
    splitWord.forEach((letter, index) => {
        let input = document.createElement("input");
        input.maxLength = 1; // Allow only one character
        input.id = `input-${attempts}-${index}`; // Unique ID for each input
        attemptDiv.appendChild(input);
        input.addEventListener("input", () => {
            input.value = input.value.toUpperCase(); // Convert to uppercase
            // Move focus to the next input if filled
            if (input.value.length === 1) {
                input.disabled = true; // Disable the current input
                const nextInput = document.getElementById(`input-${attempts}-${index + 1}`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
            // Check if all inputs are filled
            const allInputs = [...attemptDiv.querySelectorAll("input")];
            const allFilled = allInputs.every(input => input.value.length === 1);
            if (allFilled) {
                attempts++; // Increment the attempt count
                allInputs.forEach((input, idx) => {
                    const currentInputValue = input.value.toUpperCase();
                    // Check the letter
                    if (currentInputValue === splitWord[idx]) {
                        input.style.background = "green";
                        input.style.color = "white";
                    }
                    else if (splitWord.includes(currentInputValue)) {
                        input.style.background = "yellow";
                        input.style.color = "white";
                    }
                    else {
                        input.style.background = "white";
                        input.style.color = "black";
                    }
                });
                // Display the current guess
                displayCurrentGuess(allInputs);
                // Check if the attempt is correct
                const allCorrect = allInputs.every((input, idx) => input.value === splitWord[idx]);
                if (allCorrect) {
                    alert("Congratulations! You've guessed the word correctly!");
                }
                else if (attempts < maxAttempts) {
                    // If not correct and attempts are left, create new input fields
                    createInputFields(word);
                }
                else {
                    alert("Sorry, you've used all your attempts.");
                }
            }
        });
    });
    // Append the current attempt div to the container
    container.appendChild(attemptDiv);
}
// Function to display current guesses above the inputs
function displayCurrentGuess(inputs) {
    const guessDiv = document.createElement("div");
    guessDiv.className = "guess";
    guessDiv.textContent = `Attempt ${attempts + 1}: ${inputs.map(input => input.value).join("")}`;
    attemptsContainer.appendChild(guessDiv);
}
// Start the game with the first word
createInputFields(wordguess[currentWordIndex]);
