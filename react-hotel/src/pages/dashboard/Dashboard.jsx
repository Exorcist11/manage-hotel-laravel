import DetailReport from "@/components/Report/DetailReport";
import MonthChart from "@/components/Report/ReportMonth";
import WeekChart from "@/components/Report/WeekChart";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [data, setData] = useState([]);
    const reports = [
        { title: "Tổng số phòng", res: data?.room },
        { title: "Thể loại phòng", res: data?.category },
        { title: "Phòng đang trống", res: data?.available_rooms },
        { title: "Phòng đặt", res: data?.total_check_out },
        { title: "Yêu cầu", res: data?.order_pending },
        { title: "Phòng chưa check in", res: data?.total_check_in },
        { title: "Tổng số khách hàng", res: 3000 + data?.total_user },
        { title: "Dịch vụ", res: data?.services },
        {
            title: "Doanh thu",
            res: `${parseInt(data?.revenue).toLocaleString("vi-VN")} VND`,
        },
    ];

    const colors = [
        "bg-blue-500 text-white",
        "bg-green-500 text-white",
        "bg-red-500 text-white",
        "bg-yellow-500 text-white",
        "bg-purple-500 text-white",
        "bg-indigo-500 text-white",
        "bg-pink-500 text-white",
        "bg-teal-500 text-white",
        "bg-orange-500 text-white",
    ];
    const getData = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/dashboard")
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div role="tablist" className="tabs tabs-lifted">
            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab "
                aria-label="Overview"
                defaultChecked
            />
            <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
                <div>
                    <h2 className="uppercase text-2xl text-center font-bold">
                        Thống kê
                    </h2>

                    <div className="mt-5">
                        <div className="grid grid-cols-3 gap-5">
                            {reports.map((item, index) => (
                                <div
                                    className={`text-center py-7 rounded-xl shadow-lg border ${colors[index]}`}
                                    key={index}
                                >
                                    <p className="font-semibold uppercase mb-5 text-xl">
                                        {item?.title}
                                    </p>
                                    <p className="text-3xl font-bold">
                                        {item?.res}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div role="tablist" className="tabs tabs-bordered">
                        <input
                            type="radio"
                            name="my_tabs_1"
                            role="tab"
                            className="tab"
                            aria-label="Year"
                            defaultChecked
                        />
                        <div role="tabpanel" className="tab-content p-10">
                            <MonthChart />
                        </div>

                        <input
                            type="radio"
                            name="my_tabs_1"
                            role="tab"
                            className="tab"
                            aria-label="Month"
                        />
                        <div role="tabpanel" className="tab-content p-10">
                            <WeekChart />
                        </div>
                    </div>
                </div>
            </div>

            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Detail"
            />
            <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
                <DetailReport />
            </div>

            {/* <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Tab 3"
            />
            <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
                Tab content 3
            </div> */}
        </div>
    );
}
