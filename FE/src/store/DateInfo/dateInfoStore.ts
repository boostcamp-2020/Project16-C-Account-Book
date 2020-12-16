export const createStore = () => {
  const store = {
    nowCalendarInfo: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: 1,
    },

    setCalendarInfo(year: number, month: number, day: number) {
      this.nowCalendarInfo = {
        ...this.nowCalendarInfo,
        year,
        month,
        day,
      };
    },
  };
  return store;
};

export type TStore = ReturnType<typeof createStore>;
