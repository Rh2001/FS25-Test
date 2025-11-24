// Cleaner routing configuration

import HomePage from "./Components/HomePage";
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
      path: "/store/game/:id", element : <StorePage />
    }

]
export default AppRoutes;