import axios from "axios";
import { useEffect, useState } from "react";
import { RiEyeLine } from "react-icons/ri";

export default function CheckOut() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    const getRoom = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/booking-check-out")
            .then((response) => {
                const sortedRooms = response.data.booking_detail.sort(
                    (a, b) => {
                        return (
                            new Date(a.booking.order.start_date) -
                            new Date(b.booking.order.start_date)
                        );
                    }
                );
                setRooms(sortedRooms);
                setFilteredRooms(sortedRooms);
            })
            .catch((error) => console.error(error));
    };

    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        return `${day}/${month}/${year}`;
    }

    function handleDateChange(e) {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);

        const filtered = rooms.filter(
            (room) =>
                new Date(room.booking.order.start_date)
                    .toISOString()
                    .split("T")[0] === selectedDate
        );
        setFilteredRooms(filtered);
    }

    useEffect(() => {
        getRoom();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl text-center uppercase">
                DANH SÁCH PHÒNG CHECK OUT
            </h1>

            <div className="flex justify-center my-4">
                <input
                    type="date"
                    className="input input-bordered min-w-[300px]"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>

            <div className="overflow-x-auto">
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
                        {filteredRooms.length > 0 ? (
                            filteredRooms?.map((item, i) => (
                                <tr key={i}>
                                    <td>{item?.room?.room_no}</td>
                                    <td>{item?.booking?.order?.fullname}</td>
                                    <td>
                                        {item?.booking?.order?.phone_number}
                                    </td>
                                    <td>{item?.booking?.order?.status}</td>
                                    <td>
                                        {formatDate(
                                            item?.booking?.order?.start_date
                                        )}
                                    </td>
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
                            ))
                        ) : (
                            <tr>
                                <td>Danh sách trống</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
