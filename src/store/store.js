import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import favouritesReducer from './favouritesSlice';
import filtersReducer from './filtersSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    favourites: favouritesReducer,
    filters: filtersReducer,
  },
});

export default store;