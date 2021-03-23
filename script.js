'use strict';

//Step 1: Initialise the score and set it to 0:
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //The '.getElementById' tag is an alternative to '.querySelector'
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
let currentScore = 0; //This initialises the score to be added to the total score.
let activePlayer = 0;
let scores = [0, 0];
// let playerTwoScore = 0;
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnHold = document.querySelector('.btn--hold'); //Variable for the 'hold' button.
let playing = true; //This variable will determine if the game is playable or not.

score0El.textContent = 0;
score1El.textContent = 0;

//switchPlayer function:
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Displays the current score as 0 when dice rolls 1.
  currentScore = 0; //sets the current score to 0.
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //The toggle class will add or remove the 'player--active' class that changes
  player1El.classList.toggle('player--active'); //the background colour depending on who is active.
};

//Step 2: Remove the dice:
diceEl.classList.add('hidden'); //This is another way of writing: document.querySelector('.dice').classList.add('hidden);

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //To display the image of the dice:
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //To add the score and switch players if the dice rolls 1:
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // current0El.textContent = currentScore; //displays the current score to the class 'current--0'.
    } else {
      //Switch to next player:
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore; //This adds the current score to the score to the element of the active player.
    //scores[1] = scores[1] + currentScore; //Another way of writing the above expression.
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      //Finish the game:
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //This adds the 'player--winner' class when the player has won. The properties of this class can be found in the CSS file.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //This removes the 'player--active' class.
    }
  }
  switchPlayer();
});

btnNew.addEventListener('click', function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--winner');
  diceEl.classList.add('hidden');
});
