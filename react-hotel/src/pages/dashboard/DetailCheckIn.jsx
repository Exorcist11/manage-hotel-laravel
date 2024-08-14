import axios from "axios";
import { useEffect, useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function DetailCheckIn() {
    const [form, setForm] = useState({});
    const [total, setTotal] = useState("");
    const { id } = useParams();
    const [selectedValue, setSelectedValue] = useState("Tiền mặt");

    const handleChangeSelect = (event) => {
        setSelectedValue(event.target.value);
    };
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
            .catch((error) => toast.error(error.response.data.message));
    };

    const handleCheckout = async (room_id) => {
        await axios
            .post(`http://127.0.0.1:8000/api/rooms/${room_id}/check-out`, {
                payment_method: selectedValue,
            })
            .then((response) => toast.success(response.data.message))
            .catch((error) => {
                console.error(error);
                toast.error(error.response.data.message);
            });
    };

    useEffect(() => {
        const getDetail = async () => {
            await axios
                .get(`http://127.0.0.1:8000/api/bookingDetails/${id}`)
                .then((response) => {
                    setForm(response.data.booking_detail);
                    setTotal(response.data.total);
                })
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
                    {form.is_check_out === false &&
                        form.is_check_in === true && (
                            <div>
                                <div>
                                    <label className="form-control w-full border-b pb-4 ">
                                        <div className="label">
                                            <span className="label-text">
                                                Tổng tiền thanh toán{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </span>
                                        </div>

                                        <div className="text-right">
                                            <p className="ml-1">
                                                <b>Tạm tính:</b>{" "}
                                                {parseInt(total).toLocaleString(
                                                    "vi-VN"
                                                )}{" "}
                                                VND
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label className="form-control w-full ">
                                        <div className="label">
                                            <span className="label-text">
                                                Phương thức thanh toán{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </span>
                                        </div>
                                        <div>
                                            <div className="form-control">
                                                <label className="label cursor-pointer">
                                                    <span className="label-text">
                                                        Tiền mặt
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        name="radio-10"
                                                        value="Tiền mặt"
                                                        className="radio checked:bg-red-500"
                                                        checked={
                                                            selectedValue ===
                                                            "Tiền mặt"
                                                        }
                                                        onChange={
                                                            handleChangeSelect
                                                        }
                                                    />
                                                </label>
                                            </div>
                                            <div className="form-control">
                                                <label className="label cursor-pointer">
                                                    <span className="label-text">
                                                        Chuyển khoản
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        name="radio-10"
                                                        value="Chuyển khoản"
                                                        className="radio checked:bg-blue-500"
                                                        checked={
                                                            selectedValue ===
                                                            "Chuyển khoản"
                                                        }
                                                        onChange={
                                                            handleChangeSelect
                                                        }
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                    <div className="text-center ">
                        {form?.is_check_in === false && (
                            <button
                                className="btn mr-5 btn-success"
                                onClick={() => handleCheckIn(form?.room?.id)}
                            >
                                Check in
                            </button>
                        )}
                        {form?.is_check_in === true &&
                            form?.is_check_out === false && (
                                <button
                                    className="btn btn-error"
                                    onClick={() =>
                                        handleCheckout(form?.room?.id)
                                    }
                                >
                                    Check out
                                </button>
                            )}
                        {form?.is_check_in === true &&
                            form?.is_check_out === true && (
                                <button className="btn btn-info disabled">
                                    Thanh toán thành công
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
