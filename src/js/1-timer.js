const day = document.getElementById('day');
const hrs = document.getElementById('hrs');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const currentYear = new Date().getFullYear();

const newYear = new Date(`1 Jan ${currentYear + 1} 00:00:00`);

function countdownDate() {
  const today = Date.now();
  const gap = newYear - today;
  let d = Math.floor(gap / 1000 / 60 / 60 / 24);
  let h = Math.floor((gap / 1000 / 60 / 60) % 24);
  let m = Math.floor((gap / 1000 / 60) % 60);
  let s = Math.floor((gap / 1000) % 60);

  day.innerHTML = d < 10 ? '0' + d : d;
  hrs.innerHTML = h < 10 ? '0' + h : h;
  min.innerHTML = m < 10 ? '0' + m : m;
  sec.innerHTML = s < 10 ? '0' + s : s;
}
setInterval(countdownDate, 1000);
