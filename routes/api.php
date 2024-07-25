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
Route::post('/rooms/create', [RoomController::class, 'store']);
Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);
