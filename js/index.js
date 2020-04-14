import {
  initNav, addHabit, removeCurrentHabit, renderListHabits,
} from './nav';
import CalendarHabits from './calendarHabits';

const habits = ['Przestać palić'];
let currentHabit = habits[0];

const calendarHabits = new CalendarHabits(currentHabit, habits);
const buttonAddHabit = document.querySelector('.addHabit form').children[1];
const buttonRemoveHabit = document.querySelector('.deleteHabit button');
const habitText = document.querySelector('main h1');
const habitStatus = document.querySelectorAll('.listDays li span');
const monthsHolder = document.querySelector('.monthsHolder');
const leftArrow = document.querySelector('.fa-arrow-left');
const rightArrow = document.querySelector('.fa-arrow-right');
let arrowFlag = 0;

buttonAddHabit.addEventListener('click', (e) => {
  const newHabit = addHabit(e);
  if (newHabit !== false) habits.push(newHabit);
  renderListHabits(habits, habitText);
});

buttonRemoveHabit.addEventListener('click', () => {
  const newCurrentHabit = removeCurrentHabit(habits, currentHabit);
  currentHabit = newCurrentHabit;
  habitText.textContent = currentHabit;
  renderListHabits(habits, habitText);
});

habitStatus.forEach((elem) => {
  elem.addEventListener('click', () => {
    if (!elem.classList.contains('done')) {
      elem.classList.remove('notDone');
      elem.classList.add('done');
    } else if (!elem.classList.contains('notDone')) {
      elem.classList.remove('done');
      elem.classList.add('notDone');
    }
  });
});

rightArrow.addEventListener('click', () => {
  switch (arrowFlag) {
    case 0:
      monthsHolder.style.left = '530px';
      arrowFlag++;
      break;
    case 1:
      monthsHolder.style.left = '-460px';
      arrowFlag++;
      break;
    case 2:
      monthsHolder.style.left = '-1450px';
      arrowFlag++;
      break;
  }
});

leftArrow.addEventListener('click', () => {
  switch (arrowFlag) {
    case 1:
      monthsHolder.style.left = '1530px';
      arrowFlag--;
      break;
    case 2:
      monthsHolder.style.left = '530px';
      arrowFlag--;
      break;
    case 3:
      monthsHolder.style.left = '-460px';
      arrowFlag--;
      break;
  }
});

initNav();
renderListHabits(habits, habitText);
habitText.textContent = currentHabit;
