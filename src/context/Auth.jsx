import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/apiservice";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Register function
  const register = async (data) => {
    try {
      const { username, email, password } = data;
      const response = await api.post("auth/register", { username, email, password });
      const { user, token } = response;

      localStorage.setItem("authToken", token);
      setUser(user);
      navigateBasedOnRole(user.role);
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post("auth/login", { email, password });
      const { user, token } = response;

      localStorage.setItem("authToken", token);
      setUser(user);
      navigateBasedOnRole(user.role);
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("auth/logout");
      setUser(null);
      localStorage.removeItem("authToken");
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error.message);
      throw error;
    }
  };

  // Navigate based on user role
  const navigateBasedOnRole = (role) => {
    if (role === "admin" || role === "Admin") navigate("/adminpanel");
    else if (role === "manager"||role === "Manager") navigate("/managerpanel");
    else if (role === "staff"||role === "Staff") navigate("/staffpanel");
    else if (role === "user"||role === "User") navigate("/nopanel");
    else navigate("/");
  };

  // Fetch current user after component mounts
  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get("auth/currentUser");
      setUser(response); // Set user state
    } catch (error) {
      console.error("Fetch current user error:", error.message);
      logout(); // Clear invalid token and reset state
    } finally {
      setLoading(false); // Ensure loading is false after the check
    }
  };

  // Effect to handle navigation based on user state
  useEffect(() => {
    if (user && !loading) {
      navigateBasedOnRole(user.role); // Navigate to the appropriate panel
    }
  }, [user]); // Dependencies include `user`, `loading`, and `navigate`

  // Fetch current user on mount
  useEffect(() => {
    fetchCurrentUser();
  }, []); // Empty array ensures this runs only once

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
