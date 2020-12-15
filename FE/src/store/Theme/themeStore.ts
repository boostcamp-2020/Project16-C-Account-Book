export const createStore = () => {
  const store = {
    mode: localStorage.getItem('theme'),

    changeMode() {
      if (this.mode === 'dark') {
        this.mode = 'light';
        localStorage.setItem('theme', 'light');
        return;
      }

      this.mode = 'dark';
      localStorage.setItem('theme', 'dark');
    },
  };
  return store;
};

export type TStore = ReturnType<typeof createStore>;
