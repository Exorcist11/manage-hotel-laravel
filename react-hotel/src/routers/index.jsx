import Dashboard from "@/pages/dashboard/Dashboard";
import Room from "@/pages/dashboard/Room";
import Homepage from "@/pages/Homepage";
import LoginPage from "@/pages/LoginPage";

const publicRoute = [
    { path: "/login", page: LoginPage },
    { path: "/", page: Homepage },
];

const dashboardRoute = [
    { path: "/dashboard", page: Dashboard },
    { path: "/rooms", page: Room },
];

export { publicRoute, dashboardRoute };
