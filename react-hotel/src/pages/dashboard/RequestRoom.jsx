import axios from "axios";
import { useState, useEffect } from "react";
import { RiEyeLine, RiCloseLargeLine } from "react-icons/ri";

export default function RequestRoom() {
    const [data, setData] = useState([]);
    const [check, setCheck] = useState("");
    const [detail, setDetail] = useState({});
    const getListRoom = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/orders`)
            .then((response) => setData(response.data.orders))
            .catch((error) => console.error(error));
    };

    const handleDetailBooking = async (id) => {
        await axios
            .get(`http://127.0.0.1:8000/api/orders/${id}`)
            .then((response) => setDetail(response.data))
            .catch((error) => console.error(error));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return dateString.split("T")[0];
    };

    useEffect(() => {
        getListRoom();
    }, []);
    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl uppercase text-center">
                Yêu cầu đặt phòng chưa xác nhận
            </h1>
            <div className="drawer drawer-end">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    <label
                        htmlFor="my-drawer-4"
                        className="drawer-button btn"
                        onClick={() => setCheck("add")}
                    >
                        Đặt phòng
                    </label>
                </div>

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
                            {data.map((item, i) => (
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
                                            <label
                                                htmlFor="my-drawer-4"
                                                className="drawer-button"
                                                onClick={() => {
                                                    setCheck("update");
                                                    handleDetailBooking(
                                                        item?.id
                                                    );
                                                }}
                                            >
                                                <RiEyeLine
                                                    className="hover:text-blue-500 cursor-pointer"
                                                    size={16}
                                                />
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="drawer-side z-40">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="bg-white text-base-content min-h-full w-[600px] p-4">
                        {/* Button close */}
                        <li className="flex justify-end mb-4">
                            <label
                                htmlFor="my-drawer-4"
                                className="btn-ghost cursor-pointer hover:bg-white"
                            >
                                <RiCloseLargeLine />
                            </label>
                        </li>
                        {/* Sidebar content here */}
                        {check === "add" ? (
                            <div className="flex flex-col gap-3">
                                <h1 className="font-bold">Đặt phòng</h1>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Họ tên khách hàng
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Số điện thoại
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Căn cước công dân
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Loại phòng
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Thời gian checkin
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Thời gian checkout
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                    />
                                </label>

                                <button className="btn btn-accent mt-4">
                                    Xác nhận
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <h1 className="font-bold">Đặt phòng</h1>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Họ tên khách hàng
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                        value={detail?.fullname}
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Số điện thoại
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                        value={detail?.phone_number}
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Căn cước công dân
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                        value={detail?.citizen_number}
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                        value={detail?.email}
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Loại phòng
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Thời gian nhận phòng
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                        value={formatDate(detail?.start_date)}
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Thời gian trả phòng
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                        value={formatDate(detail?.end_date)}
                                    />
                                </label>

                                <div className="text-center ">
                                    <button className="btn btn-accent mt-4">
                                        Chấp nhận
                                    </button>
                                    <button className="btn btn-error mt-4 ml-4">
                                        Hủy bỏ
                                    </button>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
