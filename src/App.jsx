import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

// Enhanced PrivateRoute component with loading state and redirect handling
function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login with the attempted location
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Public route component (only accessible when NOT logged in)
function PublicRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // If user is already logged in, redirect to products page
  if (user) {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes - redirect to /products if already logged in */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Navigate to="/login" replace />
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />

          {/* Protected routes - require authentication */}
          <Route 
            path="/products" 
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/products/:id" 
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            } 
          />

          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Page not found</p>
                  <button 
                    onClick={() => window.history.back()}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
