import axios from "axios";
import { useEffect, useState } from "react";
import { RiEyeLine } from "react-icons/ri";

export default function CheckIn() {
    const [rooms, setRooms] = useState([]);
    const getRoom = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/orders")
            .then((response) => setRooms(response.data.accept_orders))
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getRoom();
    }, []);

    return (
        <div>
            <h1 className="font-bold text-2xl text-center uppercase">
                Phòng chưa check in
            </h1>
            <div className="overflow-x-auto mt-5">
                <table className="table table-zebra" width="100%">
                    <thead>
                        <tr>
                            <th>Tên khách</th>
                            <th>Số điện thoại</th>
                            <th>Loại phòng</th>
                            <th>Trạng thái</th>
                            <th width="10%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms?.map((item, i) => (
                            <tr key={i}>
                                <td>{item?.fullname}</td>
                                <td>{item?.phone_number}</td>
                                <td>{item?.category_id}</td>
                                <td>{item?.status}</td>
                                <td width="10%">
                                    <input
                                        id="my-drawer-4"
                                        type="checkbox"
                                        className="drawer-toggle"
                                    />
                                    <div className="drawer-content">
                                        <a
                                            className="tooltip"
                                            data-tip="Xem chi tiết"
                                            href={`/check-in/${item.id}`}
                                        >
                                            <RiEyeLine
                                                className="hover:text-blue-500 cursor-pointer "
                                                size={16}
                                            />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
