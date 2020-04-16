class CalendarHabits {
  constructor(habitsName, habits) {
    this.habitsName = habitsName;
    this.habits = habits;
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

    this.renderCalendar();
  }

  renderDay() {
    let textDays = '';

    for (let j = 1; j < 32; j++) {
      textDays += `<li>Dzień miesiąca ${j} <span></span></li>`;
    }

    return textDays;
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
