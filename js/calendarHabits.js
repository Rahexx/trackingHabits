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
    // It stores months result of each habit
    this.monthsResult = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.renderCalendar();
  }

  setCurrentHabit(newHabit) {
    this.currentHabits = newHabit;
  }

  getCurrentHabit() {
    return this.currentHabits;
  }

  // update array value  sumResultHabits
  updateSumHabits(sum) {
    const indexHabit = this.habits.indexOf(this.currentHabits);
    if (indexHabit > -1) this.sumResultHabits[indexHabit] = sum;
  }

  updateMonthsValues(value, month) {
    const indexHabit = this.habits.indexOf(this.currentHabits);
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

    for (let i = 0; i < 12; i++) {
      const div = document.createElement('div');
      const days = this.renderDay();
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

export default CalendarHabits;
