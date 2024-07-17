
@extends('layouts.app')

@section('title', 'Home Page')

@section('content')
    <div class="bg-white border-b flex flex-col justify-center items-center gap-5 p-5 rounded-lg">
        <h1 class='text-2xl font-bold uppercase text-center'>Đăng nhập</h1>
        <div class='border w-96 px-3 py-2 rounded-lg'>
            <input type="text" placeholder='Email' class='w-full outline-none'/>
        </div>

        <div class='border w-96 px-3 py-2 rounded-lg'>
            <input type="text" placeholder='Password' class='w-full outline-none'/>
            <button id="togglePassword" type="button" class="focus:outline-none">
                Show
            </button>
        </div>

        <div class='border w-96 px-3 py-2 rounded-lg bg-[#00bcd5] text-white'>
            <button type="button" class='w-full outline-none'>Đăng nhập</button>
        </div>
    </div>

    <script>
        const togglePasswordButton = document.getElementById('togglePassword');
        togglePasswordButton.addEventListener('click', function() {
            alert('Show');
    });
    </script>
@endsection