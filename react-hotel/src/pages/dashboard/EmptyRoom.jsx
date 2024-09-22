import axios from "axios";
import { useEffect, useState } from "react";

export default function EmptyRoom() {
    const now = new Date();
    const [rooms, setRooms] = useState([]);
    const [time, setTime] = useState({
        start_date: now.toISOString().split("T")[0],
        end_date: now.toISOString().split("T")[0],
    });
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastIndex = itemsPerPage * currentPage;
    const firstIndex = lastIndex - itemsPerPage;
    const records = rooms
        ?.filter((cs) =>
            cs.room_no.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(firstIndex, lastIndex);
    const npage = Math.ceil(rooms.length / itemsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const [minDate, setMinDate] = useState("");

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTime((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const getRoom = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/empty-rooms",
                {
                    params: {
                        from: time.start_date,
                        to: time.end_date,
                    },
                }
            );

            setRooms(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchRoom = async () => {
        await getRoom();
    };

    useEffect(() => {
        getRoom();
        const currentDate = getCurrentDate();
        setMinDate(currentDate);
    }, [time.start_date, time.end_date]);

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold uppercase">
                Danh sách phòng trống
            </h1>

            <div className="flex gap-5 items-end">
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="number"
                        className="grow"
                        placeholder="Tìm kiếm phòng"
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

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">
                            Từ ngày <span className="text-red-500">*</span>
                        </span>
                    </div>
                    <input
                        type="date"
                        name="start_date"
                        onChange={handleChange}
                        min={minDate}
                        value={time.start_date}
                        className="input input-bordered w-full "
                    />
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">
                            Đến ngày <span className="text-red-500">*</span>
                        </span>
                    </div>
                    <input
                        type="date"
                        name="end_date"
                        onChange={handleChange}
                        min={time.start_date}
                        value={time.end_date}
                        className="input input-bordered w-full "
                    />
                </label>

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text"></span>
                    </div>
                    <button className="btn" onClick={handleSearchRoom}>
                        Tìm kiếm
                    </button>
                </label>
            </div>

            <table className="table ">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Phòng</th>
                        <th>Tầng</th>
                        <th>Loại phòng</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((item, index) => (
                        <tr key={index}>
                            <th>
                                {index + 1 + itemsPerPage * (currentPage - 1)}
                            </th>
                            <th>
                                <b>{item?.room_no}</b>
                            </th>
                            <td>{item?.floor}</td>
                            <td>{item?.category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center justify-end mt-5 gap-5">
                <p className="font-semibold text-xs">
                    Showing {firstIndex + 1}-{lastIndex} of {rooms.length}
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
