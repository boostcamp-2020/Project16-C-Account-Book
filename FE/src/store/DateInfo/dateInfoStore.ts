export const createStore = () => {
  const store = {
    nowCalendarInfo: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: '',
    },

    setCalendarInfo(year: number, month: number) {
      this.nowCalendarInfo = {
        ...this.nowCalendarInfo,
        year,
        month,
      };
    },
  };
  return store;
};

export type TStore = ReturnType<typeof createStore>;
