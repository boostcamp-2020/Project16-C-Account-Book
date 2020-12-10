const CalculateDate = {
  monList: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dayList: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  today: new Date(),
  monForChange: new Date().getMonth(),
  activeDate: new Date(),

  getFirstDay: (yearInfo, monthInfo) => new Date(yearInfo, monthInfo, 1),
  getLastDay: (yearInfo, monthInfo) => new Date(yearInfo, monthInfo + 1, 0),

  nextMonth() {
    const d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.activeDate = d;
    return d;
  },
  prevMonth() {
    const d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.activeDate = d;
    return d;
  },
  addZero: num => (num < 10 ? `0${num}` : num),
  activeDTag: null,
  getIndex(node) {
    let index = 0;
    while ((node = node.previousElementSibling)) {
      index++;
    }
    return index;
  },

  getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  },
};

export default CalculateDate;
