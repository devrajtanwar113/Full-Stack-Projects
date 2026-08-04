import React,{useState} from 'react';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const Login=()=>{
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const {login}=useAuth();
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    const success=login(username,password);
    if(success){
      navigate('/dashboard');
    }else{
      setError('Invalid username or password');
    }
  };

  return(
    <div className="login-container">
      <div className="login-box">
        <h2>🔐 Login</h2>
        {error&&<div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter username" required/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required/>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="hint"><small>Hint: admin / password</small></div>
      </div>
    </div>
  );
};

export default Login;