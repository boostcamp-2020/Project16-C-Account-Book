import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { storeContext } from './context';

const Search: React.FC = () => {
  const store = React.useContext(storeContext);
  if (!store) throw Error("Store shouldn't be null");

  const { query, setQuery } = store;

  return useObserver(() => {
    return (
      <input value={query.get()} onChange={e => setQuery(e.target.value)} />
    );
  });
};

export default Search;
