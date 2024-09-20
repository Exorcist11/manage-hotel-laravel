import { ClearForm } from "@/middleware/ClearForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { RiEyeLine, RiCloseLine } from "react-icons/ri";
import { MultiSelect } from "react-multi-select-component";

import { toast } from "sonner";

export default function RequestRoom() {
    const [data, setData] = useState([]);
    const [detail, setDetail] = useState(null);
    const [categories, setCategories] = useState([]);
    const [minDate, setMinDate] = useState("");
    const [type, setType] = useState("Tất cả");
    const [emptyRoom, setEmptyRoom] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const [selected, setSelected] = useState([]);
    const now = new Date();

    const [form, setForm] = useState({
        fullname: "",
        gender: "male",
        phone: "",
        citizen_number: "",
        email: "",
        category_id: "1",
        number_of_rooms: "1",
        start_date: now,
        end_date: "",
        staff_id: currentUser.id,
        room_id: "",
    });

    const options = emptyRoom?.map((item) => ({
        label: item.room_no,
        value: item.id,
    }));

    const filterData = () => {
        if (type === "Tất cả") {
            return data;
        }
        return data.filter((item) => item.status === type);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const lastIndex = itemsPerPage * currentPage;
    const firstIndex = lastIndex - itemsPerPage;
    const records = filterData()
        ? filterData().slice(firstIndex, lastIndex)
        : [];
    const npage = filterData()
        ? Math.ceil(filterData().length / itemsPerPage)
        : 0;
    const numbers = npage > 0 ? [...Array(npage + 1).keys()].slice(1) : [];

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedValue = value;

        setForm((prevState) => ({
            ...prevState,
            [name]: updatedValue,
        }));
    };

    const getListRoom = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/orders"
            );

            setData(response.data.all_orders);
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
            .patch(`http://127.0.0.1:8000/api/orders/${detail?.id}/reject`, {
                status: "Từ chối",
            })
            .then((response) => {
                toast.success(response.data.message);
                getListRoom();
                document.getElementById("my-drawer-4").checked = false;
            })
            .catch((error) => console.error(error));
    };

    const handleBookingRoom = async () => {
        if (
            !form.fullname ||
            !form.phone ||
            !form.start_date ||
            !form.end_date
        ) {
            toast.error("Vui lòng nhập đủ thông tin");
            return;
        }

        try {
            await axios
                .post("http://127.0.0.1:8000/api/booking-at-counter", form)
                .then((res) => console.log(res));
            ClearForm();
            toast.success("Đặt phòng thành công");
            getListRoom();
            document.getElementById("booking_at_counter").close();
        } catch (error) {
            console.error(error);
            toast.error("Failed to book the room");
        }
    };

    const handleAccept = async () => {
        if (selected?.length !== detail.number_of_rooms) {
            toast.error(
                `Vui lòng chọn đúng số lượng phòng: ${detail.num_of_room}`
            );
            return;
        }
        await axios
            .post(`http://127.0.0.1:8000/api/bookings`, {
                order_id: detail.id,
                staff_id: currentUser.id,
                rooms: selected.map((room) => ({ id: room.value })),
            })
            .then((response) => {
                toast.error(response.data.message);
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

    const getEmptyRoom = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/empty-rooms-category`,
                {
                    params: {
                        category_id: form?.category_id,
                        from: form.start_date,
                        to: form.end_date,
                    },
                }
            );
            setEmptyRoom(response.data.data);
        } catch (error) {
            console.error("Failed to fetch empty rooms:", error);
        }
    };

    const checkDetailRoomEmpty = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/empty-rooms-category`,
                {
                    params: {
                        category_id: detail?.category_id,
                        from: detail?.start_date,
                        to: detail?.end_date,
                    },
                }
            );
            setEmptyRoom(response.data.data);
        } catch (error) {
            console.error("Failed to fetch empty rooms:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getListRoom();
                await getCategoryRoom();
                if (form.start_date && form.end_date) {
                    await getEmptyRoom();
                }
                if (detail?.start_date && detail?.end_date) {
                    await checkDetailRoomEmpty();
                }

                const currentDate = getCurrentDate();
                setMinDate(currentDate);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [
        form.start_date,
        form.end_date,
        form.category_id,
        detail?.end_date,
        detail?.start_date,
    ]);
    console.log(detail);

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl uppercase text-center">
                Danh sách yêu cầu
            </h1>
            <div className="drawer drawer-end">
                <div className="flex justify-between">
                    <label
                        className=" btn"
                        onClick={() =>
                            document
                                .getElementById("booking_at_counter")
                                .showModal()
                        }
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
                        <option value={"Chấp nhận"}>Chấp nhận</option>
                        <option value={"Từ chối"}>Từ chối</option>
                    </select>
                </div>

                <div className="overflow-x-auto mt-5">
                    <table className="table " width="100%">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên khách</th>
                                <th>Số điện thoại</th>
                                <th>Số lượng phòng</th>
                                <th>Trạng thái</th>
                                <th width="10%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData()?.length > 0 ? (
                                records?.map((item, i) => (
                                    <tr key={i}>
                                        <th>
                                            {i +
                                                1 +
                                                itemsPerPage *
                                                    (currentPage - 1)}
                                        </th>
                                        <td>{item?.fullname}</td>
                                        <td>{item?.phone}</td>
                                        <td>{item?.number_of_rooms}</td>
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
                                                    className="drawer-button cursor-pointer"
                                                    onClick={() => {
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

                                            <div className="drawer-side z-40">
                                                <label
                                                    htmlFor="my-drawer-4"
                                                    aria-label="close sidebar"
                                                    className="drawer-overlay"
                                                ></label>
                                                <ul className="bg-white text-base-content min-h-full w-[700px] p-4">
                                                    <li className="flex justify-end mb-4">
                                                        <label
                                                            htmlFor="my-drawer-4"
                                                            className="btn-ghost cursor-pointer hover:bg-white"
                                                        >
                                                            <RiCloseLine
                                                                size={24}
                                                            />
                                                        </label>
                                                    </li>

                                                    <div className="flex flex-col gap-3">
                                                        <h1 className="font-bold">
                                                            Đặt phòng
                                                        </h1>
                                                        <label className="form-control w-full">
                                                            <div className="label">
                                                                <span className="label-text">
                                                                    Họ tên khách
                                                                    hàng
                                                                </span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                placeholder="Type here"
                                                                className="input input-bordered w-full"
                                                                disabled
                                                                defaultValue={
                                                                    detail?.fullname ||
                                                                    ""
                                                                }
                                                            />
                                                        </label>

                                                        <label className="form-control w-full">
                                                            <div className="label">
                                                                <span className="label-text">
                                                                    Căn cước
                                                                    công dân
                                                                </span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                placeholder="Type here"
                                                                className="input input-bordered w-full"
                                                                defaultValue={
                                                                    detail?.citizen_number ||
                                                                    ""
                                                                }
                                                            />
                                                        </label>

                                                        <div className="flex gap-5">
                                                            <label className="form-control w-full">
                                                                <div className="label">
                                                                    <span className="label-text">
                                                                        Số điện
                                                                        thoại
                                                                    </span>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Type here"
                                                                    className="input input-bordered w-full"
                                                                    defaultValue={
                                                                        detail?.phone ||
                                                                        ""
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
                                                                    defaultValue={
                                                                        detail?.email ||
                                                                        ""
                                                                    }
                                                                />
                                                            </label>
                                                        </div>

                                                        <div className="flex gap-5">
                                                            <label className="form-control w-full">
                                                                <div className="label">
                                                                    <span className="label-text">
                                                                        Thời
                                                                        gian
                                                                        nhận
                                                                        phòng
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
                                                                        Thời
                                                                        gian trả
                                                                        phòng
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
                                                        </div>

                                                        <div className="flex gap-5">
                                                            <label className="form-control w-full">
                                                                <div className="label">
                                                                    <span className="label-text">
                                                                        Loại
                                                                        phòng
                                                                    </span>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Type here"
                                                                    className="input input-bordered w-full"
                                                                    defaultValue={
                                                                        detail
                                                                            ?.category
                                                                            .name ||
                                                                        ""
                                                                    }
                                                                />
                                                            </label>

                                                            <label className="form-control w-full">
                                                                <div className="label">
                                                                    <span className="label-text">
                                                                        Danh
                                                                        sách
                                                                        phòng
                                                                        trống
                                                                    </span>
                                                                </div>
                                                                <MultiSelect
                                                                    options={
                                                                        options
                                                                    }
                                                                    value={
                                                                        selected
                                                                    }
                                                                    onChange={
                                                                        setSelected
                                                                    }
                                                                    labelledBy={
                                                                        "Select"
                                                                    }
                                                                    isCreatable={
                                                                        true
                                                                    }
                                                                />
                                                            </label>
                                                        </div>

                                                        {!(
                                                            detail?.status ===
                                                                "Đặt tại quầy" ||
                                                            detail?.status ===
                                                                "Từ chối" ||
                                                            detail?.status ===
                                                                "Chấp nhận"
                                                        ) && (
                                                            <div className="text-center">
                                                                <button
                                                                    className="btn btn-accent mt-4"
                                                                    onClick={
                                                                        handleAccept
                                                                    }
                                                                >
                                                                    Đặt phòng
                                                                </button>

                                                                <button
                                                                    className="btn btn-error mt-4 ml-4"
                                                                    onClick={
                                                                        handleReject
                                                                    }
                                                                >
                                                                    Từ chối
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>Không có dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <dialog id="booking_at_counter" className="modal">
                    <div className="modal-box max-w-5xl">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">
                            Đặt phòng tại quầy
                        </h3>
                        <div className="py-4">
                            <div className="flex flex-col gap-3">
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
                                        name="phone"
                                        onChange={handleChange}
                                        value={form.phone}
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

                                <div className="flex gap-5">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">
                                                Thời gian checkin
                                            </span>
                                        </div>
                                        <input
                                            disabled
                                            type="date"
                                            name="start_date"
                                            value={minDate}
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
                                </div>

                                <div className="flex gap-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">
                                                Loại phòng
                                            </span>
                                        </div>
                                        <select
                                            className="select select-bordered w-full "
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
                                                Danh sách phòng trống
                                            </span>
                                        </div>

                                        <select
                                            className="select select-bordered w-full "
                                            name="room_id"
                                            onChange={handleChange}
                                        >
                                            <option disabled selected>
                                                Chọn phòng
                                            </option>
                                            {emptyRoom?.map((item, index) => (
                                                <option
                                                    value={item?.id}
                                                    key={index}
                                                >
                                                    {item.room_no}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                <button
                                    className="btn btn-accent mt-4"
                                    onClick={handleBookingRoom}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>

            <div className="flex items-center justify-end mt-5 gap-5">
                <p className="font-semibold text-xs">
                    Showing {firstIndex + 1}-{lastIndex} of{" "}
                    {filterData()?.length}
                </p>

                <div className="join">
                    {numbers?.map((n, i) => (
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
