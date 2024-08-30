import axios from "axios";
import { useEffect, useState } from "react";
import { RiEyeLine } from "react-icons/ri";

export default function Client() {
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastIndex = itemsPerPage * currentPage;
    const firstIndex = lastIndex - itemsPerPage;
    const records = list.slice(firstIndex, lastIndex);
    const npage = Math.ceil(list.length / itemsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const getList = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/orders/group-by-citizen")
            .then((res) => setList(res.data.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div>
            <h1 className="text-center text-2xl font-bold uppercase mb-5">
                Danh sách khách hàng
            </h1>

            <label className="input input-bordered flex items-center gap-2 mb-5">
                <input
                    type="text"
                    className="grow"
                    placeholder="Tìm kiếm thông tin khách hàng"
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
            <div className="overflow-x-auto">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records
                            ?.filter((cs) =>
                                cs.fullname
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            )
                            ?.map((item, index) => (
                                <tr key={index}>
                                    <th>
                                        {index +
                                            1 +
                                            itemsPerPage * (currentPage - 1)}
                                    </th>
                                    <td>{item?.fullname}</td>
                                    <td>{item?.phone}</td>
                                    <td>{item?.email}</td>
                                    <td className="text-center">
                                        <a
                                            className="tooltip"
                                            data-tip="Xem chi tiết"
                                            href={`/detail-history/${item.citizen_number}`}
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
                <div className="flex items-center justify-end mt-5 gap-5">
                    <p className="font-semibold text-xs">
                        Showing {firstIndex + 1}-{lastIndex} of {list.length}
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
        </div>
    );
}
