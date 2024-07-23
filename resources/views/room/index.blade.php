@extends('layouts.dashboard')

@section('title', 'Quản lý phòng')


@section('content')
    <div class="flex flex-col gap-5">
        <div>
            <h1 class="font-bold uppercase text-center text-2xl">Quản lý phòng</h1>

        </div>
        <x-bladewind::button onclick="showModal('xl-modal')">
            Xl Modal
        </x-bladewind::button>

        <x-bladewind::modal size="xl" title="XL Modal" name="xl-modal">
            <form action="{{ route('rooms.store') }}" method="post" class="flex flex-col gap-2 w-full">
                @csrf
                <x-button name='Thêm mới phòng' icon='heroicon-s-plus' type='submit' />
                <div class="flex flex-col gap-2 w-full">
                    <x-input name="room_no" placeholder="Mã phòng" type='text' />
                    <x-input name="max_number" placeholder="Loại phòng" type='text' />
                    <x-input name="price" placeholder="Giá phòng" type='text' />
                </div>
            </form>
        </x-bladewind::modal>
        <x-bladewind::button>Save User</x-bladewind::button>

        
        <div class="mt-10 block w-full overflow-x-auto bg-slate-100 rounded-lg">
            <h1 class="font-bold uppercase text-center text-2xl">Danh sách phòng</h1>
            <table class="items-center w-full border-collapse ">
                <thead>
                    <tr>
                        <th class="table_heading">
                            Action
                        </th>
                        <th class="table_heading">
                            Mã phòng
                        </th>
                        <th class="table_heading">
                            Loại phòng
                        </th>
                        <th class="table_heading">
                            Giá phòng
                        </th>
                    </tr>
                </thead>

                <tbody>
                    @foreach ($rooms as $room)
                        <tr>
                            <th class="table_td text-left flex items-center">
                                <form action={{ route('staff.destroy', $room->id) }} method="POST">
                                    @csrf
                                    @method('PATCH')
                                    <x-button icon='heroicon-s-pencil' class='border-none' type='submit' />
                                </form>
                                <form action={{ route('rooms.destroy', $room->id) }} method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <x-button icon='heroicon-o-trash' class='border-none' type='submit' />
                                </form>

                            </th>
                            <td class="table_td ">
                                {{ $room->room_no }}
                            </td>
                            <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                {{ $room->max_number }}
                            </td>
                            <td class="table_td">
                                {{ number_format($room->price, 0, ',', '.') }} VND
                            </td>
                        </tr>
                    @endforeach

                </tbody>

            </table>
        </div>
    </div>


@endsection
