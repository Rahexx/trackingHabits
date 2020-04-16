import { initNav, addHabit, removeCurrentHabit } from './nav';
import {
  desktopSlideRight,
  desktopSlideLeft,
  mobileSlideRight,
  mobileSlideLeft,
} from './slideCalendar';
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
const listHabits = document.querySelector('.listHabit');
let arrowFlag = 0;

// Change status habit, monthResult, sum in view

function changeValueSum() {
  const resultMonthElems = document.querySelectorAll('.monthsResult');
  const sumMonthsElem = document.querySelector('.sum');
  let sumMonthValue = 0;

  resultMonthElems.forEach((item) => {
    sumMonthValue += Number(item.textContent.split('/')[0]);
  });

  calendarHabits.updateSumHabits(sumMonthValue);
  sumMonthsElem.textContent = sumMonthValue;
}

function changeValueMonth(elem, operation) {
  const child = elem;
  const currentMonthResult = child.parentNode.parentNode.parentNode.previousSibling.previousSibling
    .children[0];
  const textmonthResult = currentMonthResult.textContent.split('/');
  const textMonth = child.parentNode.parentNode.parentNode.previousSibling.previousSibling
    .textContent;
  const month = textMonth.split(' ')[0];
  let resultMonth = 0;

  if (operation === 'inc') {
    resultMonth = Number(textmonthResult[0]) + 1;
  } else if (operation === 'decr') {
    resultMonth = Number(textmonthResult[0]) - 1;
  }
  currentMonthResult.textContent = `${resultMonth}/${textmonthResult[1]}`;
  calendarHabits.updateMonthsValues(resultMonth, month);
  changeValueSum();
}

habitStatus.forEach((elem) => {
  elem.addEventListener('click', () => {
    if (!elem.classList.contains('done')) {
      elem.classList.remove('notDone');
      elem.classList.add('done');

      changeValueMonth(elem, 'inc');
    } else if (!elem.classList.contains('notDone')) {
      elem.classList.remove('done');
      elem.classList.add('notDone');

      changeValueMonth(elem, 'decr');
    }
  });
});

// create List habits
function renderListHabits() {
  listHabits.innerHTML = '';

  habits.forEach((elem) => {
    const li = document.createElement('li');
    li.textContent = elem;
    listHabits.appendChild(li);
    li.addEventListener('click', () => {
      habitText.textContent = li.textContent;
      currentHabit = li.textContent;
      calendarHabits.setCurrentHabit(li.textContent);
    });
  });
}

// add and remove habit
buttonAddHabit.addEventListener('click', (e) => {
  const newHabit = addHabit(e);

  if (newHabit !== false) habits.push(newHabit);

  renderListHabits();
});

buttonRemoveHabit.addEventListener('click', () => {
  const newCurrentHabit = removeCurrentHabit(habits, currentHabit);

  currentHabit = newCurrentHabit;
  habitText.textContent = currentHabit;

  renderListHabits();
});

// arrow operation
rightArrow.addEventListener('click', () => {
  const widthHolder = monthsHolder.clientWidth;
  if (widthHolder > 1100) arrowFlag = desktopSlideRight(arrowFlag);
  else arrowFlag = mobileSlideRight(arrowFlag);
});

leftArrow.addEventListener('click', () => {
  const widthHolder = monthsHolder.clientWidth;
  if (widthHolder > 1100) arrowFlag = desktopSlideLeft(arrowFlag);
  else arrowFlag = mobileSlideLeft(arrowFlag);
});

initNav();
renderListHabits();
habitText.textContent = currentHabit;
