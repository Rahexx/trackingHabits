const addSetHabit = document.querySelector('.add');
const deleteSetHabit = document.querySelector('.delete');
const popUpAdd = document.querySelector('.addHabit');
const popUpDelete = document.querySelector('.deleteHabit');
const removePopUp = document.querySelectorAll('.fa-times');
const formAddHabit = document.querySelector('.addHabit form');
const listHabit = document.querySelector('.listHabit');
const div = document.createElement('div');

function addHabit(e) {
  e.preventDefault();
  const newHabit = formAddHabit.children[0].value;
  popUpAdd.style.display = 'none';
  formAddHabit.children[0].value = '';
  return newHabit;
}

function removeCurrentHabit(habit, currentHabit) {
  if (habit.includes(currentHabit)) {
    const indexHabit = habit.indexOf(currentHabit);
    habit.splice(indexHabit, 1);
  }

  popUpDelete.style.display = 'none';
  return habit.length > 0 ? habit[0] : '';
}

function addStyle(element) {
  const elem = element;
  elem.style.position = 'absolute';
  elem.style.top = '0';
  elem.style.left = '0';
  elem.style.width = '0';
  elem.style.height = '100vh';
  elem.style.backgroundColor = 'rgba(0,0,0,0.7)';
  elem.style.zIndex = '1';
}

function initNav() {
  addSetHabit.addEventListener('click', () => {
    div.style.width = '100vw';
    popUpAdd.style.display = 'flex';
  });

  deleteSetHabit.addEventListener('click', () => {
    div.style.width = '100vw';
    popUpDelete.style.display = 'flex';
  });

  for (let i = 0; i < removePopUp.length; i++) {
    removePopUp[i].addEventListener('click', () => {
      popUpAdd.style.display = 'none';
      popUpDelete.style.display = 'none';
      div.style.width = '0';
    });
  }

  addStyle(div);
  document.body.appendChild(div);
}

export { initNav, addHabit, removeCurrentHabit };
