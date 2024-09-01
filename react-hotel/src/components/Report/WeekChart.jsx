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
    useEffect(() => {
        const getReport = async () => {
            await axios
                .get(
                    `http://127.0.0.1:8000/api/bills/report-days-in-month/${new Date().getFullYear()}/${
                        new Date().getMonth()
                    }`
                )
                .then((res) => setReport(res.data.daily_sales))

                .catch((err) => console.log(err));
        };
        getReport();
    }, [new Date().getFullYear(), new Date().getMonth()]);

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

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
}
