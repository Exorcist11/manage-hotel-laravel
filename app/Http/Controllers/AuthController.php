<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    public function login(Request $request)
    {
        // $credentials = $request->only('email', 'password');

        // if ($credentials['email'] == 'admin' && $credentials['password'] == 'admin') {
        //     return redirect()->intended('dashboard');
        // }

        // return redirect()->back()->withErrors(['email' => 'Email hoặc mật khẩu không đúng']);

        // $request->validate([
        //     'email' => 'required|string',
        //     'password' => 'required|string',
        // ]);

        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials)) {
            return redirect()->intended('dashboard');
        }

        return back()->withErrors(['email' => 'Email hoặc mật khẩu không đúng']);
    }

    public function logout(Request $request) {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
