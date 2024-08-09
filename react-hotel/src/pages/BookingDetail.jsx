import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingDetail() {
    const [detail, setDetail] = useState({});
    const [form, setForm] = useState({});
    const [minDate, setMinDate] = useState("");

    const { id } = useParams();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleBooking = async () => {
        await axios
            .post(`http://127.0.0.1:8000/api/orders`, {
                fullname: form.fullname,
                gender: "male",
                phone_number: form.phone_number,
                citizen_number: form.citizen_number,
                email: form.email,
                category_id: detail.id,
                number_of_rooms: form.number_of_rooms,
                start_date: form.start_date,
                end_date: form.end_date,
            })
            .then(() => {
                alert("Đặt phòng thành công!");
                window.location.href("/");
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                await axios
                    .get(`http://127.0.0.1:8000/api/categories/${id}`)
                    .then((response) => setDetail(response.data))
                    .catch((error) => console.error(error));
            } catch (error) {
                console.error("Error fetching room:", error);
            }
        };
        fetchRoom();

        const currentDate = getCurrentDate();
        setMinDate(currentDate);
    }, [id]);

    return (
        <div className="mx-20 ">
            <div className="relative text-center text-white py-5 bg-[url('https://kingdomhotel.vn/wp-content/uploads/2021/02/cua-lo-755x350.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h2 className="relative font-bold text-3xl mb-5 uppercase">
                    Thông tin đặt phòng
                </h2>
                <p className="relative">
                    Khách sạn Mường Thanh Grand Hoàng Mai - Khối Bắc Mỹ, Quỳnh
                    Lưu, Nghệ An - 0238 3866 555
                </p>
            </div>

            <div className="flex justify-center my-5">
                <div className="w-[800px] flex flex-col gap-3 ">
                    <h3 className="font-bold text-lg">
                        Thông tin người đặt phòng
                    </h3>
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
                            className="input input-bordered w-full "
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
                                min={minDate}
                                max={form.end_date}
                                className="input input-bordered w-full "
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
                                min={form.start_date}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="input input-bordered w-full "
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-center my-5">
                <div className="w-[800px] flex flex-col gap-3 ">
                    <h3 className="font-bold text-lg">Thông tin phòng đặt</h3>

                    <div className="flex items-center pb-5 gap-5 ">
                        <div className="w-2/5 flex justify-center h-32">
                            <img
                                src={`http://127.0.0.1:8000${detail?.image}`}
                                alt="img romom"
                                className="object-cover object-center w-full h-full rounded-xl"
                            />
                        </div>
                        <div className="w-2/5 flex flex-col gap-2">
                            <h4 className="font-bold uppercase text-lg">
                                {detail?.name}
                            </h4>
                            <p className="text-[13px]">
                                Kích thước phòng: {detail?.size}{" "}
                                <span>
                                    m<sup>2</sup>
                                </span>
                            </p>
                            <p className="text-[13px]">
                                Số người: {detail?.max_occupancy} người/phòng
                            </p>
                            <p className="text-[13px]">Hướng nhìn thành phố</p>
                        </div>
                        <div className="w-1/5">
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
                        </div>
                    </div>

                    <button className="btn" onClick={handleBooking}>
                        Đặt phòng
                    </button>
                </div>
            </div>
        </div>
    );
}
