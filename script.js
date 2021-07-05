const scoreE1 = document.querySelector('#score--0');
const scoreE2 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const playerE0 = document.querySelector('.player--0');
const playerE1 = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentEl = document.querySelector('#current--0');
const currentE2 = document.querySelector('#current--1');

// starting condition
scoreE1.textContent = 0;
scoreE2.textContent = 0;
diceEl.classList.add('hidden');
var scores, currentScore, activePlayer, playing;

const restart = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreE1.textContent = 0;
  scoreE2.textContent = 0;

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  diceEl.classList.add('hidden');
  playerE0.classList.remove('player--winner');
  playerE1.classList.remove('player--winner');
  playerE0.classList.add('player--active');
  playerE1.classList.remove('player--active');
};
restart();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerE0.classList.toggle('player--active');
  playerE1.classList.toggle('player--active');
};
// rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //   display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check for 1
    if (dice !== 1) {
      // add current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch another player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // add curent score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // if reach 30 that player is winner
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switchplayer
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', restart);
