<?php

use Illuminate\Http\Request;
use Illuminate\Routing\RouteUri;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;


Route::get('/hello', function(){
  return response()->json(['message' => 'Devil may cry']);
});

Route::post('/category', [CategoryController::class, 'store']);