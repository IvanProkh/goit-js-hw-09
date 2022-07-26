// *В HTML есть разметка формы, в поля которой пользователь будет вводить первую задержку в миллисекундах, шаг
// *увеличения задержки для каждого промиса после первого и количество промисов которое необходимо создать.

// *Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз, сколько ввели
// *в поле amount.При каждом вызове передай ей номер создаваемого промиса(position) и задержку учитывая введенную
// *пользователем первую задержку(delay) и шаг(step).

// *Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или отклоняется через
// *delay времени.Значением промиса должен быть объект, в котором будут свойства position и delay со значениями одноименных
// *параметров.Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.

import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submit: document.querySelector('[type="submit"]'),
};

let delay = 0;
let step = 0;
let amount = 0;
let position = 1;

refs.form.addEventListener('submit', onFormSubmit);
// refs.submit.addEventListener('click', onFormSubmit);

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success');
//   }, delay);
// });

function onFormSubmit(e) {
  e.preventDefault();
  delay = Number(refs.delay.value);
  // console.log('НАЧАЛЬНОЕ ВРЕМЯ', delay);
  step = Number(refs.step.value);
  amount = Number(refs.amount.value);

  for (let i = 0; i < amount; i += 1) {
    // createPromise(position, delay);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
    position += 1;

    // console.log('ПОЗИЦИЯ', position);
    // console.log('ВРЕМЯ', delay);
  }
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     resolve Promise(position, delay);
//   } else {
//     reject Promise(position, delay);
//   }
// }

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};
