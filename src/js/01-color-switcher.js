const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

const NOTIFICATION_DELAY = 1000;
let interval = null;

refs.start.addEventListener('click', onButtonStart);
refs.stop.addEventListener('click', onButtonStop);

function onButtonStart() {
  refs.start.disabled = true;

  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, NOTIFICATION_DELAY);
}

function onButtonStop() {
  refs.start.disabled = false;
  clearInterval(interval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
