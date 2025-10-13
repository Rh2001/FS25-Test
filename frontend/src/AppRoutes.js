// Cleaner routing configuration

import HomePage from "./Components/HomePage";
import Login from "./Components/Login";

const AppRoutes = [
    {
        path: "/",
        element: <HomePage />
    },
    { 
        path: "/login",
        element: <Login />
    }]
export default AppRoutes;