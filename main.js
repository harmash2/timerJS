const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const containerBtn = document.querySelector('.timer__actions');
const screen = document.querySelector('.timer__text');

const hours = document.querySelector('.timer__hours');
const dots = document.querySelector('.timer__dots');
const minutes = document.querySelector('.timer__minutes');
const seconds = document.querySelector('.timer__seconds');
const miniSecs = document.querySelector('.timer__milisecs');

let timer = null;
let startTime = 0;
let leftTime = 0;
let isRunning = false;


const start = function(){
  if(!isRunning){
    startTime = Date.now() - leftTime;
    timer = setInterval(update, 10);
    isRunning = true;
  }
};


const stop = function(){
  if(isRunning) {
    clearInterval(timer);
    leftTime = Date.now() - startTime;
    isRunning = false;
  }
};


const reset = function(){
  if(isRunning) stop();
  startTime = 0;
  leftTime = 0;
  miniSecs.textContent = '00';
  seconds.textContent = '00';
  minutes.textContent = '00';
  hours.textContent = '00';
};


const update = function(){
  const curTime = Date.now();
  leftTime = curTime - startTime;
  const hour = Math.floor(leftTime / (1000 * 60 * 60));
  const min = Math.floor(leftTime / (1000 * 60) % 60);
  const secs = Math.floor(leftTime / 1000) % 60;
  const mili = Math.floor(leftTime / 100 % 100);

  miniSecs.textContent = String(mili).padStart(2, '0');
  seconds.textContent = String(secs).padStart(2, '0');
  minutes.textContent = String(min).padStart(2, '0');
  hours.textContent = String(hour).padStart(2, '0');
  // dots.style.visibility = (secs % 2 === 0) ? 'hidden' : 'visible';  
  dots.style.color = (secs % 2 === 0) ? '#161616' : '#1616160e';
};

const handlerFunc = function(e){
  const clicked = e.target.closest('.actions__btn');
  if(!clicked) return;

  if(clicked === startBtn) start();

  if(clicked === stopBtn) stop();

  if(clicked === resetBtn) reset();
}

containerBtn.addEventListener('click', handlerFunc);