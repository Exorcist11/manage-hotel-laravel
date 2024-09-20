import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailBill() {
    const [detail, setDetail] = useState({});
    // console.log(detail.booking_detail.product_services.map((item) => item));
    const { id } = useParams();

    const getDetail = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/bills/${id}`)
            .then((res) => setDetail(res.data))
            .catch((err) => console.log(err));
    };

    function formatISODate(isoString) {
        const date = new Date(isoString);

        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");

        const day = date.getUTCDate().toString().padStart(2, "0");
        const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
        const year = date.getUTCFullYear();

        // Kết hợp các giá trị để tạo thành chuỗi với định dạng mong muốn
        return `${hours}:${minutes} - ${day}/${month}/${year}`;
    }

    useEffect(() => {
        getDetail();
    }, [id]);
    return (
        <div className="flex gap-3 flex-col">
            <div className="text-center">
                <h3 className="uppercase text-3xl font-bold ">
                    Khách sạn Mường Thanh Grand Hoàng Mai
                </h3>
                <p className="italic mt-3 border-b pb-3">
                    Khối Bắc Mỹ, Quỳnh Lưu, Nghệ An | 0238 3866 555
                </p>
            </div>

            <div>
                <h3 className="uppercase text-center font-bold text-2xl">
                    Thông tin khách hàng
                </h3>
                <table width="100%">
                    <tr className="py-3">
                        <td width="30%" className="p-1">
                            Họ tên:
                        </td>
                        <td>
                            {detail?.booking_detail?.booking?.order?.fullname}
                        </td>
                    </tr>

                    <tr className="py-3">
                        <td width="30%" className="p-1">
                            Số điện thoại:
                        </td>
                        <td>{detail?.booking_detail?.booking?.order?.phone}</td>
                    </tr>

                    <tr className="py-3">
                        <td width="30%" className="p-1">
                            Căn cước công dân:
                        </td>
                        <td>
                            {
                                detail?.booking_detail?.booking?.order
                                    ?.citizen_number
                            }
                        </td>
                    </tr>
                </table>
            </div>

            <div className="">
                <h3 className="uppercase text-center font-bold text-2xl">
                    Hoá đơn chi tiết
                </h3>

                <table width="100%">
                    <tr className="py-3">
                        <td width="30%" className="p-1">
                            Phòng:
                        </td>
                        <td>{detail?.booking_detail?.room?.room_no}</td>
                    </tr>

                    <tr className="py-3">
                        <td width="30%" className="p-1">
                            Loại phòng:
                        </td>
                        <td>
                            {detail?.booking_detail?.room?.category?.name}
                        </td>
                    </tr>

                    <tr className="py-3">
                        <td width="30%" className="p-1">
                            Giá tiền:
                        </td>
                        <td>
                            {" "}
                            {parseInt(
                                detail?.booking_detail?.room?.category?.price
                            ).toLocaleString("vi-VN")}
                        </td>
                    </tr>

                    <tr className="py-3">
                        <td width="30%" className="p-1">
                            Ngày check in:
                        </td>
                        <td>
                            {formatISODate(detail?.booking_detail?.check_in)}
                        </td>
                    </tr>
                    <tr className="py-3">
                        <td width="30%" className="p-1">
                            Ngày check out:
                        </td>
                        <td>
                            {formatISODate(detail?.booking_detail?.check_out)}
                        </td>
                    </tr>
                </table>

                <div>
                    <ul className="list-disc pl-14">
                        {detail?.booking_detail?.product_services?.map(
                            (item, index) => (
                                <li key={index}>
                                    {`${item?.product?.name} (${parseInt(
                                    item?.product?.price
                                ).toLocaleString("en-US")} VND)`}
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div className="flex font-bold p-1 text-lg justify-between items-center">
                    <h3>Tổng tiền thanh toán</h3>
                    <p className="text-red-500">
                        {parseInt(detail?.total).toLocaleString("vi-VN")} VND
                    </p>
                </div>
                <div className="flex p-1 text-lg justify-between items-center">
                    <h3>Phương thức thanh toán</h3>
                    <p className="font-bold">{detail?.payment_method}</p>
                </div>
            </div>
        </div>
    );
}
