import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check if user can access another user's profile
  const canAccessProfile = (profileUserId) => {
    if (!user) return false;
    return user.id === profileUserId; // Users can only access their own profile
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
    canAccessProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
