import PropTypes from "prop-types";
import {
    RiDashboardLine,
    RiBarChart2Fill,
    RiEditBoxFill,
    RiPhoneCameraLine,
    RiSoundModuleFill,
    RiUserFill,
    RiUser2Fill,
    RiArchiveDrawerLine,
    RiArchive2Line,
    RiLogoutBoxLine,
    RiCalendarCheckFill,
    RiCalendarCloseFill,
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
            icon: <RiCalendarCheckFill />,
            link: "/check-in",
        },
        {
            name: "Check out ",
            icon: <RiCalendarCloseFill />,
            link: "/check-out",
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
            name: "Quản lý khách hàng",
            icon: <RiUserFill />,
            link: "/manage-client",
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
        "Quản lý khách hàng",
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
                </ul>
            </nav>
            <section className="basis-4/5 py-5 px-10 h-full overflow-auto">
                <div className="flex justify-end mb-3">
                    <div
                        className="cursor-pointer uppercase font-bold flex items-center gap-2 group"
                        onClick={() => {
                            localStorage.removeItem("user");
                            window.location.href = "/";
                        }}
                    >
                        <a className="text-red-600 group-hover:text-blue-600">
                            Đăng xuất
                        </a>
                        <p className="text-red-600 group-hover:text-blue-600 ">
                            <RiLogoutBoxLine />
                        </p>
                    </div>
                </div>
                {children}
            </section>
            <Toaster />
        </div>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
