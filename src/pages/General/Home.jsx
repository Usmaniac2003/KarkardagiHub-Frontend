import React, { useContext, useEffect } from 'react';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User:", user, "Loading:", loading);
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (!user) {
    return <div>No user found. Please log in.</div>; // Handle no user case
  }

  const logOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      Hello {user?.username}
      <button
        onClick={logOut}
        className="text-2xl text-red-300 font-extrabold p-6 border-black"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
