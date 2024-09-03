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
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\BookingDetailController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\ProductServiceController;

Route::get('/hello', function(){
  return response()->json(['message' => 'Devil may cry']);
});

Route::post('/abc', [StaffController::class, 'create']);

Route::controller(RoomController::class)->group(function () {
  Route::get('/rooms', 'index');
  Route::get('/rooms/{id}', 'show')->where('id', '[0-9]+');
  Route::post('/rooms', 'store');
  Route::delete('/rooms/{id}', 'destroy');
  Route::put('/rooms/{id}', 'update');
  Route::get('/rooms/floor/{id}', 'getRoomsByFloor');
  Route::post('/rooms/{id}/check-in', 'checkIn');
  Route::post('/rooms/{id}/check-out', 'checkOut');
  Route::get('/empty-rooms', 'getAvailableRooms');
  Route::get('/empty-rooms-category', 'getAvailableRoomsByCategory');
  Route::get('/rooms/not-checked', 'getRoomsNotCheckedIn');
});

Route::controller(StaffController::class)->group(function () {
  Route::get('/staff', 'index');
  Route::post('/staff', 'store');
  Route::patch('/staff/{id}', 'destroy');
  Route::get('/staff/{id}', 'show');
  Route::put('/staff/{id}', 'updateProfile');
  Route::put('/staff-email/{id}', 'accessEmail');
});

Route::prefix('orders')->group(function () {
  Route::controller(OrderController::class)->group(function () {
    Route::get('', 'index');
    Route::post('', 'store');
    Route::get('/{id}', 'show')->where('id', '[0-9]+');
    // Route::patch('/{id}', 'updateStatus');
    Route::patch('/{id}/reject', 'reject');
    Route::get('/list-checked', 'listChecked');
    Route::get('/group-by-citizen', 'groupedByCitizenNumber');
    Route::get('/get-by-citizen', 'getOrdersByCitizenNumber');
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
  Route::get('/bookings/{id}', 'show')->where('id', '[0-9]+');
  Route::put('/bookings/{id}', 'update');
  Route::delete('/bookings/{id}', 'destroy');
  Route::post('/booking-at-counter', 'bookingAtCounter');
  // Route::post('/bookings/{id}/export-bill', 'exportBill');
  Route::get('/bookings/history', 'getHistory');
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

Route::prefix('services')->group(function () {
  Route::controller(ServiceController::class)->group(function () {
    Route::get('', 'index');
    Route::post('', 'store');
    Route::get('/{id}', 'show');
    Route::patch('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
    Route::get('/{id}/rooms', 'getListRoomByCategory');
  });
});

Route::prefix('bills')->group(function () {
  Route::controller(BillController::class)->group(function () {
    Route::get('', 'index');
    Route::get('/{id}', 'show')->where('id', '[0-9]+');
    Route::get('/reportMonth/{year}', 'reportMonth');
    Route::get('/report-days-in-month/{year}/{month}', 'reportDaysInMonth');
    Route::get('/reportRange', 'reportRange');
  });
});

Route::prefix('bookingDetails')->group(function() {
  Route::controller(BookingDetailController::class)->group(function() {
    Route::get('/{id}', 'show');
    Route::get('/', 'index');
    Route::get('/{id}/services', 'getServices');
    Route::post('/{id}/services', 'addServices');
    Route::post('/{id}/service', 'addService');
    Route::delete('/{id}/service', 'deleteService');
    // Route::get('check-out', 'checkOut');
  });
});

Route::prefix('productServices')->group(function() {
  Route::controller(ProductServiceController::class)->group(function() {
    Route::post('', 'store');
    // Route::get('check-out', 'checkOut');
  });
});

Route::get('/booking-check-out', [BookingDetailController::class, 'checkOut']);

Route::controller(StatisticsController::class)->group(function () {
  Route::get('/monthly-order-stats', 'monthlyOrderStats');
  Route::get('/monthly-revenue-stats', 'monthlyRevenueStats');
  Route::get('/dashboard', 'reportRecord');
});
