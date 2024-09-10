import axios from "axios";
import React from "react";

export default function ListView() {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [data, setData] = React.useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/products"
            );
            setData(response.data.products);
        } catch (error) {
            console.error(error);
        }
    };
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 3 : prevIndex - 3
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= data.length - 3 ? 0 : prevIndex + 3
        );
    };
    React.useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="px-20 py-10 bg-[#f4f4f5]">
            <h3 className="text-xl font-bold uppercase">Danh mục dịch vụ</h3>
            <div className="carousel w-full relative mt-5 gap-5">
                {data
                    ?.slice(currentIndex, currentIndex + 3)
                    .map((item, index) => (
                        <div
                            key={index}
                            className="carousel-item w-1/3 card bg-base-100 shadow-xl cursor-pointer group "
                        >
                            <figure className="overflow-hidden aspect-w-16 aspect-h-9">
                                <img
                                    className="group-hover:scale-110 transition-transform duration-500 object-cover w-full h-full"
                                    src={"http://127.0.0.1:8000" + item?.image}
                                    alt={item?.name}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item?.name}</h2>

                                <p className="line-clamp-4 text-justify">
                                    Giá dịch vụ: {parseInt(item?.price).toLocaleString('vi-VN')} VND
                                </p>
                                <p className="line-clamp-4 text-justify">
                                    {item?.detail}
                                </p>
                                {/* <div className="card-actions justify-end">
                                    <a
                                        href={`/list-room/${item?.id}`}
                                        className="btn btn-warning"
                                    >
                                        Xem chi tiết
                                    </a>
                                </div> */}
                            </div>
                        </div>
                    ))}
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <button onClick={handlePrev} className="btn btn-circle">
                        ❮
                    </button>
                    <button onClick={handleNext} className="btn btn-circle">
                        ❯
                    </button>
                </div>
            </div>
        </div>
    );
}
