import Booking from "@/pages/Booking";
import BookingDetail from "@/pages/BookingDetail";
import BookingSuccess from "@/pages/BookingSuccess";
import Accounts from "@/pages/dashboard/Accounts";
import CategoryRoom from "@/pages/dashboard/CategoryRoom";
import ClientHistory from "@/pages/dashboard/ClientHistory";
import Dashboard from "@/pages/dashboard/Dashboard";
import EmptyRoom from "@/pages/dashboard/EmptyRoom";
import ListRoomByCategories from "@/pages/dashboard/ListRoomByCategories";
import Products from "@/pages/dashboard/Products";
import RequestRoom from "@/pages/dashboard/RequestRoom";
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
    { path: "/booking", page: Booking },
    { path: "/booking/:id", page: BookingDetail },
    { path: "/success", page: BookingSuccess },
];

const dashboardRoute = [
    { path: "/dashboard", page: Dashboard },
    { path: "/rooms", page: Room },
    { path: "/staff", page: Staff },
    { path: "/products", page: Products },
    { path: "/accounts", page: Accounts },
    { path: "/category-room", page: CategoryRoom },
    { path: "/category-room/:id/rooms", page: ListRoomByCategories },
    { path: "/request", page: RequestRoom },
    { path: "/history", page: ClientHistory },
    { path: "/room-empty", page: EmptyRoom },
];

export { publicRoute, dashboardRoute };
