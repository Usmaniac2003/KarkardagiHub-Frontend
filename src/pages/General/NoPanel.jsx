import React from 'react'
import { useAuth } from '../../context/Auth';

function NoPanel() {
  const { user, logout, loading } = useAuth();
  const logOut = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      You are yet to be assigned a role.
      <button
        onClick={logOut}
        className="text-2xl text-red-300 font-extrabold p-6 border-black"
      >
        Logout
      </button>
    </div>
  )
}

export default NoPanel
