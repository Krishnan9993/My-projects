// script.js
const totalPlayers = 10000;
const minBet = 1;
const maxBet = 10;
let totalBalance = 0;
let totalWins = 0;
let totalLosses = 0;
let currentBetAmount = 0;
let currentColor = '';
let timeLeft = 30;
let timer;

const balanceDisplay = document.getElementById('balance');
const betAmountInput = document.getElementById('bet-amount');
const betRedButton = document.getElementById('bet-red');
const betGreenButton = document.getElementById('bet-green');
const predictionDisplay = document.getElementById('prediction');
const timerDisplay = document.getElementById('timer');
const resultsDisplay = document.getElementById('results');

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      revealPrediction();
    }
  }, 1000);
}

function revealPrediction() {
  currentColor = Math.random() < 0.5 ? 'Red' : 'Green';
  predictionDisplay.textContent = `Prediction: ${currentColor}`;
  setTimeout(() => {
    checkBet();
  }, 2000);
}

function checkBet() {
  if (currentBetAmount > 0) {
    if (currentColor === 'Red' && currentBetAmount === 'Red' || currentColor === 'Green' && currentBetAmount === 'Green') {
      totalBalance += currentBetAmount;
      totalWins++;
    } else {
      totalBalance -= currentBetAmount;
      totalLosses++;
    }
    updateBalance();
    displayResults();
  } else {
    alert('Please place a bet!');
  }
}

function updateBalance() {
  balanceDisplay.textContent = `Balance: $${totalBalance}`;
}

function displayResults() {
  resultsDisplay.innerHTML = `
    <p>Total Wins: ${totalWins}</p>
    <p>Total Losses: ${totalLosses}</p>
    <p>Win Rate: ${(totalWins / totalPlayers * 100).toFixed(2)}%</p>
    <p>Loss Rate: ${(totalLosses / totalPlayers * 100).toFixed(2)}%</p>
  `;
}

function simulateVirtualPlayers() {
  let totalBets = 0;
  let totalWinnings = 0;

  for (let i = 0; i < totalPlayers; i++) {
    const betAmount = Math.floor(Math.random() * (maxBet - minBet + 1)) + minBet;
    const prediction = Math.random() < 0.5 ? 'Red' : 'Green';
    const outcome = Math.random() < 0.5 ? 'Red' : 'Green';

    totalBets += betAmount;

    if (prediction === outcome) {
      totalWinnings += betAmount;
    }
  }

  const houseProfit = totalBets - totalWinnings;
  console.log(`Total Bets: $${totalBets}`);
  console.log(`Total Winnings: $${totalWinnings}`);
  console.log(`House Profit: $${houseProfit}`);
}

betRedButton.addEventListener('click', () => {
  currentBetAmount = parseInt(betAmountInput.value);
  if (currentBetAmount > 0) {
    startTimer();
  } else {
    alert('Please enter a valid bet amount!');
  }
});

betGreenButton.addEventListener('click', () => {
  currentBetAmount = parseInt(betAmountInput.value);
  if (currentBetAmount > 0) {
    startTimer();
  } else {
    alert('Please enter a valid bet amount!');
  }
});

simulateVirtualPlayers();