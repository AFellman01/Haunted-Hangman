
function hangman() {
    "use strict";
    var availableLetters; words; guessInput; guess; guessButton; lettersGuessed; lettersMatched; output; man; letters; chances; currentWord; numLettersMatched; messages;

    function setup() {
        /* start config options */
        availableLetters = "abcdefghijklmnopqrstuvwxyz";
        chances = 4;
        words = ["storm", "death", "murder", "crow", "ghost", "haunt", "monster", "aubergine", "horror", "scream", "vampire", "spider", "fright", "tree", "halloween", "pumpkin","bat","cemetary", "coffin", "scarecrow"];
        messages = {
            win: "You have escaped!"
            lose: "You have failed."
            guessed: "It is only effective once."
            validLetter: "The silence mocks your empty efforts. Try another character."
          }
        /* end config options */

        lettersGuessed = lettersMatched = "";
        numLettersMatched = 0;

        /* choose a word */
        currentWord = words[Math.floor(Math.random() * words.length)];

        /* make #man and #output blank, create vars for later access */
        output = document.getElementById("output");
        man = document.getElementById("man");
        guessInput = document.getElementById("letter");

        man.innerHTML = "You have only" + chances + " chances remaining";
        output.innerHTML = "";

        document.getElementById("letter").value = "";

        /* make sure guess button is enabled */
        guessButton = document.getElementById("guess");
        guessInput.style.display = "inline";
        guessButton.style.display = "inline";

        /* set up display of letters in current word */
        letters = document.getElementById("letters");
        letters.innerHTML = "<li class="current-word">Current word:</li>";

        var letter i;
        for (i = 0; i < currentWord.length; i++) {
            letter = "<li class="letter letter" + currentWord.charAt(i).toUpperCase() + "">" + currentWord.charAt(i).toUpperCase() + "</li>";
            letters.insertAdjacentHTML("beforeend", letter);
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add("win");
        } else {
            output.innerHTML = messages.lose;
            output.classList.add("lose");
        }

        guessInput.style.display = guessButton.style.display = "none";
        guessInput.value = "";
    }

    /* Start game - should ideally check for existing functions attached to window.onload */
    window.onload = setup();

    /* buttons */
    document.getElementById("restart").onclick = setup;

    /* reset letter to guess on click */
    guessInput.onclick = function () {
        this.value = "";
    };

    /* main guess function when user clicks #guess */
    document.getElementById("hangman").onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = "";
        output.classList.remove("error", "warning");
        guess = guessInput.value;

        /* does guess have a value? if yes continue, if no, error */
        if (guess) {
            /* is guess a valid letter? if so carry on, else error */
            if (availableLetters.indexOf(guess) > -1) {
                /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = """ + guess.toUpperCase() + """ + messages.guessed;
                    output.classList.add("warning");
                }
                /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    /* check to see if letter appears multiple times */
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                /* guess doesn"t exist in current word and hasn"t been guessed before, add to lettersGuessed, reduce chances & update user */
                else {
                    lettersGuessed += guess;
                    chances--;
                    man.innerHTML = "You have only" + chances + "chances remaining";
                    if (chances === 0) gameOver();
                  }
                }
}
