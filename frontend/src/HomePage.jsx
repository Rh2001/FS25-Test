import React from "react";
import "./HomePage.css";
import TestComponent from "./test";
import { useNavigate } from 'react-router-dom';

const steamFeaturedGames = [
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

const eaFeaturedGames = [
  {
    id: 1,
    title: "FIFA 23",
    price: "$24.99",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1811260/header.jpg",
  },
  {
    id: 2,
    title: "The Sims 4",
    price: "$4.99",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1222670/header.jpg",
  },
];

const battleNetFeaturedGames = [
  {
    id: 1,
    title: "Call of Duty: Modern Warfare II",
    price: "$39.99",
    image: "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltd31831eda9199937/62abc0df5cbe472513c0ce59/Cortez_Base_Game-Bnet_Game-Card_Feature-960x540.jpg?imwidth=1088&imdensity=1.25",
  },
  {
    id: 2,
    title: "Diablo IV",
    price: "$49.99",
    image: "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt7ee84e584fa45031/68476decee87fe2509b01798/DIA_DIV_Franchise_Sale_BNET_Shop_Banner_1600x500_LL01.png?imwidth=1568&imdensity=1.25",
  },
  {
    id: 3,
    title: "World of Warcraft",
    price: "Subscription based",
    image: "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt6a1db1b3c437a67d/68dd66e6459178c0108ada80/WoW_-_Midnight_-_Housing_Key_Art_-_Resize_Design_BnetShop_HeaderDesktop_1600x500.png?imwidth=1568&imdensity=1.25",
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
          <h2>🔥 Steaming Hot Deals</h2>
          <p>Buy Steam CD Keys at unbeatable prices. Instant delivery. Secure checkout.</p>
          <button className="btn-primary">Browse Store</button>
        </div>
      </section>

    
      <section className="featured-section">
        <h3>🔥 Featured Steam Games</h3>
        <div className="games-grid">
          {steamFeaturedGames.map((game) => (
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

      <section className="featured-section">
  <h3>🎮 EA App Deals</h3>
  <div className="games-grid">
    {eaFeaturedGames.map((game) => (
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

{/* Battle.net Games Section */}
<section className="featured-section">
  <h3>🎮 Battle.net Deals</h3>
  <div className="games-grid">
    {battleNetFeaturedGames.map((game) => (
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
        <TestComponent/>
      </footer>
    </div>
  );
}

export default HomePage;
