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
let resetButton = document.querySelector('.resetButton');
let userAnswers = document.querySelector('.userAnswers');
let warningMessage = document.querySelector('.warningMessage');
let replayGuess = document.querySelector('.replayGuess');
let numberOfTurnsLeft = document.querySelector('.numberOfTurnsLeft');

const startButton = document.createElement('button');
let randomNumber = Math.floor(Math.random() * 100) + 1;
let resetParagraphs = document.querySelectorAll('.resultsMessages p');
let turns = 4;
let answers = [];

fieldset.append(startButton);

startButton.type = 'button';
startButton.innerText = 'Start';

startButton.classList.add('btn', 'btn-md', 'btn-outline-success');

startButton.addEventListener('click', function () {
  inputNumberArea.classList.remove('d-none');
  buttonsArea.classList.remove('d-none');
  startButton.classList.add('d-none');
});

form.addEventListener('submit', (e) => {
  let isDuplicate = false;
  e.preventDefault();
  let input = Number(document.getElementById('inputArea').value);
  console.log(input);

  if (input != '' && turns > 0 && (input > 0 || input < 101)) {
    if (input === randomNumber) {
      replayGuess.innerText = "GREAT! That's the number I was thinking of.";
      setGameOver();
    } else if (input < randomNumber) {
      replayGuess.innerText =
        "Upsiii, that's not the number. The number I'm thinking of it's a bigger one.";

      turns = turns - 1;

      numberOfTurnsLeft.innerText = `You have ${turns + 1} turns left.`;
    } else if (input > randomNumber) {
      replayGuess.innerText =
        "Nope! The number I'm thinking of it's a smaller one.";

      turns = turns - 1;

      numberOfTurnsLeft.innerText = `You have ${turns + 1} turns left.`;
    }

    if (input !== randomNumber) {
      if (answers.length === 0) {
        answers.push(input);
        console.log(answers);
        userAnswers.textContent = `Previous guesses: ${answers.join()}`;
      } else {
        answers.forEach(function (answerValue) {
          if (input === answerValue) {
            isDuplicate = true;
            turns = turns + 1;
            //DE VERIFICAT DE CE SCADE CU 1 ATUNCI CAND EXISTA UN DUPLICAT
          }
        });

        if (isDuplicate) {
          warningMessage.innerText = `You've already tried ${input}`;
        } else {
          answers.push(input);
          console.log(answers);
        }
        userAnswers.textContent = `Previous guesses: ${answers.join()}`;
      }
    }
  } else if (turns === 0) {
    numberOfTurnsLeft.innerText = `Sorry, but this time you're not into the mood of a Medium.`;

    setGameOver();
  }
  console.log(`your turns ${turns}`);
});

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
  resetButton.classList.remove('d-none');
  buttonsArea.append(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  turns = 4;
  randomNumber = Math.floor(Math.random() * 100) + 1;

  // resultsMessages.replaceChildren();
  replayGuess.innerText = '';
  userAnswers.innerText = '';
  warningMessage.innerText = '';
  numberOfTurnsLeft.innerText = '';
  answers = [];

  inputArea.disabled = false;
  submitButton.disabled = false;
  inputArea.value = '';
  inputArea.focus();

  resetButton.parentElement.removeChild(resetButton);
}

console.log('Nr random este:' + randomNumber);
