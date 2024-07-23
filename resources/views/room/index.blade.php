@extends('layouts.dashboard')

@section('title', 'Quản lý phòng')



@section('content')
    <div class="flex flex-col gap-4">
        <div>
            <h1 class="font-bold uppercase text-center text-2xl">Quản lý phòng</h1>
        </div>

        <div>
            <x-bladewind::button onclick="showModal('create-room')">
                Thêm mới
            </x-bladewind::button>
        </div>

        @if (session('success'))
            <div id="success-message" class="bg-green-500 text-white p-4 rounded-lg">
                {{ session('success') }}
            </div>
            <script>
                setTimeout(function() {
                    document.getElementById('success-message').style.display = 'none';
                }, 3000);
            </script>
        @endif

        <x-bladewind::table divider="thin" striped="true" has_shadow="true" class="rounded-2xl">
            <x-slot name="header">
                <th>Mã phòng</th>
                <th>Loại phòng</th>
                <th>Giá phòng</th>
                <th></th>
            </x-slot>


            @foreach ($rooms as $room)
                <tr>
                    <td>{{ $room->room_no }}</td>
                    <td>{{ $room->max_number }}</td>
                    <td>{{ number_format($room->price, 0, ',', '.') }} VND</td>
                    <td class="flex border-none items-center justify-end">
                        {{-- <form action="{{ route('staff.destroy', $room->id) }}" method="POST">
                            @csrf
                            @method('PATCH')
                            <x-button icon='' class='border-none' type='submit' />
                        </form> --}}
                        <x-bladewind::button onclick="showModal('edit')" class="bg-red-500">
                            <x-heroicon-s-pencil />
                        </x-bladewind::button>
                        <form action="{{ route('rooms.destroy', $room->id) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <x-button icon='heroicon-o-trash' class='border-none' type='submit' />
                        </form>
                    </td>
                </tr>
            @endforeach
        </x-bladewind::table>

        <x-bladewind::modal size="xl" title="Thêm phòng mới" name="create-room" ok_button_label="Thêm mới"
            ok_button_action="addUser()" cancel_button_label="Huỷ bỏ" close_after_action="false">
            <form action="{{ route('rooms.store') }}" method="post" class="flex flex-col gap-2 w-full" id="add-room-form">
                @csrf
                <div class="flex flex-col gap-2 w-full">
                    <x-bladewind::input name="room_no" placeholder="Mã phòng" type='text' />
                    <x-bladewind::input name="max_number" placeholder="Loại phòng" type='text' />
                    <x-bladewind::input name="price" placeholder="Giá phòng" type='text' />
                </div>
            </form>
        </x-bladewind::modal>

        <x-bladewind::modal size="xl" title="Thêm mới phòng" name="edit" ok_button_label="Thêm mới"
            ok_button_action="addUser()" cancel_button_label="Huỷ bỏ" close_after_action="false">
            <form action="{{ route('rooms.store') }}" method="post" class="flex flex-col gap-2 w-full" id="add-room-form">
                @csrf
                <div class="flex flex-col gap-2 w-full">
                    <x-bladewind::input name="room_no" placeholder="Mã phòng" type='text' />
                    <x-bladewind::input name="max_number" placeholder="Loại phòng" type='text' />
                    <x-bladewind::input name="price" placeholder="Giá phòng" type='text' />
                </div>
            </form>
        </x-bladewind::modal>
    </div>

    <script>
        function addUser() {
            document.getElementById('add-room-form').submit();
        }
    </script>
@endsection
