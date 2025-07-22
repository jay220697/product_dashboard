import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavourite } from '../store/favouritesSlice';

export default function Favourites() {
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  if (favourites.length === 0) {
    return <p className="text-center p-6 text-gray-500">No favourite products yet.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Favourites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favourites.map((product) => (
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
                className="bg-red-500 text-white px-2 py-1 text-xs rounded-full hover:bg-red-600"
              >
                Remove ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
