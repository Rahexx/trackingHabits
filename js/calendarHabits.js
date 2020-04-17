class CalendarHabits {
  constructor(habitsName, habits) {
    this.habits = habits;
    this.currentHabits = habitsName;
    this.months = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecieć',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień',
    ];
    // It stores the sum of all months of each habit
    this.sumResultHabits = [0];
    this.renderCalendar();
  }

  setCurrentHabit(newHabit) {
    this.currentHabits = newHabit;
  }

  getCurrentHabit() {
    return this.currentHabits;
  }

  getHabits() {
    return this.habits;
  }

  getIndexCurrentHabit() {
    return this.habits.indexOf(this.getCurrentHabit());
  }

  // update array value  sumResultHabits
  setSumHabits(sum) {
    const indexHabit = this.habits.indexOf(this.getCurrentHabit());
    if (indexHabit > -1) this.sumResultHabits[indexHabit] = sum;
  }

  getSumHabits() {
    const indexHabit = this.habits.indexOf(this.getCurrentHabit());
    return this.sumResultHabits[indexHabit];
  }

  setMonthsValues(value, month) {
    const indexHabit = this.habits.indexOf(this.getCurrentHabit());
    const indexMonth = this.months.indexOf(month);
    if (indexHabit > -1 && indexMonth > -1) this.monthsResult[indexHabit][indexMonth] = value;
  }

  renderDay() {
    this.textDays = '';

    for (let j = 1; j < 32; j++) {
      this.textDays += `<li>Dzień miesiąca ${j} <span></span></li>`;
    }

    return this.textDays;
  }

  renderCalendar() {
    const calendar = document.querySelector('main .calendar .monthsHolder');
    if (this.currentHabits === '') calendar.innerHTML = '';
    else {
      for (let i = 0; i < 12; i++) {
        const days = this.renderDay();
        const div = document.createElement('div');
        const firstWord = this.getCurrentHabit().split(' ')[0];
        div.classList.add(`${firstWord}${this.getIndexCurrentHabit()}`);
        div.innerHTML += `
        <div>
        <p class="month">${this.months[i]} <span class='monthsResult'>0/30</span></p>
        <div class="listDays">
            <ul>
              ${days}
            </ul>
            </div>
          </div>
        `;

        calendar.appendChild(div);
      }
    }
  }
}

export default CalendarHabits;
