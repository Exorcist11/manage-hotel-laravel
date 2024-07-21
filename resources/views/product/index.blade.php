@extends('layouts.dashboard')

@section('title', 'Product')

@section('content')
    <h1>Quản lý sản phẩm</h1>
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <form action={{ route('products') }} method="POST" class="border shadow-md px-10 py-5">
        @csrf
        <x-input name="category_name" placeholder="Category" />
        <button type="submit">Them moi</button>
    </form>

    <h2>Danh sách danh mục</h2>
    <ul>
        @foreach ($categories as $category)
            <li>{{ $category->category_name }}</li>
        @endforeach
    </ul>
@endsection
