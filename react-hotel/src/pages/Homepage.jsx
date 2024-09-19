import ListView from "@/components/List/ListView";
import Slider from "@/components/Slider/Slider";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaMountain, FaPlaneDeparture } from "react-icons/fa";
export default function Homepage() {
    const [categories, setCategories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        {
            imgURL: "/images/muong-thanh-banner.png",
            imgAlt: "img-1",
        },
        {
            imgURL: "https://grandhoangmai.muongthanh.com/images/hotels/hotels/original/hma-special-vacation_website-banner-120x860px_1711952843.jpg",
            imgAlt: "img-2",
        },
        {
            imgURL: "https://booking.muongthanh.com/images/banners/original/banner-tin-tuc-uu-dai_1686539225_1686815922.jpg",
            imgAlt: "img-3",
        },
        {
            imgURL: "https://booking.muongthanh.com/images/banners/original/z5276457585777_bd08f9aabe5c299281c9248b45652cb6_1711166364.jpg",
            imgAlt: "img-4",
        },
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? categories.length - 3 : prevIndex - 3
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= categories.length - 3 ? 0 : prevIndex + 3
        );
    };

    const fetchCategories = async () => {
        try {
            await axios
                .get("http://127.0.0.1:8000/api/categories")
                .then((response) => setCategories(response.data))
                .catch((error) => error);
        } catch (error) {
            console.error("Error from fetch categories: " + error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className="">
            <div className="mx-20">
                <Slider>
                    {images.map((image, index) => {
                        return (
                            <img
                                key={index}
                                src={image.imgURL}
                                alt={image.imgAlt}
                            />
                        );
                    })}
                </Slider>
            </div>

            <div className="grid grid-cols-4 px-20 mt-20 items-center gap-8">
                <div
                    className="col-span-2 text-center tracking-wide p-10 gap-4 flex flex-col"
                    id="about_me"
                >
                    <h2 className="uppercase text-xl font-semibold">
                        Về chúng tôi
                    </h2>
                    <h3 className="text-4xl  ">
                        TẬP ĐOÀN KHÁCH SẠN MƯỜNG THANH
                    </h3>

                    <p className="font-semibold">
                        CÂU CHUYỆN VỀ MƯỜNG THANH <br />
                        “Không gian thanh thản, tình cảm chân thành” .
                    </p>

                    <p>
                        Tại Mường Thanh, chúng tôi mời bạn cùng khởi hành chuyến
                        đi tìm về không gian thanh thản chứa đựng những nét văn
                        hóa mang đậm tinh thần bản sắc Việt, nơi con người gắn
                        kết và thân ái gửi trao nhau tình cảm chân thành. Trải
                        dọc khắp mọi vùng miền của đất nước Việt Nam xinh đẹp
                        cùng các nước trong khu vực Đông Nam Á, Mường Thanh đồng
                        hành cùng bạn ở khắp nơi, cho mọi hành trình, ở mọi giai
                        đoạn của cuộc sống.
                    </p>

                    <p>
                        Từ khách sạn đầu tiên tọa lạc ở Điện Biên Phủ, Việt Nam,
                        Tập đoàn Khách sạn Mường Thanh đã phát triển thành chuỗi
                        khách sạn cao cấp đạt chuẩn quốc tế với 60 khách sạn
                        thành viên, phủ sóng khắp các địa phương tại Việt Nam và
                        các nước Đông Nam Á. Hệ thống khách sạn Mường Thanh với
                        4 phân khúc: Mường Thanh Luxury, Mường Thanh Grand,
                        Mường Thanh Holiday và Mường Thanh hướng đến việc phục
                        vụ đa dạng nhu cầu của mọi du khách trong nước và quốc
                        tế. Từ thiên nhiên núi cao hoang sơ, qua đồng bằng trù
                        phú, miền biển trải dài tiếp nối những đô thị sôi động,
                        thành phố lớn...... hệ thống khách sạn Mường Thanh song
                        hành và mang đến sự hài lòng, tin yêu cho du khách trong
                        và ngoài nước.
                    </p>
                </div>

                <div className="col-span-1">
                    <img
                        src="/images/brand_1_1556849367.jpg"
                        alt="brand1"
                        className="object-cover object-center"
                    />
                </div>

                <div className="col-span-1">
                    <img
                        src="/images/brand_4_1556849388.jpg"
                        alt="brand1"
                        className="object-cover object-center"
                    />
                </div>
            </div>

            <div className="px-20 py-10 bg-[#f4f4f5]">
                <h3 className="text-xl font-bold uppercase">Các hạng phòng</h3>
                <div className="carousel w-full relative mt-5 gap-5">
                    {categories
                        ?.slice(currentIndex, currentIndex + 3)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="carousel-item w-1/3 card bg-base-100 shadow-xl cursor-pointer group "
                            >
                                <figure className="overflow-hidden aspect-w-16 aspect-h-9">
                                    <img
                                        className="group-hover:scale-110 transition-transform duration-500 object-cover w-full h-full"
                                        src={
                                            "http://127.0.0.1:8000" +
                                            item?.image
                                        }
                                        alt={item?.name}
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item?.name}</h2>

                                    <div className="flex justify-start">
                                        <p>
                                            Kích thước{" "}
                                            <strong>
                                                {item?.size}
                                                <span>
                                                    m<sup>2</sup>
                                                </span>
                                            </strong>
                                        </p>
                                        <p
                                            className="tooltip"
                                            data-tip={`Tối đa ${item?.max_occupancy} người lớn.Trẻ em từ 0-5 tuổi được sử dụng chung giường có sẵn.`}
                                        >
                                            Sức chứa{" "}
                                            <strong>
                                                {item?.max_occupancy}{" "}
                                                người/phòng
                                            </strong>
                                        </p>
                                    </div>
                                    <p className="line-clamp-4 text-justify">
                                        {item?.description}
                                    </p>
                                    <div className="card-actions justify-end">
                                        <a
                                            href={`/list-room/${item?.id}`}
                                            className="btn btn-warning"
                                        >
                                            Xem chi tiết
                                        </a>
                                    </div>
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

            <ListView />

            <div className="h-[500px] mx-20 my-20" id="point">
                <p className="uppercase text-2xl font-bold mb-5">
                    Vị trí tuyệt vời của Mường Thanh Grand Hoàng Mai
                </p>

                {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9452.912471264588!2d105.71346699999998!3d19.258004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313774ca8aa3226b%3A0xdefe9bb19c41919e!2zS2jDoWNoIHPhuqFuIE3GsOG7nW5nIFRoYW5oIEdyYW5kIEhvw6BuZyBNYWk!5e1!3m2!1svi!2sus!4v1723454792712!5m2!1svi!2sus"
                   
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allowFullScreen={true}
                    loading="lazy"
                       referrerPolicy="no-referrer-when-downgrade"
                ></iframe> */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.41011595578803!2d105.71325711959585!3d19.257917808959636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313774ca8aa3226b%3A0xdefe9bb19c41919e!2zS2jDoWNoIHPhuqFuIE3GsOG7nW5nIFRoYW5oIEdyYW5kIEhvw6BuZyBNYWk!5e0!3m2!1svi!2s!4v1723159489782!5m2!1svi!2s"
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className="m-20">
                <h3 className="font-bold text-xl">Xung quanh khách sạn</h3>
                <div className="grid grid-cols-3 gap-10 mt-5">
                    <div className="col-span-1">
                        <p className="flex items-center gap-1 font-bold">
                            <FaMountain size={20} color="#000" />
                            <p>Cảnh đẹp thiên nhiên</p>
                        </p>

                        <p className="border-b flex justify-between mt-3">
                            <p>Ho Vuc Mau</p>
                            <p>7 km</p>
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p className="flex items-center gap-1 font-bold">
                            <FaPlaneDeparture size={20} color="#000" />
                            <p>Các sân bay thành phố gần nhất</p>
                        </p>

                        <p className="border-b flex justify-between mt-3">
                            <p>Sân bay thành phố vinh</p>
                            <p>59.1 km</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
