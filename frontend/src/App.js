// Todo: fix the god damn re-rendering issue on login

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import { useEffect } from 'react';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;

        })}
      </Routes>
    </div>
  );
}

export default App;
