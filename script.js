'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; // delcaring an empty variable, which will then be assigned a value inside the init function. (lines 23, 24, 27, 30)

// Initalisation of game
const init = function () {
  //Setting the starting conditions of the game

  // Current score
  scores = [0, 0];
  currentScore = 0;

  // Active player
  activePlayer = 0;

  // setting state of game
  playing = true;

  //resetting scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //resetting background for winner
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  //resetting active player
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//player switcher
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; // setting score back to zero.
  activePlayer = activePlayer === 0 ? 1 : 0; // if active player is player 0, then switch to player 1
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random number from a roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice result
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // pulls in the corresponding dice img based on dice variable
    //3. Check for rolled 1: if true,
    if (dice != 1) {
      //Add dice value to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// Holding score
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active players total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check score is already >= 100. If it is, finish game.
    if (scores[activePlayer] >= 50) {
      //finish game
      playing = false; // makes the game inactive
      diceEl.classList.add('hidden'); // removes dice once game is finished
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. if it isn't, switch player
      switchPlayer();
    }
  }
});

// Resetting game
btnNew.addEventListener('click', init);
