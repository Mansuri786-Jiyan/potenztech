import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/products" className="text-xl font-bold text-purple-600">
              MyApp
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Products
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <span className="text-gray-600 text-sm">
                  Welcome, {user.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-purple-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
