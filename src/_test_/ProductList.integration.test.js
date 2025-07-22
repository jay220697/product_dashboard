// __tests__/ProductList.integration.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import store from '../store/store';
import { setProducts } from '../store/productsSlice';

const sampleProducts = [
  { id: 1, title: 'Red Shirt', category: 'clothing', price: 29.99, image: '', description: '' },
  { id: 2, title: 'Blue Pants', category: 'clothing', price: 49.99, image: '', description: '' },
];

test('search filters products correctly', () => {
  store.dispatch(setProducts(sampleProducts));

  render(
    <Provider store={store}>
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    </Provider>
  );

  const input = screen.getByPlaceholderText(/search products/i);
  fireEvent.change(input, { target: { value: 'red' } });

  expect(screen.getByText(/Red Shirt/i)).toBeInTheDocument();
  expect(screen.queryByText(/Blue Pants/i)).not.toBeInTheDocument();
});
