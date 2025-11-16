import GameContainer from "./StorePageComponents/GameContainer";
import { useStoreGames } from "./GlobalFunctions/HelperFunctions";
import Hero from "./StorePageComponents/Hero";

function StorePage() 
{
    const games = useStoreGames();
   
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