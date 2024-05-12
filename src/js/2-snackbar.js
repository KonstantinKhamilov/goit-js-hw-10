// Импорт библиотеки iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  })
    .then(message => {
      iziToast.success({
        title: 'Success',
        message: message,
        position: 'topCenter',
        timeout: 1000, // Установленное значение timeout
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Error',
        message: message,
        position: 'topCenter',
        timeout: 1000, // Установленное значение timeout
      });
    });
});
