// Cleaner routing configuration

import AstroMan from "./Components/AstroMan";
import GamePage from "./Components/GamePage";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import PaymentSuccess from "./Components/PaymentSuccess";
import GameManagement from "./Components/ProfileComponents/GameManagement";
import ProfilePage from "./Components/ProfilePage";
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
    },
    {
        path: "/profile",
        element: <ProfilePage/>
    },
    {
        path: "/admin/games",
        element: <GameManagement/>
    },
    {
        path: "/payment/success",
        element: <PaymentSuccess/>
    }

]
export default AppRoutes;