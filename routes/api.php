<?php

use Illuminate\Http\Request;
use Illuminate\Routing\RouteUri;
use Illuminate\Support\Facades\Route;


Route::get('/hello', function(){
  return response()->json(['message' => 'Devil may cry']);
});