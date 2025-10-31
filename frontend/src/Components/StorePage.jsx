import GameContainer from "./StorePageComponents/GameContainer";
import { useStoreGames, useCreateLenis } from "./GlobalFunctions/HelperFunctions";
import Hero from "./HomePageComponents/Hero";

function StorePage() 
{
    const games = useStoreGames();
    useCreateLenis();
    return (
    <div>
        <main className="relative -mt-auto">
        <Hero />
        <GameContainer title = "Available Games" games = {games}/>
        </main>
        </div>
    );
}

export default StorePage;