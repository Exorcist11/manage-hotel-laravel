<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đăng nhập</title>
    <style>
        html,
        body {
            height: 100%;
            margin: 0;
        }

        body {
            display: flex;
            flex-direction: column;
        }

        .main-section {
            flex: 1;
        }
    </style>
</head>

<body>
    @extends('layouts.app')

    @section('content')
        <section class="px-20 w-full flex items-center justify-center
         bg-[#f2f2f2] main-section">
            <div class="shadow-md sha rounded-xl bg-white flex items-center">
                <div>
                    <img src="/images/brand_2_1556849374.jpg" alt="brand2" class="object-cover object-center">
                </div>

                <div class="p-10 flex flex-col gap-4">
                    <h3 class="text-3xl font-semibold">Mường Thanh Management</h3>
                    <p class="text-lg">Chào mừng quay trở lại! Đăng nhập hệ thống quản lý khách sạn Mường Thanh</p>
                    <form method="POST" action="{{ route('login') }}" class="flex flex-col gap-5">
                        @csrf
                        <div class="border-b px-2 py-3 rounded-lg">
                            <input type="text" name="email" placeholder="Tên đăng nhập" class="outline-none w-full"
                                required autofocus>
                        </div>

                        <div class="border-b px-2 py-3 rounded-lg">
                            <input type="password" name="password" placeholder="Mật khẩu" class="outline-none w-full"
                                required>
                        </div>

                        <button type="submit" class="bg-black text-white py-2 rounded-lg hover:opacity-85 w-full">Đăng
                            nhập</button>
                    </form>

                    @error('email')
                        <span class="text-red-500">{{ $message }}</span>
                    @enderror
                </div>
            </div>
        </section>
    @endsection
</body>

</html>
