// Cleaner routing configuration

import AstroMan from "./Components/AstroMan";
import GamePage from "./Components/GamePage";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import StorePage from "./Components/StorePage";


// Map routes to components
const AppRoutes = [
    {
        path: "/",
        element: <HomePage />
    },
    { 
        path: "/register",
        element: <Register />
    },
    {
        path: "/store" ,
        element: <StorePage />
    },
    {
        path: "/register",
        element: <Register />
    },

    {
      path: "/login",
      element: <Login />
    },
    {
        path: "/astro",
        element : <AstroMan/>
    },
    {
        path: "/store/:id",
        element: <GamePage/>
    }

]
export default AppRoutes;