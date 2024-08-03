<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Profile;



class AuthController extends Controller
{
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

    public function logout(Request $request)
    {
        Auth::logout();
        
        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công'
        ], 200);
    }

    public function getAccount(){
        $users = User::with('profiles')->get();

        $data = $users->map(function($user) {
            return [
                'id' => $user->id,
                'email' => $user->email,
                'fullname' => $user->profiles->fullname,
                'role' => $user->role 
            ];
        });

        return response()->json($data);
    }

    public function deleteAccount($id){
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json([
                'success' => true,
                'message' => 'Xoá thành công!'
            ], 200);
        }
        return response()->json([
            'success' => false,
            'message' => 'Tài khoản không tồn tại!'
        ], 404);
    }

    public function updatePassword(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'error' => 'User not found'
                ], 404);
            }
    
            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }
            $user->save();
    
            return response()->json([
                'message' => 'Cập nhật mật khẩu thành công'
            ], 200);
        } catch (Exception $err) {
            Log::error('Error creating room: ' . $err->getMessage());
            return response()->json([
                'success' => false,
                'message' => $err
            ], 500);
        }
    }
}
