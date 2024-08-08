<?php

use Illuminate\Http\Request;
use Illuminate\Routing\RouteUri;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CategoryController;

Route::get('/hello', function(){
  return response()->json(['message' => 'Devil may cry']);
});

Route::post('/abc', [StaffController::class, 'create']);

Route::controller(RoomController::class)->group(function () {
  Route::get('/rooms', 'index');
  Route::get('/rooms/{id}', 'show');
  Route::post('/rooms', 'store');
  Route::delete('/rooms/{id}', 'destroy');
  Route::put('/rooms/{id}', 'update');
  Route::get('/rooms/floor/{id}', 'getRoomsByFloor');
});

Route::controller(StaffController::class)->group(function () {
  Route::get('/staff', 'index');
  Route::post('/staff', 'store');
  Route::delete('/staff/{id}', 'destroy');
  Route::get('/staff/{id}', 'show');
  Route::put('/staff/{id}', 'updateProfile');
  Route::put('/staff-email/{id}', 'accessEmail');
});

Route::prefix('orders')->group(function () {
  Route::controller(OrderController::class)->group(function () {
    Route::get('', 'index');
    Route::post('', 'store');
    Route::get('/{id}', 'show');
    Route::patch('/{id}', 'updateStatus');
  });
});

Route::prefix('products')->group(function () {
  Route::controller(ProductController::class)->group(function () {
    Route::get('', 'index');
    Route::post('', 'create');
    Route::get('/{id}', 'show');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
  });
});

Route::controller(AuthController::class)->group(function () {
  Route::post('/login', 'login');
  Route::post('/logout', 'logout');
  Route::get('/getAccount', 'getAccount');
  Route::patch('/deleteAccount/{id}', 'deleteAccount');
  Route::put('/updatePassword/{id}', 'updatePassword');
  Route::put('/changeRole/{id}', 'changeRole');
});

Route::controller(BookingController::class)->group(function () {
  Route::get('/bookings', 'index');
  Route::post('/bookings', 'store');
  Route::get('/bookings/{id}', 'show');
  Route::put('/bookings/{id}', 'update');
  Route::delete('/bookings/{id}', 'destroy');
});

Route::prefix('categories')->group(function () {
  Route::controller(CategoryController::class)->group(function () {
    Route::get('', 'index');
    Route::post('', 'store');
    Route::get('/{id}', 'show');
    Route::patch('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
    Route::get('/{id}/rooms', 'getListRoomByCategory');
  });
});