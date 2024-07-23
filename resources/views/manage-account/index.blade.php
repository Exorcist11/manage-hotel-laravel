@extends('layouts.dashboard')

@section('title', 'Quản lý nhân viên');

@section('content')
    <div class="block w-full overflow-x-auto">
        <table class="items-center bg-transparent w-full border-collapse ">
            <thead>
                <tr>
                    <th class="table_heading">
                        Action
                    </th>
                    <th class="table_heading">
                        Visitors
                    </th>
                    <th class="table_heading">
                        Unique users
                    </th>
                    <th class="table_heading">
                        Bounce rate
                    </th>
                </tr>
            </thead>

            <tbody>
                @foreach ($users as $user)
                    <tr>
                        <th class="table_td text-left">
                            <form action={{ route('staff.destroy', $user->id) }} method="POST">
                                @csrf
                                @method('DELETE')
                                <x-button icon='heroicon-o-trash' class='border-none' type='submit' />
                            </form>

                        </th>
                        <td class="table_td ">
                            4,569
                        </td>
                        <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                            340
                        </td>
                        <td class="table_td">

                            46,53%
                        </td>
                    </tr>
                @endforeach

            </tbody>

        </table>
    </div>

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    @if (session('error'))
        <div class="alert alert-danger">
            {{ session('error') }}
        </div>
    @endif
    <form action="{{ route('staff.store') }}" method="post" class="flex flex-col gap-2 w-full">
        @csrf
        <x-button name='Thêm mới tài khoản' icon='heroicon-s-plus' type='submit' />
        <div class="flex gap-2 w-full">
            <x-input name="email" placeholder="Tài khoản" type='text' />
            <x-input name="password" placeholder="Mật khẩu" type='password' />
        </div>
    </form>

@endsection
