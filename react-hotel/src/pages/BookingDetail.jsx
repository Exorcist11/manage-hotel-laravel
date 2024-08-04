import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingDetail() {
    const [detail, setDetail] = useState({});

    const { id } = useParams();

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
                                placeholder="Số điện thoại"
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
                                placeholder="Type here"
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
                                src={`https://kingdomhotel.vn/wp-content/uploads/2021/02/cua-lo-755x350.jpg`}
                                alt="img romom"
                                className="object-cover object-center w-full h-full rounded-xl"
                            />
                        </div>
                        <div className="w-3/5 flex flex-col gap-2">
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
                    </div>

                    <button className="btn">Đặt phòng</button>
                </div>
            </div>
        </div>
    );
}
