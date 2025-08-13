import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{width: 'fit-content'}}>
              {products.map(product => (
                <div key={product.id} className="flex-none w-64 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <Link
                    key={product.id}
                    to={`/products/{product.id}`}
                    className="group bg-white/30 border border-white/30 rounded-2xl shadow-xl p-5 flex flex-col items-center backdrop-blur-xl transition-transform hover:scale-105 hover:shadow-2xl hover:bg-white/50 duration-300 w-full sm:w-[320px] md:w-[300px] lg:w-[280px]"
                  >
                    <div className="relative w-full flex justify-center">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-40 w-full object-cover rounded-xl shadow-md border border-white/40 group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-gradient-to-tr from-pink-400 to-purple-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md">Price: &#8377;{product.price}</span>
                    </div>
                    <h2 className="font-bold text-lg text-gray-800 mt-4 mb-1 text-center group-hover:text-purple-600 transition-colors tracking-tight">
                      {product.title}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0h6"/></svg>
                      <span>In stock</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        {/* Horizontal Product Carousel */}
        {!loading && (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{width: 'fit-content'}}>
              {products.map(product => (
                <div key={product.id} className="flex-none w-64 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <Link to={`/products/${product.id}`} className="block">
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-semibold text-gray-900">
                          Price: &#8377;{product.price}
                        </span>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-500">In stock</span>
                        </div>
                      </div>
                      
                      <h3 className="text-base font-medium text-gray-800 mb-1 line-clamp-2">
                        {product.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600">
                        ID: {product.id}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            
            <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700">
              {page}
            </span>
            
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
