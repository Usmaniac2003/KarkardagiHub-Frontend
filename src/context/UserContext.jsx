// src/context/UserContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const UserContext = createContext(); // Explicit export

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // To store user data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    // Fetch the logged-in user's info when the app loads (e.g., from localStorage or an API)
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/me");  // Make a request to get user info
        setUser(response.data);  // Set the user data to state
      } catch (err) {
        setError(err.message);  // Handle error
      } finally {
        setLoading(false);  // Set loading to false after fetching user data
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => {
  return useContext(UserContext);
};
