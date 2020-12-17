export const createStore = () => {
  const store = {
    mode: localStorage.getItem('theme'),

    changeMode() {
      if (this.mode === 'dark') {
        this.mode = 'light';
        localStorage.setItem('theme', 'light');
        document.getElementById('root')?.style.backgroundColor = 'white';
        return;
      }

      this.mode = 'dark';
      localStorage.setItem('theme', 'dark');
      document.getElementById('root')?.style.backgroundColor = '#111111';
    },
  };
  return store;
};

export type TStore = ReturnType<typeof createStore>;
