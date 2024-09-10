import axios from "axios";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DetailReport() {
    const now = new Date();
    const [time, setTime] = useState({
        start_date: now.toISOString().split("T")[0],
        end_date: now.toISOString().split("T")[0],
    });
    const [data, setData] = useState();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTime((preState) => ({
            ...preState,
            [name]: value,
        }));
    };
    const handleReport = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/report-by-range-time",
                {
                    params: {
                        from: time.start_date,
                        to: time.end_date,
                    },
                }
            );
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const dataRP = {
        labels: ["Doanh thu phòng", "Doanh thu dịch vụ"],
        datasets: [
            {
                label: "VND",
                data: [data?.bill_sum, data?.service_sum],
                backgroundColor: ["#36A2EB", "#FF6384"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384"],
            },
        ],
    };

    const reports = [
        { title: "Yêu cầu phòng đặt", res: data?.order_count },
        { title: "Số lượng phòng trống", res: data?.available_rooms },
        { title: "Phòng đặt", res: data?.booking_detail_count },
        { title: "Số lượng khách hàng", res: data?.customer_count },
        { title: "Số lượng dịch vụ sử dụng", res: data?.service_count },
    ];

    const colors = [
        "bg-green-500 text-white",
        "bg-red-500 text-white",
        "bg-yellow-500 text-white",
        "bg-purple-500 text-white",
        "bg-indigo-500 text-white",
    ];

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-center text-2xl font-bold uppercase">
                Chi tiết thống kê
            </h1>
            <div className="flex gap-5 items-end">
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">
                            Từ ngày <span className="text-red-500">*</span>
                        </span>
                    </div>
                    <input
                        type="date"
                        name="start_date"
                        onChange={handleChange}
                        // min={minDate}
                        value={time.start_date}
                        className="input input-bordered w-full "
                    />
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">
                            Đến ngày <span className="text-red-500">*</span>
                        </span>
                    </div>
                    <input
                        type="date"
                        name="end_date"
                        onChange={handleChange}
                        // min={time.start_date}
                        value={time.end_date}
                        className="input input-bordered w-full "
                    />
                </label>

                <label className="form-control w-full " onClick={handleReport}>
                    <div className="label">
                        <span className="label-text"></span>
                    </div>
                    <button className="btn">Tìm kiếm</button>
                </label>
            </div>

            {data && (
                <div className="flex items-center justify-between w-full">
                    <div className="w-[400px]">
                        <Pie data={dataRP} />
                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-col gap-2">
                            {reports.map((item, index) => (
                                <div
                                    className={`flex items-center gap-7 text-center p-3 rounded-xl shadow-lg border ${colors[index]}`}
                                    key={index}
                                >
                                    <p className="font-semibold uppercase text-lg">
                                        {item?.title}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {item?.res}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
