<?php

use Illuminate\Http\Request;
use Illuminate\Routing\RouteUri;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;

Route::get('/hello', function(){
  return response()->json(['message' => 'Devil may cry']);
});

Route::post('/abc', [StaffController::class, 'create']);

Route::controller(RoomController::class)->group(function () {
  Route::get('/rooms', 'index');
  Route::get('/rooms{id}', 'show');
  Route::post('/rooms/create', 'store');
  Route::delete('/rooms/{id}', 'destroy');
  Route::put('/rooms/{id}', 'update');
});
// Route::get('/rooms', [RoomController::class, 'index']);
// Route::get('/rooms/{id}', [RoomController::class, 'show']);
// Route::post('/rooms/create', [RoomController::class, 'store']);
// Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);
// Route::put('/rooms/{id}', [RoomController::class, 'update']);

Route::controller(StaffController::class)->group(function () {
  Route::get('/staff', 'index');
  Route::post('/staff', 'store');
  Route::delete('/staff/{id}', 'destroy');
  Route::get('/staff/{id}', 'show');
  Route::put('/staff/{id}', 'updateProfile');
  Route::put('/staff-email/{id}', 'accessEmail');
});
// Route:: get('/staff', [StaffController::class, 'index']);
// Route:: post('/staff', [StaffController::class, 'store']);
// Route:: delete('/staff/{id}', [StaffController::class, 'destroy']);
// Route:: get('/staff/{id}', [StaffController::class, 'show']);
// Route:: put('/staff/{id}', [StaffController::class, 'updateProfile']);
// Route:: put('/staff-email/{id}', [StaffController::class, 'accessEmail']);

Route::controller(CustomerController::class)->group(function () {
  Route::get('/customers', 'index');
  Route::post('/customers', 'store');
  Route::get('/customers/{id}', 'show');
  Route::put('/customers/{id}', 'update');
  Route::delete('/customers/{id}', 'destroy');
});

Route::controller(ProductController::class)->group(function () {
  Route::get('/products', 'index');
  Route::post('/products', 'create');
  Route::get('/products/{id}', 'show');
  Route::put('/products/{id}', 'update');
  Route::delete('/products/{id}', 'destroy');
});

Route::controller(AuthController::class)->group(function () {
  Route::post('/login', 'login');
  Route::post('/logout', 'logout');
});

Route::controller(BookingController::class)->group(function () {
  Route::get('/bookings', 'index');
  Route::post('/bookings', 'store');
  Route::get('/bookings/{id}', 'show');
  Route::put('/bookings/{id}', 'update');
  Route::delete('/bookings/{id}', 'destroy');
});
