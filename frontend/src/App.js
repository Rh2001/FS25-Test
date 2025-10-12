import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import './index.css';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
