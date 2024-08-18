import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailHistory() {
    const [details, setDetails] = useState([]);
    const { id } = useParams();
    const getDetails = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/orders/get-by-citizen`, {
                params: {
                    citizen_number: id,
                },
            })
            .then((response) => setDetails(response.data.orders));
    };
    useEffect(() => {
        getDetails();
    }, [id]);

    return (
        <div>
            <h1 className="font-bold text-2xl text-center uppercase">
                Chi tiết đặt phòng
            </h1>

            <div className="flex flex-col gap-5 mt-5">
                {details?.map((item, index) => (
                    <div key={index} className="shadow border flex p-2 gap-3 ">
                        <div className="basis-1/3">
                            <p>Tên khách hàng: {item?.fullname}</p>
                            <p>Số điện thoại: {item?.phone}</p>
                            <p>Email: {item?.email}</p>
                            <p>CCCD: {item?.citizen_number}</p>
                        </div>
                        <div className="basis-1/3">
                            <p>
                                Phòng:{" "}
                                {
                                    item?.booking?.booking_details[0]?.room
                                        ?.room_no
                                }
                            </p>
                            <p>
                                Tầng:{" "}
                                {item?.booking?.booking_details[0]?.room?.floor}
                            </p>
                            <p>
                                Loại phòng:{" "}
                                {
                                    item?.booking?.booking_details[0]?.room
                                        ?.category_id
                                }
                            </p>
                        </div>
                        <div className="basis-1/3 text-center font-bold">
                            <p>Tổng tiền</p>
                            <p>
                                {item?.booking?.booking_details[0]?.bill
                                    ?.total || "null"} VND
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
