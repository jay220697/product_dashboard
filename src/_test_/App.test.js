import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import store from '../store/store';

describe('App routing and rendering', () => {
  test('renders the product list page by default', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
  });

  test('renders the favourites page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favourites']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/your favourites/i)).toBeInTheDocument();
  });

  test('renders the product detail page with invalid id', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/999']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/product not found/i)).toBeInTheDocument();
  });
});