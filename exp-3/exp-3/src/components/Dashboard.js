import React from 'react';
import {useAuth} from '../context/AuthContext';

const Dashboard=()=>{
  const {user,logout}=useAuth();

  if(!user){
    return <div>Please login to view this page.</div>;
  }

  return(
    <div className="dashboard">
      <h1>Welcome, {user.username}! 👋</h1>
      <div className="user-info">
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Token:</strong> {localStorage.getItem('token')?.substring(0,30)}...</p>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;