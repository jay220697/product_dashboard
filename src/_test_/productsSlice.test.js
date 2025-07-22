import productsReducer, {
  setProducts,
  setStatus,
  setError,
} from '../store/productsSlice';

describe('productsSlice reducer', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
  };

  it('should return the initial state when passed an unknown action', () => {
    const result = productsReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('should handle setProducts', () => {
    const products = [{ id: 1, title: 'Sample Product' }];
    const result = productsReducer(initialState, setProducts(products));
    expect(result.items).toEqual(products);
    expect(result.items.length).toBe(1);
  });

  it('should handle setStatus', () => {
    const result = productsReducer(initialState, setStatus('loading'));
    expect(result.status).toBe('loading');
  });

  it('should handle setError', () => {
    const result = productsReducer(initialState, setError('Failed to load'));
    expect(result.error).toBe('Failed to load');
  });
});
