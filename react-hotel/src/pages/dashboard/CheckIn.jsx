import axios from "axios";
import { useEffect, useState } from "react";
import { RiEyeLine } from "react-icons/ri";

export default function CheckIn() {
    const [rooms, setRooms] = useState([]);
    const getRoom = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/bookings")
            .then((response) => setRooms(response.data))
            .catch((error) => console.error(error));
    };
    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        return `${day}/${month}/${year}`;
    }

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
                            <th>Phòng</th>
                            <th>Tên khách</th>
                            <th>Số điện thoại</th>

                            <th>Trạng thái</th>
                            <th>Ngày đặt</th>
                            <th width="10%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms?.map((item, i) => (
                            <tr key={i}>
                                <td>{item?.booking_details?.status}</td>
                                <td>{item?.order?.fullname}</td>
                                <td>{item?.order?.phone_number}</td>

                                <td>{item?.order?.status}</td>
                                <td>{formatDate(item?.order?.start_date)}</td>
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
