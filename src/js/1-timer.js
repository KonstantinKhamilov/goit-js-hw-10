// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Ваш код, использующий flatpickr

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const day = document.getElementById('day');
const hrs = document.getElementById('hrs');
const min = document.getElementById('min');
const sec = document.getElementById('sec');

const userDay = document.querySelector('[data-days]');
const userHrs = document.querySelector('[data-hours]');
const userMin = document.querySelector('[data-minutes]');
const userSec = document.querySelector('[data-seconds]');

const currentYear = new Date().getFullYear();

let newYear = new Date(`1 Jan ${currentYear + 1} 00:00:00`);
let userSelectedDate;
let intervalId;

function countdownDate(targetDate, dayElem, hrsElem, minElem, secElem) {
  return function () {
    const today = Date.now();
    const gap = targetDate - today;
    if (gap <= 0) {
      clearInterval(intervalId);
      dayElem.innerHTML = '00';
      hrsElem.innerHTML = '00';
      minElem.innerHTML = '00';
      secElem.innerHTML = '00';
      return;
    }
    let d = Math.floor(gap / 1000 / 60 / 60 / 24);
    let h = Math.floor((gap / 1000 / 60 / 60) % 24);
    let m = Math.floor((gap / 1000 / 60) % 60);
    let s = Math.floor((gap / 1000) % 60);

    dayElem.innerHTML = d < 10 ? '0' + d : d;
    hrsElem.innerHTML = h < 10 ? '0' + h : h;
    minElem.innerHTML = m < 10 ? '0' + m : m;
    secElem.innerHTML = s < 10 ? '0' + s : s;
  };
}

intervalId = setInterval(countdownDate(newYear, day, hrs, min, sec), 1000);

// Объект параметров для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Проверка, является ли выбранная дата датой в будущем
    if (selectedDates[0] > new Date()) {
      // Если да, сохраняем выбранную дату и делаем кнопку "Start" активной
      userSelectedDate = selectedDates[0];
      document.getElementById('startButton').disabled = false;
    } else {
      // Если нет, показываем предупреждение и делаем кнопку "Start" неактивной
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      document.getElementById('startButton').disabled = true;
    }
  },
};

// Инициализация flatpickr с выбранными параметрами
flatpickr('#datetime-picker', options);

/// Обработчик нажатия на кнопку "Start"
document.getElementById('startButton').addEventListener('click', function () {
  // Обновляем дату для обратного отсчета
  newYear = userSelectedDate;
  this.disabled = true;

  // Запуск обратного отсчета времени до выбранной даты
  intervalId = setInterval(
    countdownDate(userSelectedDate, userDay, userHrs, userMin, userSec),
    1000
  );
  // Делаем поле ввода и кнопку неактивными во время работы таймера
  document.getElementById('datetime-picker').disabled = true;
  this.disabled = true;
});
