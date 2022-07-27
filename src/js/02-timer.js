import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};

flatpickr('#datetime-picker', options);

const refs = {
  picker: document.querySelector('#datetime-picker'),
  // timer: document.querySelector('.timer'),
  // field: document.querySelectorAll('.field'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const TIME_IS_NOW = Date.now();
// const isActive = false;

// refs.timer.style.display = 'flex';
// refs.timer.style.justifyContent = 'center';
// refs.timer.style.border = '2px solid #000';
// refs.timer.style.borderRadius = '25%';
// refs.timer.style.marginTop = '20px';
// refs.timer.style.width = '520px';

refs.start.addEventListener('click', onButtonStart);
refs.picker.addEventListener('input', checkTime);

refs.start.disabled = true;

function checkTime() {
  const TIME_IS_NOW = Date.now();
  const date = new Date(document.querySelector('#datetime-picker').value);
  // const now = new Date();
  console.log('~ TIME_IS_NOW', TIME_IS_NOW);
  if (date < TIME_IS_NOW) {
    Notiflix.Notify.warning('Please choose a date in the future');
    refs.start.disabled = true;
    return;
  }

  refs.start.disabled = false;
}

function onButtonStart() {
  const TIME_IS_NOW = Date.now();
  const date = new Date(refs.picker.value);
  // const now = new Date();

  let diff = date - TIME_IS_NOW;

  refs.start.disabled = true;
  refs.picker.disabled = true;

  const intervalId = setInterval(() => {
    diff -= 1000;
    console.log('Milliseconds left:', diff);
    convertMs(diff);

    if (diff <= 0) {
      clearInterval(intervalId);
      return;
    }

    refs.days.textContent = addLeadingZero(convertMs(diff).days);
    refs.hours.textContent = addLeadingZero(convertMs(diff).hours);
    refs.minutes.textContent = addLeadingZero(convertMs(diff).minutes);
    refs.seconds.textContent = addLeadingZero(convertMs(diff).seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
