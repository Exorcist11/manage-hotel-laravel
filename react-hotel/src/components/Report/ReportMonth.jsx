import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import { useEffect, useState } from "react";
import axios from "axios";

export default function MonthChart() {
    const [report, setReport] = useState([]);

    useEffect(() => {
        const getReport = async () => {
            await axios
                .get(
                    `http://127.0.0.1:8000/api/bills/reportMonth/${new Date().getFullYear()}`
                )
                .then((res) => setReport(res.data))
                .catch((err) => console.log(err));
        };
        getReport();
    }, [new Date().getFullYear()]);

    const data = {
        labels: report?.map((x) => x.month),
        datasets: [
            {
                label: "Doanh số",
                data: report?.map((x) => x.total_revenue),
                borderColor: [
                    "RGBA(255, 0, 0, 1)",
                    "RGBA(255, 165, 0, 1)",
                    "RGBA(255, 255, 0, 1)",
                    "RGBA(0, 128, 0, 1)",
                    "RGBA(0, 0, 255, 1)",
                    "RGBA(75, 0, 130, 1)",
                    "RGBA(128, 0, 128, 1)",
                    "RGBA(255, 192, 203, 1)",
                    "RGBA(255, 255, 255, 1)",
                    "RGBA(0, 0, 0, 1)",
                    "RGBA(128, 128, 128, 1)",
                    "RGBA(255, 255, 0, 0.5)",
                ],
                backgroundColor: [
                    "RGBA(255, 0, 0, 1)",
                    "RGBA(255, 165, 0, 1)",
                    "RGBA(255, 255, 0, 1)",
                    "RGBA(0, 128, 0, 1)",
                    "RGBA(0, 0, 255, 1)",
                    "RGBA(75, 0, 130, 1)",
                    "RGBA(128, 0, 128, 1)",
                    "RGBA(255, 192, 203, 1)",
                    "RGBA(255, 149, 255, 1)",
                    "RGBA(148, 0, 211, 1)",
                    "RGBA(128, 128, 128, 1)",
                    "RGBA(255, 255, 0, 0.5)",
                ],
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
            <Bar options={options} data={data} />
        </div>
    );
}
