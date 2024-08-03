import Accounts from "@/pages/dashboard/Accounts";
import CategoryRoom from "@/pages/dashboard/CategoryRoom";
import Dashboard from "@/pages/dashboard/Dashboard";
import Products from "@/pages/dashboard/Products";
import Room from "@/pages/dashboard/Room";
import Staff from "@/pages/dashboard/Staff";
import DetailRoom from "@/pages/DetailRoom";
import Homepage from "@/pages/Homepage";
import ListRoomm from "@/pages/ListRoomm";
import LoginPage from "@/pages/LoginPage";

const publicRoute = [
    { path: "/login", page: LoginPage },
    { path: "/", page: Homepage },
    { path: "/list-room", page: ListRoomm },
    { path: "/list-room/:category_id", page: DetailRoom },
];

const dashboardRoute = [
    { path: "/dashboard", page: Dashboard },
    { path: "/rooms", page: Room },
    { path: "/staff", page: Staff },
    { path: "/products", page: Products },
    { path: "/accounts", page: Accounts },
    { path: "/category-room", page: CategoryRoom },
];

export { publicRoute, dashboardRoute };
