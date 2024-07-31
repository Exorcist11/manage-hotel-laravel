import { useState } from "react";

export default function LoginPage() {
    const [user, setUser] = useState([]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const handleLogin = () => {
        alert(user.email);
    };
    return (
        <section className="px-20 w-full flex items-center justify-center bg-[#f2f2f2] main-section py-10">
            <div className="shadow-md sha rounded-xl bg-white flex items-center">
                <div>
                    <img
                        src="/images/brand_2_1556849374.jpg"
                        alt="brand2"
                        className="object-cover object-center"
                    />
                </div>

                <div className="p-10 flex flex-col gap-4">
                    <h3 className="text-3xl font-semibold">
                        Mường Thanh Management
                    </h3>
                    <p className="text-lg">
                        Chào mừng quay trở lại! Đăng nhập hệ thống quản lý khách
                        sạn Mường Thanh
                    </p>
                    <div className="flex flex-col gap-5">
                        <div className="border-b px-2 py-3 rounded-lg">
                            <input
                                type="text"
                                name="email"
                                placeholder="Tên đăng nhập"
                                className="outline-none w-full"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="border-b px-2 py-3 rounded-lg">
                            <input
                                type="password"
                                name="password"
                                placeholder="Mật khẩu"
                                className="outline-none w-full"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="bg-black text-white py-2 rounded-lg hover:opacity-85 w-full"
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
