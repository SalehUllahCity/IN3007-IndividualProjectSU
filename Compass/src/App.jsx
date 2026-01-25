import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import './App.css'


function App() {

  return (
      <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
        <Dashboard />

      </div>
       
    
    
  )
}

export default App

