import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-lg bg-white/20 border-b border-white/30 shadow-lg px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left Links */}
      <div className="flex gap-6">
        <Link
          to="/products"
          className="text-white font-semibold hover:text-pink-300 transition"
        >
          Products
        </Link>
        <Link
          to="/profile"
          className="text-white font-semibold hover:text-pink-300 transition"
        >
          Profile
        </Link>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 transform hover:scale-[1.03] transition-all duration-300"
      >
        Logout
      </button>
    </nav>
  );
}
