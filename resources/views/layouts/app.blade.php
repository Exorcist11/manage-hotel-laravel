<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <link rel="icon" type="image/x-icon" href="/images/muong-thanh-logo.ico">
    @vite('resources/css/app.css')
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>

<body>
    <div class="flex items-center flex-row justify-between px-20">
        <div class="w-44">
            <img alt="logo" src='/images/muong-thanh-logo.png' class='w-full h-full object-cover object-center' />
        </div>

        <div>
            <ul class="flex items-center font-semibold text-base list-none gap-4 cursor-pointer">
                <li class='li_content'>Trang chủ</li>
                <li class='li_content'>Về chúng tôi</li>
                <li class='li_content'>Liên hệ</li>
                <li class='li_content'>
                    <a href="{{ route('login') }}">Đăng nhập</a>
                </li>
            </ul>
        </div>
    </div>
    @yield('content')

</body>

</html>
