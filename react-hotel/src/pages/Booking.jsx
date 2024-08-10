import axios from "axios";
import { useEffect, useState } from "react";

export default function Booking() {
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className="mx-20">
            <div className="text-center bg-[#f9f9f9] py-6">
                <h2 className="font-bold text-2xl mb-5">
                    Khách sạn Mường Thanh Grand Hoàng Mai
                </h2>
                <p>5 sao | Khối Bắc Mỹ, Quỳnh Lưu, Nghệ An | 0238 3866 555</p>
            </div>

            <div className="flex flex-col gap-4 my-5">
                {categories.map((item, index) => (
                    <div
                        className="flex items-center border-b pb-5 gap-5"
                        key={index}
                    >
                        <div className="w-2/5 flex justify-center h-64">
                            <img
                                src={`http://127.0.0.1:8000${item.image}`}
                                alt="img romom"
                                className="object-cover object-center w-full h-full"
                            />
                        </div>
                        <div className="w-3/5 flex flex-col gap-3">
                            <h4 className="font-bold uppercase text-xl">
                                {item?.name}
                            </h4>
                            <p>
                                Kích thước phòng: {item?.size}{" "}
                                <span>
                                    m<sup>2</sup>
                                </span>
                            </p>
                            <p>Số người: {item?.max_occupancy} người</p>
                            <p>Hướng nhìn thành phố</p>
                            <div className="flex justify-end">
                                <a className="btn" href={`/booking/${item.id}`}>
                                    {parseInt(item?.price).toLocaleString(
                                        "vi-VN"
                                    )}{" "}
                                    VND
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
