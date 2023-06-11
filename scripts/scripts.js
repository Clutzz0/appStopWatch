let timerId;
let startTime;
let elapsedTime = 0;
let isRunning = false;

function toggleTimer() {
  if (!isRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
}

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerId = setInterval(updateTimer, 10);
    isRunning = true;
    updateButtonLabel('Pause');
  }
}

function pauseTimer() {
  if(isRunning) {
    clearInterval(timerId);
    isRunning = false;
    updateButtonLabel('Continue');
  }
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  clearInterval(timerId);
  updateDisplay();
  updateButtonLabel('Start')
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  updateDisplay();
}

function updateDisplay() {
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
  const hours = Math.floor(elapsedTime / 1000 / 60 / 60);

  const timerDisplay = document.querySelector('.js-stopwatch-txt') 
  timerDisplay.innerHTML = 
  `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`
}

function updateButtonLabel(label) {
  const buttonTxt = document.querySelector('.js-start-btn');
  buttonTxt.innerHTML = label;
}

function pad(value) {
  return value.toString().padStart(2, '0');
}

document.querySelector('.js-start-btn').addEventListener('click', toggleTimer)
document.querySelector('.js-clear-btn').addEventListener('click', resetTimer)
