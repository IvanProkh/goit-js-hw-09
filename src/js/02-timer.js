// *В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, при клике по которой таймер должен
// *запускаться.Добавь минимальное оформление элементов интерфейса.

// *Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в
// *одном элементе интерфейса.Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один
// *импорт, кроме того который описан в документации.

// *Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
// *Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
// *Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
// *При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.

// *При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и
// *обновлять интерфейс таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx: xx: xx: xx.

// *Количество дней может состоять из более чем двух цифр.
// *Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.

// *Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. Обрати внимание, что она
// *не форматирует результат.То есть, если осталось 4 минуты или любой другой составляющей времени, то функция вернет
// *4, а не 04.В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов.Напиши функцию
// *addLeadingZero(value), которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.

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
// const isActive = false;z

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
  const date = new Date(document.querySelector('#datetime-picker').value);
  // const now = new Date();

  if (date < TIME_IS_NOW) {
    Notiflix.Notify.warning('Please choose a date in the future');
    refs.start.disabled = true;
    return;
  }

  refs.start.disabled = false;
}

function onButtonStart(e) {
  const date = new Date(refs.picker.value);
  // const now = new Date();

  let diff = date - TIME_IS_NOW;

  refs.start.disabled = true;
  refs.picker.disabled = true;

  const intervalId = setInterval(() => {
    diff -= 1000;
    console.log('Мілісекунд залишилось:', diff);
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
