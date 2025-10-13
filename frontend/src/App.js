// Todo: fix the god damn re-rendering issue on login

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import { useEffect } from 'react';
import AppRoutes from './AppRoutes';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    localStorage.setItem("isLoggedIn", false);
    //setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");

 
  return (
    <div className="bg-gray-900 min-h-screen">
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;

        })}



        {/*<Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />*/}
      </Routes>
    </div>
  );
}

export default App;
