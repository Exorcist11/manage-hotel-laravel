import { fetcher } from "@/lib/fetcher";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { RiEyeLine, RiAddLargeLine } from "react-icons/ri";
import { toast } from "sonner";
import useSWR from "swr";

export default function CheckOut() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectOption, setSelectOption] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const { data, mutate: loadOpt } = useSWR(
        `http://127.0.0.1:8000/api/bookingDetails/${selectOption}/services`,
        fetcher
    );

    const handleAddService = async (service) => {
        try {
            const action = await axios.post(
                `http://127.0.0.1:8000/api/bookingDetails/${selectOption}/service`,
                {
                    id: service,
                }
            );
            if (action.data.success === true) {
                loadOpt();
                toast.success("Service added successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteService = async (service) => {
        try {
            const action = await axios.delete(
                `http://127.0.0.1:8000/api/bookingDetails/${selectOption}/service`,
                {
                    data: { id: service },
                }
            );

            if (action.data.success === true) {
                loadOpt();
                toast.success("Service delete successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                <table className="table " width="100%">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Phòng</th>
                            <th>Tên khách</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Ngày trả phòng</th>
                            <th width="10%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRooms.length > 0 ? (
                            filteredRooms?.map((item, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item?.room?.room_no}</td>
                                    <td>{item?.booking?.order?.fullname}</td>
                                    <td>{item?.booking?.order?.phone}</td>
                                    <td>{item?.booking?.order?.status}</td>
                                    <td>
                                        {formatDate(
                                            item?.booking?.order?.end_date
                                        )}
                                    </td>
                                    <td
                                        width="10%"
                                        className="flex items-center gap-5"
                                    >
                                        <div
                                            className="tooltip"
                                            data-tip="Dịch vụ sử dụng"
                                            onClick={() => {
                                                setSelectOption(item.id);
                                                document
                                                    .getElementById(
                                                        "my_modal_2"
                                                    )
                                                    .showModal();
                                            }}
                                        >
                                            <RiAddLargeLine
                                                className="hover:text-blue-500 cursor-pointer "
                                                size={16}
                                            />
                                        </div>

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

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box max-w-4xl">
                    <h3 className="font-bold text-lg mb-5">
                        Danh sách dịch vụ
                    </h3>

                    <div className="flex items-center">
                        <div className="w-1/5 text-left"></div>
                        <p className="w-2/5 font-bold">Tên dịch vụ</p>
                        <p className="w-1/5 font-bold">Đơn giá</p>
                        <p className="w-1/5 font-bold"></p>
                    </div>

                    <div className="py-4 flex flex-col gap-3">
                        {data?.all_products?.map((item, index) => (
                            <div className="flex items-center" key={index}>
                                <div className="w-1/5 text-left">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm"
                                        checked={data[
                                            "service_of_booking_detail"
                                        ]?.includes(item?.id)}
                                    />
                                </div>
                                <p className="w-2/5">{item?.name}</p>
                                <p className="w-1/5">{item?.price} VNĐ</p>
                                <p className="w-1/5 flex items-center gap-3 justify-center">
                                    <div
                                        className="tooltip"
                                        data-tip="Thêm dịch vụ"
                                    >
                                        <RiAddLargeLine
                                            className="hover:text-red-500 cursor-pointer"
                                            onClick={() =>
                                                handleAddService(item.id)
                                            }
                                        />
                                    </div>{" "}
                                    <div
                                        className="tooltip"
                                        data-tip="Thêm dịch vụ"
                                    >
                                        <FaTrash
                                            className="hover:text-red-500 cursor-pointer"
                                            onClick={() =>
                                                handleDeleteService(item.id)
                                            }
                                        />
                                    </div>
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="btn btn-secondary ml-3 w-[125px]"
                            onClick={() =>
                                document.getElementById("my_modal_2").close()
                            }
                        >
                            Hủy
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
