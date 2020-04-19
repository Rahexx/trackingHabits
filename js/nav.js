const addSetHabit = document.querySelector('.add');
const deleteNavHabit = document.querySelector('.delete');
const listNavHabit = document.querySelector('.habit');
const popUpAdd = document.querySelector('.addHabit');
const popUpDelete = document.querySelector('.deleteHabit');
const removePopUp = document.querySelectorAll('.fa-times');
const formAddHabit = document.querySelector('.addHabit form');
const listHolder = document.querySelector('.listHolder');
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

function deleteDiv(indexHabit, calendar) {
  const classDiv = `${calendar.getCurrentHabit().split(' ')[0]}${indexHabit}`;
  const habtitDiv = document.querySelectorAll(`.${classDiv}`);
  const monthsHolder = document.querySelector('.monthsHolder');

  habtitDiv.forEach((elem) => {
    monthsHolder.removeChild(elem);
  });
}

// change class div firstWordIndex for new firstWordNewIndex
function changeClass(index, calendar) {
  const listHabits = calendar.habits;
  for (let i = index; i < listHabits.length; i++) {
    const classDiv = `${listHabits[i].split(' ')[0]}${i + 1}`;
    const habtitDiv = document.querySelectorAll(`.${classDiv}`);

    habtitDiv.forEach((elem) => {
      elem.classList.remove(classDiv);
      elem.classList.add(`${listHabits[i].split(' ')[0]}${i}`);
    });
  }
}

function removeCurrentHabit(currentHabit, calendar) {
  const indexHabit = calendar.habits.indexOf(currentHabit);
  const lengthHabit = calendar.habits.length;

  if (indexHabit > -1) {
    deleteDiv(indexHabit, calendar);
    calendar.deleteHabits(indexHabit);
    changeClass(indexHabit, calendar);
  }

  popUpDelete.style.display = 'none';
  div.style.width = '0';

  if (indexHabit === lengthHabit - 1) {
    return calendar.habits.length > 0 ? calendar.habits[indexHabit - 1] : '';
  }

  return calendar.habits.length > 0 ? calendar.habits[indexHabit] : '';
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
  // Open popUp add and delete habit
  addSetHabit.addEventListener('click', () => {
    div.style.width = '100vw';
    popUpAdd.style.display = 'flex';
  });

  deleteNavHabit.addEventListener('click', () => {
    div.style.width = '100vw';
    popUpDelete.style.display = 'flex';
  });

  // show and close list habit
  listNavHabit.addEventListener('click', () => {
    if (flagListHabit === 0) {
      listHolder.style.display = 'block';
      flagListHabit = 1;
    } else {
      listHolder.style.display = 'none';
      flagListHabit = 0;
    }
  });

  // Close popUp add nad delete habit
  removePopUp.forEach((elem) => {
    elem.addEventListener('click', () => {
      popUpAdd.style.display = 'none';
      popUpDelete.style.display = 'none';
      div.style.width = '0';
    });
  });

  // Open and Close Navigation
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
    flagListHabit = 0;
  });

  addStyle(div);
  document.body.appendChild(div);
}

export { initNav, addHabit, removeCurrentHabit, validateNewHabit };
