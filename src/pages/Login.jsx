import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      login(data);
      
      // Redirect to intended page or default to products
      const from = location.state?.from?.pathname || "/products";
      navigate(from, { replace: true });
    } catch {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setUsername("emilys");
    setPassword("emilyspass");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-white/80 text-center mb-6">
          Login to access your dashboard
        </p>

        {/* Sample Credentials Info */}
        <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/70 text-sm mb-2">Sample credentials for testing:</p>
          <p className="text-white text-xs">Username: emilys | Password: emilyspass</p>
          <p className="text-white text-xs">Username: michaelw | Password: michaelwpass</p>
          <p className="text-white text-xs">Username: sophiab | Password: sophiabpass</p>
        </div>

        {error && (
          <p className="bg-red-500 text-white py-2 px-3 rounded-md text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-white font-medium mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg bg-white/80 focus:bg-white text-gray-800 border border-gray-300 focus:ring-4 focus:ring-purple-400 outline-none transition"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-white font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-white/80 focus:bg-white text-gray-800 border border-gray-300 focus:ring-4 focus:ring-purple-400 outline-none transition"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Demo Login Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="w-full mt-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium py-2 rounded-lg shadow hover:from-gray-600 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Use Demo Credentials
        </button>
      </div>
    </div>
  );
}
