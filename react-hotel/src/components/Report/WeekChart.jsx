import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

export default function WeekChart() {
    const [report, setReport] = useState([]);
    const [defaultT, setDefaultT] = useState(new Date().getMonth() + 1);
    const [defaultY, setDefaultY] = useState(new Date().getFullYear());
    useEffect(() => {
        const getReport = async () => {
            await axios
                .get(
                    `http://127.0.0.1:8000/api/bills/report-days-in-month/${defaultY}/${defaultT}`
                )
                .then((res) => setReport(res.data.daily_sales))

                .catch((err) => console.log(err));
        };
        getReport();
    }, [defaultY, defaultT]);

    const data = {
        labels: report.map((x) => x.date),
        datasets: [
            {
                label: "Doanh số",
                data: report.map((x) => x.total_sales),
                borderColor: ["rgb(75, 192, 192)"],
                backgroundColor: ["rgb(75, 192, 192)"],
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Dữ liệu theo tháng",
            },
            legend: {
                position: "top",
            },
        },
    };
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <div>
            <select
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setDefaultT(e.target.value)}
            >
                <option disabled selected>
                    Chọn tháng
                </option>
                {months.map((item, index) => (
                    <option key={index} value={index + 1}>
                        {item}
                    </option>
                ))}
            </select>
            <Line options={options} data={data} />
        </div>
    );
}
