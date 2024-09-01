import { fetcher } from "@/lib/fetcher";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiEyeLine, RiAddLargeLine } from "react-icons/ri";
import useSWR from "swr";

export default function CheckOut() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const { data } = useSWR("http://127.0.0.1:8000/api/products", fetcher);
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [selectBooking, setSelectBooking] = useState("");

    const handleCheckboxChange = (e, id) => {
        if (e.target.checked) {
            setSelectedProductIds([...selectedProductIds, id]);
        } else {
            setSelectedProductIds(
                selectedProductIds.filter((item) => item !== id)
            );
        }
    };

    const handleSubmit = () => {
        const data = {
            booking_detail_id: selectBooking,
            product_ids: selectedProductIds,
        };
        console.log(data);
        
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
                <table className="table table-zebra" width="100%">
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
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "my_modal_2"
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            <RiAddLargeLine
                                                className="hover:text-blue-500 cursor-pointer "
                                                size={16}
                                                onClick={() =>
                                                    setSelectBooking(item.id)
                                                }
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
                        <p className="w-2/4 font-bold">Tên dịch vụ</p>
                        <p className="w-1/4 font-bold">Đơn giá</p>

                        <div className="w-1/4 text-right"></div>
                    </div>

                    <div className="py-4 flex flex-col gap-3">
                        {data?.products?.map((item, index) => (
                            <div className="flex items-center" key={index}>
                                <p className="w-2/4">{item?.name}</p>
                                <p className="w-1/4">{item?.price} VNĐ</p>

                                <div className="w-1/4 text-right">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm"
                                        onChange={(e) =>
                                            handleCheckboxChange(e, item?.id)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Xác nhận
                        </button>
                        <button
                            className="btn btn-secondary ml-3"
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
