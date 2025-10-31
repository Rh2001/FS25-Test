// Cleaner routing configuration

import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import StorePage from "./Components/StorePage";


// Map routes to components
const AppRoutes = [
    {
        path: "/",
        element: <HomePage />
    },
    { 
        path: "/login",
        element: <Login />
    },
    {
        path: "/store" ,
        element: <StorePage />
    },
    {
      path: "/store/game/:id", element : <StorePage />
    }

]
export default AppRoutes;