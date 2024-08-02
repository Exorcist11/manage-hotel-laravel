export default function DetailRoom() {
    return (
        <div className="px-28 flex flex-col gap-5 mb-10">
            <div className="breadcrumbs text-sm">
                <ul>
                    <li>
                        <a>Trang chủ</a>
                    </li>
                    <li>
                        <a>Danh sách phòng</a>
                    </li>
                    <li>
                        <a>Danh sách phòng</a>
                    </li>
                </ul>
            </div>

            <div className="text-center text-[40px] font-semibold">
                Phòng Deluxe
            </div>

            <div className="grid grid-cols-2 gap-5 items-center">
                <div className="object-center object-cover w-full ">
                    <img
                        className="rounded-xl w-full h-full"
                        src="https://www.lottehotel.com/content/dam/lotte-hotel/lotte/hanoi/accommodation/standard/deluxeroom/180921-2-2000-roo-LTHA.jpg.thumb.1920.1920.jpg"
                        alt=""
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <div className="border-b">
                        <b>Thông tin phòng</b>
                        <p>
                            <b>Kích thước</b>: 120 m2
                        </p>
                        <p>
                            <b>Sức chứa</b>: 2 người/phòng
                        </p>
                    </div>

                    <div className="border-b">
                        <b>Tiện nghi cơ bản</b>
                        <p>
                            <b>Kích thước</b>: 120 m2
                        </p>
                        <p>
                            <b>Sức chứa</b>: 2 người/phòng
                        </p>
                    </div>

                    <div className="">
                        <b>Chi tiết phòng</b>
                        <p>
                            Tại tất cả các phòng Deluxe nằm từ tầng 40 đến tầng
                            53 của toà nhà Lotte, khách hàng đều có thể tận
                            hưởng tầm nhìn tuyệt đẹp bao quát thành phố Hà Nội.
                            Các tiện nghi cao cấp bao gồm hệ thống điều hoà độc
                            đáo với 4 ống sẽ bảo đảm cho khách hàng những giờ
                            phút nghỉ ngơi thoải mái tại khách sạn.
                        </p>
                    </div>

                    <button className="btn btn-primary w-full">
                        Đặt phòng ngay
                    </button>
                </div>
            </div>
        </div>
    );
}
