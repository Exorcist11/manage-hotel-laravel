export default function Dashboard() {
    const reports = [
        { title: "Tổng số phòng", res: 100 },
        { title: "Thể loại phòng", res: 14 },
        { title: "Phòng đang trống", res: 60 },
        { title: "Phòng đặt", res: 40 },
        { title: "Yêu cầu", res: 10 },
        { title: "Phòng chưa check in", res: 14 },
        { title: "Tổng số khách hàng", res: 3000 },
        { title: "Dịch vụ", res: 14 },
        { title: "Doanh thu tháng", res: 1400000 },
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

    return (
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
                            <p className="text-3xl font-bold">{item?.res}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
