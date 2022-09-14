const fieldset = document.querySelector('.form-control');
const form = document.querySelector('form');
const userMessage = document.querySelector('.userMessage');
const botMessage = document.querySelector('.botMessage');
const inputNumberArea = document.querySelector('.inputNumberArea');
const buttonsArea = document.querySelector('.buttonsArea');
const rules = document.querySelector('.rules');
const submitButton = document.querySelector('.submitButton');
const inputArea = document.querySelector('#inputArea');
const resultsMessages = document.querySelector('.resultsMessages');
const parent = document.querySelector('.parent');
const resetButton = document.querySelector('.resetButton');
const userAnswers = document.querySelector('.userAnswers');
const warningMessage = document.querySelector('.warningMessage');
const replayGuess = document.querySelector('.replayGuess');
const numberOfTurnsLeft = document.querySelector('.numberOfTurnsLeft');
const myRandomNumber = document.querySelector('.myRandomNumber');
const winnings = document.querySelector('.winnings');
const userTurns = document.querySelector('#numberOfTurns');
const numberOfTurnsArea = document.querySelector('.numberOfTurnsArea');
const turnsArea = document.querySelector('.turnsArea');

const startButton = document.createElement('button');
let randomNumber = Math.floor(Math.random() * 100) + 1;
let turns = 0;
let answers = [];
let wins = 0;

fieldset.append(startButton);

startButton.type = 'button';
startButton.innerText = 'Start';
startButton.classList.add(
  'startButton',
  'btn',
  'btn-md',
  'btn-success',
  'my-3',
);

startButton.addEventListener('click', function () {
  userTurns.focus();
  if (userTurns.value !== '' && userTurns.value > 0 && userTurns.value < 101) {
    inputNumberArea.classList.remove('d-none');
    buttonsArea.classList.remove('d-none');
    startButton.classList.add('d-none');
    botMessage.lastElementChild.classList.add('d-none');
    userTurns.disabled = true;
    rules.style.display = 'none';
  }
});

//form event start -->
form.addEventListener('submit', (e) => {
  let isDuplicate = false;
  e.preventDefault();
  let input = Number(document.getElementById('inputArea').value);
  let numberOfTurns = Number(document.getElementById('numberOfTurns').value);

  if (input != '' && turns < numberOfTurns && (input > 0 || input < 101)) {
    if (input === randomNumber) {
      replayGuess.classList.add('win');

      replayGuess.innerText = "GREAT! That's the number I was thinking of.";
      wins += 1;

      winnings.textContent = `You've read MiniBot's mind for ${wins} times.`;

      // resultsMessages.style.display = 'none';
      inputNumberArea.style.display = 'none';
      turnsArea.style.display = 'none';

      setGameOver();
    } else if (input < randomNumber) {
      replayGuess.innerText = "The number I'm thinking of it's a bigger one.";
    } else if (input > randomNumber) {
      replayGuess.innerText =
        "Nope! The number I'm thinking of it's a smaller one.";
    }

    if (input !== randomNumber) {
      if (answers.length === 0) {
        turns += 1;
        numberOfTurnsLeft.innerHTML = `You have <span>${
          numberOfTurns - turns
        }</span> turns left.`;
        answers.push(input);
        userAnswers.innerHTML = `Previous guesses: <span>${answers.join()}</span>`;
      } else {
        answers.forEach(function (answerValue) {
          if (input === answerValue) {
            isDuplicate = true;
          }
        });

        if (isDuplicate) {
          warningMessage.innerText = `You've already tried ${input}`;
        } else {
          turns += 1;
          numberOfTurnsLeft.innerHTML = `You have <span>${
            numberOfTurns - turns
          }</span> turns left.`;
          warningMessage.innerText = '';

          answers.push(input);
        }

        userAnswers.innerHTML = `Previous guesses: <span>${answers.join()}</span>`;
      }
    }
  }

  if (turns === numberOfTurns) {
    numberOfTurnsLeft.classList.add('lose');

    numberOfTurnsLeft.innerText = `Sorry, you lost this time!`;
    setGameOver();
    myRandomNumber.innerHTML = `My random number was <span>${randomNumber}</span> ＞︿＜`;

    resultsMessages.style.display = 'none';
    inputNumberArea.style.display = 'none';
    numberOfTurnsArea.style.display = 'none';
  }
  userTurns.disabled = true;
  inputArea.value = '';
  inputArea.focus();
});
//<-- closing form event

//--> Click HERE to see the rules code
const onClick = (event) => {
  const { currentTarget: parent } = event;
  const rules = parent.nextElementSibling;

  if (rules.style.display === '') {
    rules.style.display = 'none';
  } else {
    rules.style.display = '';
  }
};

if (rules.style.display === '') {
  rules.style.display = 'none';
  parent.addEventListener('click', onClick);
} else {
  rules.style.display = '';
  parent.removeEventListener('click', onClick);
}
//<--

function setGameOver() {
  inputArea.disabled = true;
  submitButton.disabled = true;
  inputArea.value = '';
  resetButton.classList.remove('d-none');
  buttonsArea.append(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  turns = 0;
  randomNumber = Math.floor(Math.random() * 100) + 1;
  numberOfTurnsLeft.innerText = '';
  myRandomNumber.innerText = '';
  userAnswers.innerText = '';
  warningMessage.innerText = '';
  replayGuess.innerText = '';
  resultsMessages.style.display = '';
  inputNumberArea.style.display = '';
  numberOfTurnsArea.style.display = '';

  replayGuess.classList.remove('win');
  numberOfTurnsLeft.classList.remove('lose');

  answers = [];

  inputArea.disabled = false;
  userTurns.disabled = false;
  submitButton.disabled = false;
  inputArea.value = '';
  userTurns.value = '';

  userTurns.focus();

  resetButton.parentElement.removeChild(resetButton);
}
