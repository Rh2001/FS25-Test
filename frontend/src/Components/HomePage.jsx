import React from "react";
import Hero from "./HomePageComponents/Hero";
import GamesHolder from "./HomePageComponents/GamesHolder";
import {useFeaturedGames} from "./GlobalFunctions/HelperFunctions";
import Space02 from "./HomePageComponents/Assets/Space02.jpg";


function HomePage() 
{
    const games = useFeaturedGames();
    return (
<>
     <main
  className="relative -mt-auto bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${Space02})` }}
>
              
        <Hero />
        <GamesHolder title="Featured Games" games={games}/>
      </main>
    </>

    );
}

export default HomePage;