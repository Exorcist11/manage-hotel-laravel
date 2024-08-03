<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link href="{{ asset('vendor/bladewind/css/animate.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('vendor/bladewind/css/bladewind-ui.min.css') }}" rel="stylesheet" />
    <script src="{{ asset('vendor/bladewind/js/helpers.js') }}"></script>
</head>

<body class="flex ">
    <nav class="basis-1/5 flex flex-col gap-5 border-r py-5 h-screen bg-slate-50">
        <div class="flex flex-col gap-2 items-center justify-center">
            <img src="{{ asset('images/muong-thanh-logo.png') }}" alt="logo"
                class="object-cover object-center w-40">
            <h1 class="uppercase font-bold text-center text-xl">Muong Thanh Hotel</h1>
        </div>
        <ul class="px-5 flex flex-col gap-5">
            <li class="li_content flex items-center gap-2">
                <x-bxs-dashboard class="icon-size" />
                <a>Thống kê - báo cáo</a>
            </li>
            <li class="li_content flex items-center gap-2">
                <x-bxs-calendar class="icon-size" />
                <a href="{{ route('check-in-out') }}">Check In-Out</a>
            </li>
            <li class="li_content flex items-center gap-2">
                <x-bxs-bed class="icon-size" />
                <a href="{{ route('rooms') }}">Quản lý phòng</a>
            </li>

            <li class="li_content flex items-center gap-2">
                <x-bxs-user-account class="icon-size" />
                <a>Quản lý khách hàng</a>
            </li>

            <li class="li_content flex items-center gap-2">
                <x-bxs-user class="icon-size" />
                <a href="{{ route('staff') }}">Quản lý nhân viên</a>
            </li>

            <li class="li_content flex items-center gap-2">
                <x-bxs-user-account class="icon-size" />
                <a>Quản lý tài khoản</a>
            </li>

            <li class="li_content flex items-center gap-2">
                <x-bxs-receipt class="icon-size" />
                <a>Quản lý dịch vụ</a>
            </li>

            <li class="li_content flex items-center gap-2">
                <x-bxs-inbox class="icon-size" />
                <a href="{{ route('products') }}">Quản lý sản phẩm</a>
            </li>

            <li class="li_content flex items-center gap-2">
                <x-bxs-log-out class="icon-size" />
                <a href="#" onclick="document.getElementById('logout-form').submit();">Đăng xuất</a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none">
                    @csrf
                </form>
            </li>
        </ul>
    </nav>
    <section class="basis-4/5 py-5 px-10 w-full">
        @yield('content')
    </section>

</body>

</html>
