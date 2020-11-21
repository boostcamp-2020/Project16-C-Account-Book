import React, { ReactElement } from 'react';
import Search from './search';
import CityList from './city';
import StoreProvider from './context';

const App: ReactElement = () => {
  return (
    <StoreProvider>
      <div className="App">
        <header className="App-header">
          <Search />
          <CityList />
        </header>
      </div>
    </StoreProvider>
  );
};

export default App;
