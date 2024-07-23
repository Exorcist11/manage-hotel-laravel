@extends('layouts.dashboard')

@section('title', 'Product')

@section('content')
    <h1 class="font-semibold text-center text-2xl uppercase">Quản lý sản phẩm</h1>
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    {{-- <form action="{{ route('products.create') }}" method="POST">
        @csrf
        <label for="room_id">Room ID:</label>
        <input type="number" name="room_id" id="room_id" required>

        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required>

        <label for="price">Price:</label>
        <input type="text" name="price" id="price" required>

        <label for="amount">Amount:</label>
        <input type="number" name="amount" id="amount" required>

        <button type="submit">Create</button>
    </form> --}}

    <h2>Danh sách danh mục</h2>
    <ul>
        @foreach ($products as $product)
            <li>{{ $product->category_name }}</li>
        @endforeach
    </ul>
@endsection
