<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    public function index(){
        $users = User::with('profiles')->get();
        return response()->json(['users' => $users]);
    }

    public function store(Request $request)
    {
        try {
            $user = User::create([
                // 'email' => $request->email,
                // 'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);
    
            $profile = Profile::create([
                'user_id' => $user->id,
                'fullname' => $request->fullname,
                'birth' => $request->birth,
                'gender' => $request->gender,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
            ]);
    
            return response()->json([
                'success' => true,
                'user' => $user,
                'profile' => $profile,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function show($id)
    {
        $user = User::with('profiles')->find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'user' => $user
        ], 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User and profile deleted successfully'
        ], 200);
    } 

    public function updateProfile(Request $request, $id)
    {
        $profile = Profile::find($id);
        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found'
            ], 404);
        }

        $profile->fullname = $request->fullname;
        $profile->birth = $request->birth;
        $profile->gender = $request->gender;
        $profile->phone_number = $request->phone_number;
        $profile->address = $request->address;
        $profile->save();

        return response()->json([
            'success' => true,
            'profile' => $profile,
        ], 200);
    }

    public function accessEmail(Request $request, $id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }
    
            $user->email = $request->email;
            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }
            $user->role = $request->role;
            $user->save();
    
            return response()->json([
                'success' => true,
                'user' => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }
}
