import React from "react";
import Background from "./HomePageComponents/Background";
import Hero from "./HomePageComponents/Hero";
import GamesHolder from "./HomePageComponents/GamesHolder";
import {useFeaturedGames, useCreateLenis} from "./HomePageComponents/HelperFunctions";


function HomePage() 
{
    const games = useFeaturedGames();
    useCreateLenis();
    return (
<>
      <Background />
      <main className="relative -mt-auto">
        <Hero />
        <GamesHolder title="Featured Games" games={games}/>
      </main>
    </>

    );
}

export default HomePage;