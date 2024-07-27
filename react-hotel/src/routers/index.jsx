import Dashboard from "@/pages/dashboard/Dashboard";
import Room from "@/pages/dashboard/Room";
import Staff from "@/pages/dashboard/Staff";
import Homepage from "@/pages/Homepage";
import LoginPage from "@/pages/LoginPage";

const publicRoute = [
    { path: "/login", page: LoginPage },
    { path: "/", page: Homepage },
];

const dashboardRoute = [
    { path: "/dashboard", page: Dashboard },
    { path: "/rooms", page: Room },
    { path: "/staff", page: Staff },
];

export { publicRoute, dashboardRoute };
