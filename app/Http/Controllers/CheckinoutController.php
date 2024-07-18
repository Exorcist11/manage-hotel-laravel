<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CheckinoutController extends Controller
{
    public function index()
    {
        return view('check-in.index');
    }
}
