export const createStore = () => {
  const store = {
    mode: 'dark',

    changeMode() {
      if (this.mode === 'dark') {
        this.mode = 'light';
        return;
      }

      this.mode = 'dark';
    },
  };
  return store;
};

export type TStore = ReturnType<typeof createStore>;
