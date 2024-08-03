import PropTypes from "prop-types";
import { RiDashboardLine } from "react-icons/ri";

export default function DashboardLayout({ children }) {
    const menus = [
        { name: "Thống kê - báo cáo", icon: <RiDashboardLine />, link: "" },
        { name: "Check In-Out", icon: <RiDashboardLine />, link: "" },
        { name: "Quản lý phòng", icon: <RiDashboardLine />, link: "/rooms" },
        {
            name: "Quản lý thể loại phòng",
            icon: <RiDashboardLine />,
            link: "/category-room",
        },
        { name: "Quản lý khách hàng", icon: <RiDashboardLine />, link: "" },
        {
            name: "Quản lý nhân viên",
            icon: <RiDashboardLine />,
            link: "/staff",
        },
        {
            name: "Quản lý tài khoản",
            icon: <RiDashboardLine />,
            link: "/accounts",
        },
        {
            name: "Quản lý cơ sở vật chất",
            icon: <RiDashboardLine />,
            link: "/products",
        },
        { name: "Lịch sử đặt phòng", icon: <RiDashboardLine />, link: "" },
    ];
    return (
        <div className="flex h-screen">
            <nav className="basis-1/5 flex flex-col gap-5 border-r py-5 bg-slate-50 h-full">
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
                    {menus.map((menu, i) => (
                        <li
                            className="li_content flex items-center gap-2"
                            key={i}
                        >
                            <div>{menu.icon}</div>
                            <a href={menu.link}>{menu.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            <section className="basis-4/5 py-5 px-10 w-full h-full">
                {children}
            </section>
        </div>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
