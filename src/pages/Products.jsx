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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Products</h1>
        
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          
              <Link to={`/products/${product.id}`} className="block">
            
                <div className="relative">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <span className="absolute top-2 right-2 bg-gradient-to-tr from-pink-400 to-purple-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    ₹{product.price}
                  </span>
                </div>

           
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-500">In stock</span>
                    </div>
                    <span className="text-sm text-gray-400">ID: {product.id}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center items-center space-x-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <span className="px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg text-purple-700 font-medium">
            Page {page}
          </span>
          
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

     
    </div>
  );
}
