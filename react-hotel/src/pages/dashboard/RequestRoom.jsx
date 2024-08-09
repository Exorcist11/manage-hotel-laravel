import axios from "axios";
import { useState, useEffect } from "react";
import { RiEyeLine, RiCloseLine } from "react-icons/ri";

export default function RequestRoom() {
    const [data, setData] = useState([]);
    const [check, setCheck] = useState("");
    const [detail, setDetail] = useState({});
    const [categories, setCategories] = useState([]);
    const [minDate, setMinDate] = useState("");
    const [type, setType] = useState("Tất cả");
    const [form, setForm] = useState({
        fullname: "",
        gender: "male",
        phone_number: "",
        citizen_number: "",
        email: "",
        category_id: "1",
        number_of_rooms: "",
        start_date: "2024-08-03",
        end_date: "2024-08-03",
        staff_id: 1,
    });

    const filterData = () => {
        if (type === "Tất cả") {
            return data;
        }
        return data.filter((item) => item.status === type);
    };

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const getListRoom = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/orders"
            );
            setData(response.data.orders);
        } catch (error) {
            console.error(error);
        }
    };

    const getCategoryRoom = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error(err));
    };

    const handleReject = async () => {
        await axios
            .patch(`http://127.0.0.1:8000/api/orders/${detail?.id}`, {
                status: "Từ chối",
            })
            .then((response) => {
                alert(response.data.message);
                getListRoom();
                document.getElementById("my-drawer-4").checked = false;
            })
            .catch((error) => console.error(error));
    };

    const handleBookingRoom = async () => {
        await axios
            .post("http://127.0.0.1:8000/api/booking-at-counter", form)
            .then(() => {
                alert("Đặt phòng thành công");
                getListRoom();
                document.getElementById("my-drawer-4").checked = false;
            })
            .catch((error) => console.error(error));
    };

    const handleAccept = async () => {
        await axios
            .patch(`http://127.0.0.1:8000/api/orders/${detail?.id}`, {
                status: "Được chấp nhận",
                staff_id: "1",
            })
            .then((response) => {
                alert(response.data.message);
                getListRoom();
                document.getElementById("my-drawer-4").checked = false;
            })
            .catch((error) => console.error(error));
    };

    const handleDetailBooking = async (id) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/orders/${id}`
            );
            setDetail(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return dateString.split("T")[0];
    };

    useEffect(() => {
        getListRoom();
        getCategoryRoom();
        const currentDate = getCurrentDate();
        setMinDate(currentDate);
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl uppercase text-center">
                Danh sách yêu cầu
            </h1>
            <div className="drawer drawer-end">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex justify-between">
                    <label
                        htmlFor="my-drawer-4"
                        className="drawer-button btn"
                        onClick={() => {
                            setCheck("add");
                            setDetail({});
                        }}
                    >
                        Đặt phòng tại quầy
                    </label>

                    <select
                        className="select select-bordered w-full max-w-xs"
                        name="type_of_order"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option selected value={"Tất cả"}>
                            Tất cả
                        </option>
                        <option value={"Đang chờ xử lý"}>Đang chờ xử lý</option>
                        <option value={"Đặt tại quầy"}>Đặt tại quầy</option>
                        <option value={"Từ chối"}>Từ chối</option>
                    </select>
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
                            {filterData()?.map((item, i) => (
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
                                <RiCloseLine size={24} />
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
                                        placeholder="Họ và tên"
                                        name="fullname"
                                        onChange={handleChange}
                                        defaultValue={form.fullname}
                                        className="input input-bordered w-full"
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
                                        placeholder="Số điện thoại"
                                        name="phone_number"
                                        onChange={handleChange}
                                        value={form.phone_number}
                                        className="input input-bordered w-full"
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
                                        name="citizen_number"
                                        onChange={handleChange}
                                        placeholder="Căn cước công dân"
                                        defaultValue={form.citizen_number}
                                        className="input input-bordered w-full"
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
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleChange}
                                        defaultValue={form.email}
                                        className="input input-bordered w-full"
                                    />
                                </label>

                                <div className="flex gap-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">
                                                Loại phòng
                                            </span>
                                        </div>
                                        <select
                                            className="select select-bordered w-full max-w-xs"
                                            name="category_id"
                                            onChange={handleChange}
                                        >
                                            <option disabled selected>
                                                Chọn loại phòng
                                            </option>
                                            {categories?.map((item, index) => (
                                                <option
                                                    value={item.id}
                                                    key={index}
                                                >
                                                    {item?.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">
                                                Số lượng phòng
                                            </span>
                                        </div>
                                        <select
                                            className="select select-bordered w-full max-w-xs"
                                            name="number_of_rooms"
                                            onChange={handleChange}
                                        >
                                            <option disabled selected>
                                                0 phòng
                                            </option>
                                            <option value={"1"}>1 phòng</option>
                                            <option value={"2"}>2 phòng</option>
                                            <option value={"3"}>3 phòng</option>
                                            <option value={"4"}>4 phòng</option>
                                        </select>
                                    </label>
                                </div>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Thời gian checkin
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        placeholder="Type here"
                                        name="start_date"
                                        min={minDate}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
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
                                        onChange={handleChange}
                                        name="end_date"
                                        min={minDate}
                                        className="input input-bordered w-full"
                                    />
                                </label>

                                <button
                                    className="btn btn-accent mt-4"
                                    onClick={handleBookingRoom}
                                >
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
                                        className="input input-bordered w-full"
                                        disabled
                                        defaultValue={detail?.fullname || ""}
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
                                        className="input input-bordered w-full"
                                        defaultValue={
                                            detail?.phone_number || ""
                                        }
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
                                        className="input input-bordered w-full"
                                        defaultValue={
                                            detail?.citizen_number || ""
                                        }
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
                                        className="input input-bordered w-full"
                                        defaultValue={detail?.email || ""}
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
                                        className="input input-bordered w-full"
                                        defaultValue={detail?.category_id || ""}
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
                                        className="input input-bordered w-full"
                                        defaultValue={formatDate(
                                            detail?.start_date
                                        )}
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
                                        className="input input-bordered w-full"
                                        defaultValue={formatDate(
                                            detail?.end_date
                                        )}
                                    />
                                </label>

                                {detail.status !== "Đặt tại quầy" && (
                                    <div className="text-center ">
                                        <button
                                            className="btn btn-accent mt-4"
                                            onClick={handleAccept}
                                        >
                                            Chấp nhận
                                        </button>

                                        <button
                                            className="btn btn-error mt-4 ml-4"
                                            onClick={handleReject}
                                        >
                                            Từ chối
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
