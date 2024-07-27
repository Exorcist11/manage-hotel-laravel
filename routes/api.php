<?php

use Illuminate\Http\Request;
use Illuminate\Routing\RouteUri;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StaffController;


Route::get('/hello', function(){
  return response()->json(['message' => 'Devil may cry']);
});

Route::post('/abc', [StaffController::class, 'create']);

Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::post('/rooms/create', [RoomController::class, 'store']);
Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);
Route::put('/rooms/{id}', [RoomController::class, 'update']);

Route:: get('/staff', [StaffController::class, 'index']);
Route:: post('/staff', [StaffController::class, 'store']);
Route:: delete('/staff/{id}', [StaffController::class, 'destroy']);
Route:: get('/staff/{id}', [StaffController::class, 'show']);
Route:: put('/staff/{id}', [StaffController::class, 'updateProfile']);
Route:: put('/staff-email/{id}', [StaffController::class, 'accessEmail']);

