const wordDisplay = document.querySelector(".word-display") as HTMLElement;
const hangmanImage = document.querySelector(".img") as HTMLImageElement;
const guessesText = document.querySelector(".guesses-text b") as HTMLElement;
const keyBoardDiv = document.querySelector(".keyboard") as HTMLElement;
const gameModal = document.querySelector(".game-modal") as HTMLElement;
const playAgainBtn = document.querySelector(".play-again") as HTMLButtonElement;

let currentWord : string;
let correctLetters : string[];
let wrongGuessCount : number;
const maxGuesses: number = 6;

const resetGame = () : void => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.jpg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyBoardDiv.querySelectorAll("button").forEach((btn: HTMLButtonElement) => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join(" ");
    gameModal.classList.remove("show");
}

const getRandomWord = () : void => {
    const{word , hint} : {word: string , hint: string} = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b")!.innerHTML = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join(" ");
    resetGame();
}

const gameOver = (isVictory: boolean): void => {
    const modalText: string = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img")!.src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4")!.innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p")!.innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

const initGame = (button: HTMLButtonElement, clickedLetter: string): void => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
            correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.jpg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}

for(let i=97; i<= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyBoardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target as HTMLButtonElement, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);