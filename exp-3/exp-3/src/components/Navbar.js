import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Navbar=()=>{
  const {user,logout}=useAuth();

  return(
    <nav className="navbar">
      <div className="nav-brand">JWT Auth Demo</div>
      <div className="nav-links">
        {user?(
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={logout}>Logout</button>
          </>
        ):(
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;