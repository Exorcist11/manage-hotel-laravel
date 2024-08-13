import PropTypes from "prop-types";
import {
    RiDashboardLine,
    RiBarChart2Fill,
    RiEditBoxFill,
    RiPhoneCameraLine,
    RiSoundModuleFill,
    RiUserFill,
    RiUser5Line,
    RiUser2Fill,
    RiArchiveDrawerLine,
    RiArchive2Line,
    RiLogoutBoxLine,
} from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }) {
    const info = JSON.parse(localStorage.getItem("user"));
    const menus = [
        {
            name: "Thống kê - báo cáo",
            icon: <RiBarChart2Fill />,
            link: "/dashboard",
        },
        {
            name: "Quản lý đặt phòng",
            icon: <RiEditBoxFill />,
            link: "/request",
        },
        { name: "Quản lý phòng", icon: <RiPhoneCameraLine />, link: "/rooms" },
        {
            name: "Quản lý thể loại phòng",
            icon: <RiSoundModuleFill />,
            link: "/category-room",
        },
        {
            name: "Check IN ",
            icon: <RiUser5Line />,
            link: "/check-in",
        },
        {
            name: "Check out ",
            icon: <RiUser5Line />,
            link: "/check-out",
        },
        {
            name: "Thanh toán",
            icon: <RiUser5Line />,
            link: "/payment",
        },
        {
            name: "Quản lý nhân viên",
            icon: <RiUser2Fill />,
            link: "/staff",
        },
        {
            name: "Quản lý tài khoản",
            icon: <RiUserFill />,
            link: "/accounts",
        },
        {
            name: "Quản lý dịch vụ",
            icon: <RiArchiveDrawerLine />,
            link: "/products",
        },
        {
            name: "Danh sách phòng trống",
            icon: <RiArchive2Line />,
            link: "/room-empty",
        },
        {
            name: "Lịch sử đặt phòng",
            icon: <RiDashboardLine />,
            link: "/history",
        },
    ];

    const restrictedMenusForEmployee = [
        "Quản lý phòng",
        "Quản lý thể loại phòng",
        "Quản lý nhân viên",
        "Quản lý tài khoản",
        "Quản lý dịch vụ",
    ];
    const location = useLocation();

    const filteredMenus = menus.filter((menu) => {
        if (info?.role === "Nhân viên") {
            return !restrictedMenusForEmployee.includes(menu.name);
        }
        return true;
    });
    return (
        <div className="flex h-screen">
            <nav className="basis-1/5 flex flex-col gap-5 border-r py-5 bg-[#e2dfd4] h-full">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <img
                        src="/images/muong-thanh-logo.png"
                        alt="logo"
                        className="object-cover object-center w-40"
                    />
                    <h1 className="uppercase font-bold text-center text-xl">
                        Muong Thanh Hotel
                    </h1>
                </div>
                <ul className="px-5 flex flex-col gap-5">
                    {filteredMenus.map((menu, i) => {
                        const isActive = location.pathname === menu.link;

                        return (
                            <li
                                className={`li_content ${
                                    isActive ? "active" : ""
                                }`}
                                key={i}
                            >
                                <a
                                    href={menu.link}
                                    className={`flex items-center gap-2 ${
                                        isActive
                                            ? "text-red-800"
                                            : "text-blue-600"
                                    }`}
                                >
                                    <div>{menu.icon}</div>
                                    {menu.name}
                                </a>
                            </li>
                        );
                    })}
                    <li
                        className="li_content flex items-center gap-2"
                        onClick={() => {
                            localStorage.removeItem("user");
                            window.location.href = "/";
                        }}
                    >
                        <div className="text-blue-600">
                            <RiLogoutBoxLine />
                        </div>
                        <a className="text-blue-600">Đăng xuất</a>
                    </li>
                </ul>
            </nav>
            <section className="basis-4/5 py-5 px-10 h-full overflow-auto">
                {children}
            </section>
            <Toaster />
        </div>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
