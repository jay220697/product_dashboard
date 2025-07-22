import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavourite } from '../store/favouritesSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(id))
  );
  const isFavourited = useSelector((state) =>
    state.favourites.some((f) => f.id === parseInt(id))
  );

  if (!product) return <p className="text-center">Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline">← Back to Products</Link>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-green-600 mb-4">${product.price}</p>
          <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
          <button
            onClick={() => dispatch(toggleFavourite(product))}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isFavourited
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {isFavourited ? 'Remove from Favourites ❤️' : 'Add to Favourites 🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}
