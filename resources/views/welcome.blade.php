<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="/images/muong-thanh-logo.ico">
    <title>Mường Thanh - Chuỗi khách sạn tư nhân lớn nhất Đông Dương</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    @vite('resources/css/app.css')

</head>

<body class="">

    @extends('layouts.app')
    @section('content')
        <div class="mx-20">
            <img src="/images/muong-thanh-banner.png" alt="banner" class="object-cover object-center" />
        </div>

        <div class="grid grid-cols-4 px-20 mt-20 items-center gap-8">
            <div class="col-span-2 text-center tracking-wide p-10 gap-4 flex flex-col">
                <h2 class="uppercase text-xl font-semibold">Về chúng tôi</h2>
                <h3 class="text-4xl  ">
                    TẬP ĐOÀN KHÁCH SẠN MƯỜNG THANH
                </h3>

                <p class="font-semibold">
                    CÂU CHUYỆN VỀ MƯỜNG THANH <br />
                    “Không gian thanh thản, tình cảm chân thành” .
                </p>

                <p>
                    Tại Mường Thanh, chúng tôi mời bạn cùng khởi hành chuyến đi tìm về không gian thanh thản chứa đựng những
                    nét văn hóa mang đậm tinh thần bản sắc Việt, nơi con người gắn kết và thân ái gửi trao nhau tình cảm
                    chân thành. Trải dọc khắp mọi vùng miền của đất nước Việt Nam xinh đẹp cùng các nước trong khu vực Đông
                    Nam Á, Mường Thanh đồng hành cùng bạn ở khắp nơi, cho mọi hành trình, ở mọi giai đoạn của cuộc sống.
                </p>

                <p>
                    Từ khách sạn đầu tiên tọa lạc ở Điện Biên Phủ, Việt Nam, Tập đoàn Khách sạn Mường Thanh đã phát triển
                    thành chuỗi khách sạn cao cấp đạt chuẩn quốc tế với 60 khách sạn thành viên, phủ sóng khắp các địa
                    phương tại Việt Nam và các nước Đông Nam Á. Hệ thống khách sạn Mường Thanh với 4 phân khúc: Mường Thanh
                    Luxury, Mường Thanh Grand, Mường Thanh Holiday và Mường Thanh hướng đến việc phục vụ đa dạng nhu cầu của
                    mọi du khách trong nước và quốc tế. Từ thiên nhiên núi cao hoang sơ, qua đồng bằng trù phú, miền biển
                    trải dài tiếp nối những đô thị sôi động, thành phố lớn...... hệ thống khách sạn Mường Thanh song hành và
                    mang đến sự hài lòng, tin yêu cho du khách trong và ngoài nước.
                </p>
            </div>

            <div class="col-span-1">
                <img src="/images/brand_1_1556849367.jpg" alt="brand1" class="object-cover object-center">
            </div>

            <div class="col-span-1">
                <img src="/images/brand_4_1556849388.jpg" alt="brand1" class="object-cover object-center">
            </div>
        </div>
    @endsection
</body>

</html>
