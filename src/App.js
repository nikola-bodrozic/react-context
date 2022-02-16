import React from 'react';
import './App.css';

import Shop from './comp/shop';
import Header from './comp/header';
import Map from './comp/map';

import CartContextProvider from './context/CartContext';

function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <Header />
        <Shop />
        <Map />
      </CartContextProvider>
    </div>
  );
}

export default App;