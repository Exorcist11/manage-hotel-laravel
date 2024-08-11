import axios from "axios";
import { useEffect, useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function DetailCheckIn() {
    const [form, setForm] = useState({});
    const { id } = useParams();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return dateString.split("T")[0];
    };

    const handleCheckIn = async (room_id) => {
        await axios
            .post(`http://127.0.0.1:8000/api/rooms/${room_id}/check-in`)
            .then((response) => toast.success(response.data.message))
            .catch((error) => console.error(error));
    };

    const handleCheckout = async (room_id) => {
        await axios
            .post(`http://127.0.0.1:8000/api/rooms/${room_id}/check-out`)
            .then((response) => toast.success(response.data.message))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        const getDetail = async () => {
            await axios
                .get(`http://127.0.0.1:8000/api/bookingDetails/${id}`)
                .then((response) => setForm(response.data.booking_detail))
                .catch((error) => console.error(error));
        };
        getDetail();
    }, [id]);

    return (
        <div>
            <h1 className="font-bold text-2xl text-center uppercase">
                Thông tin đặt phòng
            </h1>
            <form className="flex items-center hover:underline hover:text-blue-700 cursor-pointer ">
                <IoCaretBack />
                <input
                    type="button"
                    value="Trở về trang chủ"
                    onClick={() => history.back()}
                />
            </form>
            <div className="flex justify-center my-5">
                <div className="w-[800px] flex flex-col gap-3 ">
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">
                                Họ và tên{" "}
                                <span className="text-red-500">*</span>
                            </span>
                        </div>
                        <input
                            type="text"
                            name="fullname"
                            onChange={handleChange}
                            placeholder=" Họ và tên"
                            className="input input-bordered w-full "
                            required
                            value={form?.booking?.order?.fullname}
                            disabled
                        />
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">
                                Căn cước công dân/ Chứng minh nhân dân{" "}
                                <span className="text-red-500">*</span>
                            </span>
                        </div>
                        <input
                            type="text"
                            name="citizen_number"
                            onChange={handleChange}
                            placeholder="Căn cước công dân/ Chứng minh nhân dân"
                            className="input input-bordered w-full"
                            value={form?.booking?.order?.citizen_number}
                            disabled
                        />
                    </label>

                    <div className="flex gap-4">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Số điện thoại{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="tel"
                                name="phone_number"
                                placeholder="Số điện thoại"
                                onChange={handleChange}
                                className="input input-bordered w-full "
                                pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                                value={form?.booking?.order?.phone_number}
                            />
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Email{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="Email"
                                className="input input-bordered w-full "
                                value={form?.booking?.order?.email}
                            />
                        </label>
                    </div>

                    <div className="flex gap-4">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Ngày nhận phòng{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="date"
                                name="start_date"
                                onChange={handleChange}
                                placeholder="Type here"
                                className="input input-bordered w-full "
                                value={formatDate(
                                    form?.booking?.order?.start_date
                                )}
                            />
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Ngày trả phòng{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="date"
                                name="end_date"
                                onChange={handleChange}
                                placeholder="Type here"
                                className="input input-bordered w-full "
                                value={formatDate(
                                    form?.booking?.order?.end_date
                                )}
                            />
                        </label>
                    </div>

                    <div className="flex gap-4">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Trạng thái yêu cầu{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full "
                                value={form?.booking?.order?.status}
                            />
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Phòng{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="end_date"
                                className="input input-bordered w-full "
                                value={form?.room?.room_no}
                            />
                        </label>
                    </div>

                    <div className="text-center ">
                        {form?.is_check_in === 0 && (
                            <button
                                className="btn mr-5 btn-success"
                                onClick={() => handleCheckIn(form?.room?.id)}
                            >
                                Check in
                            </button>
                        )}
                        {form?.is_check_in === 1 && (
                            <button
                                className="btn btn-error"
                                onClick={() => handleCheckout(form?.room?.id)}
                            >
                                Check out
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
