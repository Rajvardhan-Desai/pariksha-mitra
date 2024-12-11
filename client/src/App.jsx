import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
import { Box } from '@mui/material';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Box>
  );
};

export default App;
