import { observable } from 'mobx';

const Cities = ['Amsterdam', 'London', 'Madrid'];

export const createStore = () => {
  const store = {
    query: observable.box(''),
    setQuery(query: string) {
      store.query.set(query.toLowerCase());
    },
    get allCities() {
      return Cities;
    },
    get filteredCities() {
      return Cities.filter(city =>
        city.toLowerCase().includes(store.query.get()),
      );
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
