import {
  initNav, addHabit, removeCurrentHabit, renderListHabits,
} from './nav';

const buttonAddHabit = document.querySelector('.addHabit form').children[1];
const buttonRemoveHabit = document.querySelector('.deleteHabit button');
const habitText = document.querySelector('main h1');
const habits = ['Przestać palić'];
let currentHabit = habits[0];

buttonAddHabit.addEventListener('click', (e) => {
  const newHabit = addHabit(e);
  habits.push(newHabit);
  renderListHabits(habits, habitText);
});

buttonRemoveHabit.addEventListener('click', () => {
  const newCurrentHabit = removeCurrentHabit(habits, currentHabit);
  currentHabit = newCurrentHabit;
  habitText.textContent = currentHabit;
  renderListHabits(habits, habitText);
});

initNav();
renderListHabits(habits, habitText);
habitText.textContent = currentHabit;
