import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-white text-xl font-bold animate-pulse">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/30 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-shrink-0 w-full md:w-72 flex flex-col items-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-64 h-64 object-cover rounded-2xl shadow-lg border border-white/40 mb-4"
          />
          <span className="bg-gradient-to-tr from-pink-400 to-purple-400 text-white text-lg font-bold px-5 py-2 rounded-full shadow-lg backdrop-blur-md -mt-6">${product.price}</span>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight flex items-center gap-2">
            <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0h6"/></svg>
            {product.title}
          </h1>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-sm text-gray-500 bg-white/60 px-3 py-1 rounded-xl shadow-sm">
              <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              In stock
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500 bg-white/60 px-3 py-1 rounded-xl shadow-sm">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M12 4v16"/><path d="M4 12h16"/></svg>
              ID: {product.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
