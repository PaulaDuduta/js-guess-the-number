const title = document.createElement('div');
const container = document.createElement('div');
const pageTitle = document.createElement('h1');
const form = document.createElement('form');
const fieldset = document.createElement('fieldset');
const botMessage = document.createElement('div');
const userMessage = document.createElement('div');
const button = document.createElement('button');
const inputArea = document.createElement('input');
const buttonArea = document.createElement('div');
const submitButton = document.createElement('button');
const resetButton = document.createElement('button');
const randomNumber = Math.floor(Math.random() * 101);
const replayGuess = document.createElement('div');

document.body.appendChild(title);
document.body.appendChild(container);
title.prepend(pageTitle);
container.append(form);
form.append(fieldset);
fieldset.append(
  botMessage,
  userMessage,
  button,
  inputArea,
  buttonArea,
  replayGuess,
);
buttonArea.append(submitButton, resetButton);

title.classList.add('pageTitle');
container.classList.add('container');
button.classList.add('nextButton');
botMessage.classList.add('botMessage');
userMessage.classList.add('userMessage');
replayGuess.classList.add('replayGuess');

button.type = 'button';
inputArea.type = 'number';
inputArea.min = '1';
inputArea.max = '100';

pageTitle.innerText = 'Guess the number';
submitButton.innerText = 'Try your guess';
resetButton.innerText = 'Reset';

submitButton.setAttribute('class', 'btn btn-md btn-outline-info');
resetButton.setAttribute('class', 'btn btn-md btn-outline-secondary');
inputArea.setAttribute('id', 'inputArea');

botMessage.innerHTML =
  "<p>Hi! I'm MiniBot (●'◡'●)</p> <p>I want to play a mind game with you! </p> <p>What do you think? </p> <p>";
button.innerText = 'Next';

button.addEventListener('click', () => {
  fieldset.append(userMessage);
  userMessage.innerHTML = "<p>Hi MiniBot! Let's play the game!</p>";
});

button.addEventListener('click', () => {
  const botMessage2 = document.createElement('div');
  fieldset.append(botMessage2);
  botMessage2.innerHTML =
    "<p>Great! Here are the rules.</p> <p>I have selected a random number between 1 and 100. See if you can guess it in 10 turns or fewer. I'll tell you if your guess was too high or too low.</p>";
});

button.addEventListener('click', () => {
  const userMessage2 = document.createElement('div');
  fieldset.append(userMessage2);
  userMessage2.innerHTML = "<p>This sounds easy! Let's start</p>";
});

//VERIF |

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let input = Number(document.getElementById('inputArea').value);
  console.log(input);
  let userAnswers = [];

  if (input === randomNumber) {
    replayGuess.innerHTML =
      "<p>GREAT! That's the number I was thinking of.</p>";

    console.log(userAnswers);
  } else if (input < randomNumber) {
    replayGuess.innerHTML =
      "<p>Upsiii, that's not the number. The number I'm thinking of it's a bigger one.</p>";

    console.log(userAnswers);
  } else if (input > randomNumber) {
    replayGuess.innerHTML =
      "<p>Nope! The number I'm thinking of it's a smaller one.</p>";
  }

  if (input !== randomNumber) {
    userAnswers = userAnswers.push(input);
    console.log(userAnswers);
  }
});

console.log(randomNumber);
