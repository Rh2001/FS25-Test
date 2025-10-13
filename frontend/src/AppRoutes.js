// Cleaner routing configuration

import HomePage from "./HomePage";
import Login from "./Login";

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