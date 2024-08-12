import axios from "axios";
import { useEffect, useState } from "react";

export default function ClientHistory() {
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ giá trị tìm kiếm

    const getHistory = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/bookings/history")
            .then((response) => setHistory(response.data.bookings))
            .catch((err) => console.error(err));
    };

    function convertToDateString(isoString) {
        const date = new Date(isoString);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        getHistory();
    }, []);

    // Lọc danh sách history dựa trên searchTerm
    const filteredHistory = history.filter((item) =>
        item?.order?.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl uppercase text-center font-bold">
                Lịch sử phòng đặt
            </h1>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Tìm kiếm tên khách hàng"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm khi người dùng nhập
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Ngày nhận phòng</th>
                            <th>Ngày trả phòng</th>
                            <th>Phòng</th>
                            <th>Tên khách hàng</th>
                            <th>Liên hệ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistory.map((item, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>
                                    {convertToDateString(
                                        item?.booking_details[0]?.check_in
                                    )}
                                </td>
                                <td>
                                    {convertToDateString(
                                        item?.booking_details[0]?.check_out
                                    )}
                                </td>
                                <td>
                                    {item?.booking_details[0]?.room?.room_no}
                                </td>
                                <td>{item?.order?.fullname}</td>

                                <td>{item?.order?.phone_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
