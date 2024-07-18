<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return view('login');
})->name('login');

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::get('/dashboard', function () {
    return view('dashboard');
});
