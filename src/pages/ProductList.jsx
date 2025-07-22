// File: src/pages/ProductList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearch, setCategory, setSort } from '../store/filtersSlice';
import { toggleFavourite } from '../store/favouritesSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const { search, category, sort } = useSelector((state) => state.filters);
  const favourites = useSelector((state) => state.favourites);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  const filtered = items
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => (category === 'all' ? true : item.category === category))
    .sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      if (sort === 'desc') return b.price - a.price;
      return 0;
    });

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading products.</p>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-1/3 border rounded-lg px-4 py-2"
          value={search}
          onChange={handleSearchChange}
        />

        <select
          value={category}
          onChange={handleCategoryChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="all">All Categories</option>
          {[...new Set(items.map((item) => item.category))].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={handleSortChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="default">Sort</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => {
          const isFavourited = favourites.find((f) => f.id === product.id);

          return (
            <div
              key={product.id}
              className="border rounded-xl shadow p-4 flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mx-auto mb-3"
              />
              <h3 className="text-sm font-medium truncate mb-1">{product.title}</h3>
              <p className="text-gray-700 font-semibold mb-2">${product.price}</p>
              <div className="flex justify-between items-center mt-auto">
                <Link
                  to={`/product/${product.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details
                </Link>
                <button
                  onClick={() => dispatch(toggleFavourite(product))}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    isFavourited ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {isFavourited ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
