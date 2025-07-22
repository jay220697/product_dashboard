import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import store from '../store/store';
import { setProducts } from '../store/productsSlice';

const mockProducts = [
  { id: 1, title: 'iPhone 13', category: 'electronics', price: 999, image: '', description: '' },
  { id: 2, title: 'T-Shirt', category: 'clothing', price: 19.99, image: '', description: '' },
];

describe('ProductList Page', () => {
  beforeEach(() => {
    store.dispatch(setProducts(mockProducts));
  });

  test('renders search input and dropdowns', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductList />
        </Router>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')).toHaveLength(2); // category & sort
  });

  test('renders product cards from store', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductList />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/iphone 13/i)).toBeInTheDocument();
    expect(screen.getByText(/t-shirt/i)).toBeInTheDocument();
  });

  test('search filters products', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductList />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/search products/i), {
      target: { value: 'iphone' },
    });

    expect(screen.getByText(/iphone 13/i)).toBeInTheDocument();
    expect(screen.queryByText(/t-shirt/i)).not.toBeInTheDocument();
  });
});
