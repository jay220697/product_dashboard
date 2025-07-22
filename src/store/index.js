import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import filtersReducer from './filtersSlice';
import favouritesReducer from './favouritesSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    favourites: favouritesReducer,
  },
});