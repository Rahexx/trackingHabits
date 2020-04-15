const addSetHabit = document.querySelector('.add');
const deleteNavHabit = document.querySelector('.delete');
const listNavHabit = document.querySelector('.habit');
const popUpAdd = document.querySelector('.addHabit');
const popUpDelete = document.querySelector('.deleteHabit');
const removePopUp = document.querySelectorAll('.fa-times');
const formAddHabit = document.querySelector('.addHabit form');
const listHolder = document.querySelector('.listHolder');
// const listHabits = document.querySelector('.listHabit');
const openSettings = document.querySelector('.fa-cog');
const nav = document.querySelector('nav');
const navList = document.querySelector('.navList');
const closeSettings = document.querySelector('.closeNav');
const textNavList = document.querySelectorAll('.navList span');
const div = document.createElement('div');
let flagListHabit = 0;

function validateNewHabit(newHabit) {
  return newHabit.length > 3;
}

function addHabit(e) {
  e.preventDefault();

  const newHabit = formAddHabit.children[0].value;
  popUpAdd.style.display = 'none';
  div.style.width = '0';
  formAddHabit.children[0].value = '';
  if (newHabit.length < 3) return false;

  return newHabit;
}

function removeCurrentHabit(habits, currentHabit) {
  if (habits.includes(currentHabit)) {
    const indexHabit = habits.indexOf(currentHabit);
    habits.splice(indexHabit, 1);
  }

  popUpDelete.style.display = 'none';
  div.style.width = '0';
  return habits.length > 0 ? habits[0] : '';
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

  deleteNavHabit.addEventListener('click', () => {
    div.style.width = '100vw';
    popUpDelete.style.display = 'flex';
  });

  listNavHabit.addEventListener('click', () => {
    if (flagListHabit === 0) {
      listHolder.style.display = 'block';
      flagListHabit = 1;
    } else {
      listHolder.style.display = 'none';
      flagListHabit = 0;
    }
  });

  openSettings.addEventListener('click', () => {
    nav.style.width = '380px';
    openSettings.style.display = 'none';
    navList.style.display = 'flex';
    textNavList.forEach((elem) => {
      elem.classList.add('grow');
    });
  });

  closeSettings.addEventListener('click', () => {
    nav.style.width = '80px';
    openSettings.style.display = 'block';
    navList.style.display = 'none';
    listHabits.style.display = 'none';
    flagListHabit = 0;
  });

  removePopUp.forEach((elem) => {
    elem.addEventListener('click', () => {
      popUpAdd.style.display = 'none';
      popUpDelete.style.display = 'none';
      div.style.width = '0';
    });
  });

  addStyle(div);
  document.body.appendChild(div);
}

export { initNav, addHabit, removeCurrentHabit, validateNewHabit };
