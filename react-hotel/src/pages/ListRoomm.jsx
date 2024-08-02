export default function ListRoomm() {
    return (
        <div className="px-28 flex flex-col gap-5 mb-10">
            <div className="flex justify-center flex-col gap-2 text-center leading-tight border-y py-10">
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li>
                            <a>Trang chủ</a>
                        </li>
                        <li>
                            <a>Danh sách phòng</a>
                        </li>
                    </ul>
                </div>

                <h1 className="text-[40px]">Phòng nghỉ</h1>
                <p>
                    318 phòng ở rộng rãi với nội thất và tiện nghi sang trọng
                    bậc nhất hứa hẹn đem đến giây phút nghỉ ngơi thoải mái cho
                    khách hàng.
                </p>
                <p>
                    235 phòng tiêu chuẩn và 83 phòng cao cấp sở hữu tầm nhìn bao
                    quát toàn thành phố.
                </p>
                <p>
                    Nét truyền thống của Việt Nam điểm xuyết trong thiết kế nội
                    thất của hai công ty HBA và Wilson Associates.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <div className="card bg-base-100 shadow-xl cursor-pointer group">
                    <figure className="overflow-hidden">
                        <img
                            className="group-hover:scale-110 transition-transform duration-500"
                            src="https://www.lottehotel.com/content/dam/lotte-hotel/lotte/hanoi/accommodation/club-floor/clubjuniorsuiteroom/180712-12-2000-acc-hanoi-hotel.jpg.thumb.768.768.jpg"
                            alt="Phòng Presidential Suite"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Phòng Presidential Suite</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <a href="/list-room/detail-room" className="btn btn-warning">
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="https://www.lottehotel.com/content/dam/lotte-hotel/lotte/hanoi/accommodation/club-floor/clubjuniorsuiteroom/180712-12-2000-acc-hanoi-hotel.jpg.thumb.768.768.jpg"
                            alt="Phòng Presidential Suite"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Phòng Presidential Suite</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-warning">
                                Đặt ngay
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100  shadow-xl">
                    <figure>
                        <img
                            src="https://www.lottehotel.com/content/dam/lotte-hotel/lotte/hanoi/accommodation/club-floor/clubjuniorsuiteroom/180712-12-2000-acc-hanoi-hotel.jpg.thumb.768.768.jpg"
                            alt="Phòng Presidential Suite"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Phòng Presidential Suite</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-warning">
                                Đặt ngay
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100  shadow-xl">
                    <figure>
                        <img
                            src="https://www.lottehotel.com/content/dam/lotte-hotel/lotte/hanoi/accommodation/club-floor/clubjuniorsuiteroom/180712-12-2000-acc-hanoi-hotel.jpg.thumb.768.768.jpg"
                            alt="Phòng Presidential Suite"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Phòng Presidential Suite</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-warning">
                                Đặt ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
