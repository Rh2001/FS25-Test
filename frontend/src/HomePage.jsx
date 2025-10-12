import React from "react";
import "./HomePage.css";
import { useNavigate } from 'react-router-dom';

const featuredGames = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    price: "$19.99",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
  },
  {
    id: 2,
    title: "Elden Ring",
    price: "$39.99",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
  },
  {
    id: 3,
    title: "Red Dead Redemption 2",
    price: "$29.99",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
  },
];

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="container">
     
      <header className="navbar">
        <h1 className="logo">Bokhar Store</h1>
        <nav>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/login')}>Login</button>
          <button>Store</button>
          <button>Contact</button>
         
        </nav>
      </header>

      
      <section className="hero">
        <div className="hero-overlay">
          <h2>🔥 Hot Steam Deals</h2>
          <p>Buy Steam CD Keys at unbeatable prices. Instant delivery. Secure checkout.</p>
          <button className="btn-primary">Browse Store</button>
        </div>
      </section>

    
      <section className="featured-section">
        <h3>🔥 Featured Games</h3>
        <div className="games-grid">
          {featuredGames.map((game) => (
            <div key={game.id} className="game-card">
              <img src={game.image} alt={game.title} />
              <div className="game-info">
                <h4>{game.title}</h4>
                <p className="price">{game.price}</p>
                <button className="btn-primary">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

     
      <footer className="footer">
        &copy; {new Date().getFullYear()} Bokhar Store - Roham Harandifasih. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;
