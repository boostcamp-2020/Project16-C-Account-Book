export const createStore = () => {
  const store = {
    AccountBooks: [],
    Create: false,
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
