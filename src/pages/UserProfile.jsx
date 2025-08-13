import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

      
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            {user.image && (
              <img
                src={user.image}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-purple-200"
              />
            )}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">@{user.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Email</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Phone</h3>
              <p className="text-gray-600">{user.phone || 'Not provided'}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Gender</h3>
              <p className="text-gray-600 capitalize">{user.gender || 'Not specified'}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Birth Date</h3>
              <p className="text-gray-600">{user.birthDate || 'Not provided'}</p>
            </div>
          </div>

          {/* Additional User Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">User ID</h3>
            <p className="text-gray-600">#{user.id}</p>
          </div>
        </div>

  
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/products')}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
            >
              View Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
