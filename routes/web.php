<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckinoutController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return view('login');
})->name('login');

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::get('/dashboard', function () {
    return view('report.index');
});

Route::get('/check-in-out', [CheckinoutController::class, 'index'])->name('check-in-out');

Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::post('/products', [ProductController::class, 'create'])->name('products.create');

Route::get('/staff', [StaffController::class, 'index'])->name('staff');
Route::post('/staff', [StaffController::class, 'create'])->name('staff.store');
Route::delete('/staff/{id}', [StaffController::class, 'destroy'])->name('staff.destroy');

Route::get('/rooms', [RoomController::class, 'index'])->name('rooms');
Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
Route::delete('/rooms/{id}', [RoomController::class, 'destroy'])->name('rooms.destroy');
