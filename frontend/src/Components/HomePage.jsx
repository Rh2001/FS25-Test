import React from "react";
import Hero from "./HomePageComponents/Hero";
import GamesHolder from "./HomePageComponents/GamesHolder";
import {useFeaturedGames} from "./GlobalFunctions/HelperFunctions";


function HomePage() 
{
    const games = useFeaturedGames();
    return (
<>
      <main className="relative -mt-auto">
        <Hero />
        <GamesHolder title="Featured Games" games={games}/>
      </main>
    </>

    );
}

export default HomePage;