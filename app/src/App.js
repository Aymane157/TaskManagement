import Login from './pages/login.jsx';
import React from 'react';
import Register from './pages/register.jsx';
import {Routes, Route} from 'react-router-dom'
import Index from './pages/index.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './index.css';
import { Toaster } from "react-hot-toast"
function App() {
  return (
    <>
     <Toaster position="bottom-right" reverseOrder={false} />
    <Routes>
            <Route path="/" element={<Login/>}/>
            
            <Route path="/register" element={<Register/>}/>
            <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        }
      />
        </Routes></>
  );
}

export default App;
