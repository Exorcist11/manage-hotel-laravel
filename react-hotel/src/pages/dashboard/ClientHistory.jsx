import axios from "axios";
import { useEffect, useState } from "react";
import { RiEyeLine } from "react-icons/ri";

export default function ClientHistory() {
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredHistory = history.filter((item) =>
        item?.order?.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastIndex = itemsPerPage * currentPage;
    const firstIndex = lastIndex - itemsPerPage;
    const records = filteredHistory.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredHistory.length / itemsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

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
                        onChange={(e) => setSearchTerm(e.target.value)} 
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((item, index) => (
                            <tr key={index}>
                                <th>
                                    {index +
                                        1 +
                                        itemsPerPage * (currentPage - 1)}
                                </th>
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

                                <td>{item?.order?.phone}</td>
                                <td className="text-center">
                                    <a
                                        className="tooltip"
                                        data-tip="Xem chi tiết"
                                        href={`/detail-bill/${item.booking_details[0]?.bill?.id}`}
                                    >
                                        <RiEyeLine
                                            className="hover:text-green-500 cursor-pointer "
                                            size={16}
                                        />{" "}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-end mt-5 gap-5">
                <p className="font-semibold text-xs">
                    Showing {firstIndex + 1}-{lastIndex} of{" "}
                    {filteredHistory.length}
                </p>

                <div className="join">
                    {numbers.map((n, i) => (
                        <button
                            className={`join-item btn  btn-sm ${
                                currentPage === n ? "btn-active" : ""
                            }`}
                            onClick={() => setCurrentPage(n)}
                            key={i}
                        >
                            {n}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
