import favouritesReducer, { toggleFavourite } from '../store/favouritesSlice';

describe('favouritesSlice', () => {
  const product = { id: 1, title: 'Test Product' };

  it('should add a product to favourites', () => {
    const state = favouritesReducer([], toggleFavourite(product));
    expect(state).toHaveLength(1);
    expect(state[0].id).toBe(1);
  });

  it('should remove a product if it already exists', () => {
    const state = favouritesReducer([product], toggleFavourite(product));
    expect(state).toHaveLength(0);
  });
});