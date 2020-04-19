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
    const itemParent = item.parentNode.parentNode.parentNode;
    const parentDisplayValue = getComputedStyle(itemParent).getPropertyValue(
      'display',
    );

    if (parentDisplayValue === 'block') {
      sumMonthValue += Number(item.textContent.split('/')[0]);
    }
  });

  calendarHabits.setSumHabits(sumMonthValue);
  sumMonthsElem.textContent = sumMonthValue;
}

function changeValueMonth(elem, operation) {
  const child = elem;
  const currentMonthResult =
    child.parentNode.parentNode.parentNode.previousSibling.previousSibling
      .children[0];
  const textmonthResult = currentMonthResult.textContent.split('/');
  let resultMonth = 0;

  if (operation === 'inc') {
    resultMonth = Number(textmonthResult[0]) + 1;
  } else if (operation === 'decr') {
    resultMonth = Number(textmonthResult[0]) - 1;
  }

  currentMonthResult.textContent = `${resultMonth}/${textmonthResult[1]}`;

  changeValueSum();
}

function changeStatus(elem) {
  if (!elem.classList.contains('done')) {
    elem.classList.remove('notDone');
    elem.classList.add('done');

    changeValueMonth(elem, 'inc');
  } else if (!elem.classList.contains('notDone')) {
    elem.classList.remove('done');
    elem.classList.add('notDone');

    changeValueMonth(elem, 'decr');
  }
}

function addEvent() {
  const habitStatus = document.querySelectorAll('.listDays li span');

  habitStatus.forEach((elem) => {
    elem.removeEventListener('click', () => {
      changeStatus(elem);
    });
  });

  habitStatus.forEach((elem) => {
    elem.addEventListener('click', () => {
      changeStatus(elem);
    });
  });
}

// hide previous habit months

function hideMonths() {
  const firstWordCurrentHabit = calendarHabits.getCurrentHabit().split(' ')[0];
  const months = document.querySelectorAll(
    `.${firstWordCurrentHabit}${calendarHabits.getIndexCurrentHabit()}`,
  );

  months.forEach((elem) => {
    elem.style.display = 'none';
  });
}

// show habit months

function showMonths() {
  const firstWordCurrentHabit = calendarHabits.getCurrentHabit().split(' ')[0];
  const months = document.querySelectorAll(
    `.${firstWordCurrentHabit}${calendarHabits.getIndexCurrentHabit()}`,
  );

  months.forEach((elem) => {
    elem.style.display = 'block';
  });
}

// create List habits
function renderListHabits() {
  listHabits.innerHTML = '';

  habits.forEach((elem) => {
    const li = document.createElement('li');
    li.textContent = elem;
    listHabits.appendChild(li);

    li.addEventListener('click', () => {
      const months = document.querySelectorAll('.monthsHolder div');
      const sumResults = document.querySelector('.sum');
      habitText.textContent = li.textContent;
      currentHabit = li.textContent;

      if (months.length > 0) {
        hideMonths();
        calendarHabits.setCurrentHabit(currentHabit);
        sumResults.textContent = calendarHabits.getSumHabits()
          ? calendarHabits.getSumHabits()
          : '0';
      } else {
        calendarHabits.setCurrentHabit(currentHabit);
        sumResults.textContent = calendarHabits.getSumHabits()
          ? calendarHabits.getSumHabits()
          : '0';
        hideMonths();
      }

      // 36 because one habit create 36 divs
      if (36 * calendarHabits.getHabits().length > months.length) {
        calendarHabits.renderCalendar();
      } else {
        showMonths();
      }
      addEvent();
    });
  });
}

// add and remove habit
buttonAddHabit.addEventListener('click', (e) => {
  const newHabit = addHabit(e);

  if (newHabit !== false) habits.push(newHabit);
  calendarHabits.pushNewSumHabits();

  renderListHabits();
});

buttonRemoveHabit.addEventListener('click', () => {
  const sumResults = document.querySelector('.sum');
  sumResults.textContent = '0';
  const habitRemove = currentHabit;
  const newCurrentHabit = removeCurrentHabit(currentHabit, calendarHabits);

  currentHabit = newCurrentHabit;
  calendarHabits.setCurrentHabit(currentHabit);
  habitText.textContent = calendarHabits.getCurrentHabit();

  if (calendarHabits.habits.length > 0) {
    const indexHabit = calendarHabits.habits.indexOf(
      calendarHabits.getCurrentHabit(),
    );
    const currentHabitDiv = document.querySelectorAll(
      `.${calendarHabits.getCurrentHabit().split(' ')[0]}${indexHabit}`,
    );

    if (currentHabitDiv.length === 0) {
      calendarHabits.renderCalendar();
    } else {
      showMonths();
    }
  }

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

addEvent();
initNav();
renderListHabits();
habitText.textContent = currentHabit;
