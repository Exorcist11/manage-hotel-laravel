<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;



class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($credentials['email'] == 'admin' && $credentials['password'] == 'admin') {
            return redirect()->intended('dashboard');
        }

        return redirect()->back()->withErrors(['email' => 'Email hoặc mật khẩu không đúng']);
    }
}
