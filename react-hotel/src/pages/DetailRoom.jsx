import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailRoom() {
    const [room, setRoom] = useState({});
    const { category_id } = useParams();

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                await axios
                    .get(`http://127.0.0.1:8000/api/categories/${category_id}`)
                    .then((response) => setRoom(response.data))
                    .catch((error) => console.error(error));
            } catch (error) {
                console.error("Error fetching room:", error);
            }
        };
        fetchRoom();
    }, [category_id]);

    return (
        <div className="px-28 flex flex-col gap-5 mb-10">
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>
                        <a href="/">Trang chủ</a>
                    </li>
                    <li>
                        <a href="/list-room">Danh sách phòng</a>
                    </li>
                    <li>
                        <a>{room?.name}</a>
                    </li>
                </ul>
            </div>

            <div className="text-center text-[40px] font-semibold">
                {room?.name}
            </div>

            <div className="grid grid-cols-2 gap-5 items-center">
                <div className="object-center object-cover w-full ">
                    <img
                        className="rounded-xl w-full h-full"
                        src={"http://127.0.0.1:8000" + room?.image}
                        alt={room?.name}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <div className="border-b">
                        <b>Thông tin phòng</b>
                        <p>
                            <b>Kích thước</b>: {room?.size} m2
                        </p>
                        <p>
                            <b>Sức chứa</b>: {room?.max_occupancy} người/phòng
                        </p>
                    </div>

                    <div className="">
                        <b>Chi tiết phòng</b>
                        <p>{room?.description}</p>
                    </div>

                    <a
                        href={`/booking/${category_id}`}
                        className="btn btn-primary w-full"
                    >
                        Đặt phòng ngay
                    </a>
                </div>
            </div>
        </div>
    );
}
