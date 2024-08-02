<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    // public function login(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');

    //     if(Auth::attempt($credentials)) {
    //         return redirect()->intended('dashboard');
    //     }

    //     return back()->withErrors(['email' => 'Email hoặc mật khẩu không đúng']);
    // }

    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials)) {
            return response()->json([
                'success' => true,
                'message' => 'Đăng nhập thành công',
                'user' => Auth::user()
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Email hoặc mật khẩu không đúng'
        ], 401);
    }


    public function signin(Request $request){
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Invalid email or password'
        ], 401);
    }

    // public function logout(Request $request) {
    //     Auth::logout();
    //     return redirect('/');
    // }

    public function logout(Request $request)
    {
        Auth::logout();
        
        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công'
        ], 200);
    }
}
