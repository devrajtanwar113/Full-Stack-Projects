import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './App.css';

const ProtectedRoute=({children})=>{
  const {user}=useAuth();
  return user?children:<Navigate to="/login"/>;
};

function App(){
  return(
    <Router>
      <AuthProvider>
        <Navbar/>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path="/" element={<Navigate to="/dashboard"/>}/>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;