// Cleaner routing configuration

import AstroMan from "./Components/AstroMan";
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
      path: "/store/game/:id", 
      element : <StorePage />
    },
    {
        path: "/astro",
        element : <AstroMan/>
    }

]
export default AppRoutes;