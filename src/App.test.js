import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

test('click on add to cart & wish button', () => {
  render(<App />)
  
  // cart
  const valueCart = screen.getByTestId('cart-num').textContent
  expect(valueCart).toEqual('0')
  let button = screen.getByTestId('btn-cart1')
  fireEvent.click(button)
  const valueCart2 = screen.getByTestId('cart-num').textContent
  expect(valueCart2).toEqual('1')

  // wish
  const valueWish = screen.getByTestId('wish-num').textContent
  expect(valueWish).toEqual('0')
  button = screen.getByTestId('btn-wish1')
  fireEvent.click(button)
  const valueWish2 = screen.getByTestId('wish-num').textContent
  expect(valueWish2).toEqual('1')
});
