import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Favourites from './pages/Favourites';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from './store/productsSlice';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-4">
        <Link to="/">Home</Link>
        <Link to="/favourites">Favourites</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}
