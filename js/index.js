import { initNav, addHabit, removeCurrentHabit } from './nav';

const buttonAddHabit = document.querySelector('.addHabit form').children[1];
const buttonRemoveHabit = document.querySelector('.deleteHabit button');
const habits = ['Przestać palić'];
let currentHabit = habits[0];

buttonAddHabit.addEventListener('click', (e) => {
  const newHabit = addHabit(e);
  habits.push(newHabit);
});

buttonRemoveHabit.addEventListener('click', () => {
  const newCurrentHabit = removeCurrentHabit(habits, currentHabit);
  currentHabit = newCurrentHabit;
});

initNav();
