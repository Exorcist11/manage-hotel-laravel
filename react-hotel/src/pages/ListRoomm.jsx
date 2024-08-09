import axios from "axios";
import { useEffect, useState } from "react";

export default function ListRoomm() {
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        try {
            await axios
                .get("http://127.0.0.1:8000/api/categories")
                .then((response) => setCategories(response.data))
                .catch((error) => error);
        } catch (error) {
            console.error("Error from fetch categories: " + error);
        }
    };
   
    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className="px-28 flex flex-col gap-5 mb-10">
            <div className="flex justify-center flex-col gap-2 text-center leading-tight border-y py-10">
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li>
                            <a>Trang chủ</a>
                        </li>
                        <li>
                            <a>Danh sách phòng</a>
                        </li>
                    </ul>
                </div>

                <h1 className="text-[40px]">Phòng nghỉ</h1>
                <p>
                    318 phòng ở rộng rãi với nội thất và tiện nghi sang trọng
                    bậc nhất hứa hẹn đem đến giây phút nghỉ ngơi thoải mái cho
                    khách hàng.
                </p>
                <p>
                    235 phòng tiêu chuẩn và 83 phòng cao cấp sở hữu tầm nhìn bao
                    quát toàn thành phố.
                </p>
                <p>
                    Nét truyền thống của Việt Nam điểm xuyết trong thiết kế nội
                    thất của hai công ty HBA và Wilson Associates.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
                {categories.map((item, index) => (
                    <div
                        className="card bg-base-100 shadow-xl cursor-pointer group"
                        key={index}
                    >
                        <figure className="overflow-hidden aspect-w-16 aspect-h-9">
                            <img
                                className="group-hover:scale-110 transition-transform duration-500 object-cover w-full h-full"
                                src={"http://127.0.0.1:8000" + item?.image}
                                alt={item?.name}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item?.name}</h2>

                            <div className="flex justify-start">
                                <p>
                                    Kích thước{" "}
                                    <strong>
                                        {item?.size}
                                        <span>
                                            m<sup>2</sup>
                                        </span>
                                    </strong>
                                </p>
                                <p>
                                    Sức chứa{" "}
                                    <strong>
                                        {item?.max_occupancy} người/phòng
                                    </strong>
                                </p>
                            </div>
                            <p>{item?.description}</p>
                            <div className="card-actions justify-end">
                                <a
                                    href={`/list-room/${item?.id}`}
                                    className="btn btn-warning"
                                >
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
