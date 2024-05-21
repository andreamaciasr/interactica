import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <Link to="" onClick={handleLogout}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
