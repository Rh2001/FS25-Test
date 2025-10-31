// index.js or main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import router
import App from './App';
import './index.css';
import Navbar from './Components/Global/Navbar';
import Footer from './Components/Global/Footer';
import ScrollToTop from './Components/GlobalFunctions/ScrollTop';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* App will be wrapped here */}
    <ScrollToTop behavior = "auto"/>  {/* This is a bugfix to scroll to top after each routing*/}
    <div className="flex flex-col min-h-screen">            
        <Navbar />
        <main className="flex-1 min-h-0">                            
          <App />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
