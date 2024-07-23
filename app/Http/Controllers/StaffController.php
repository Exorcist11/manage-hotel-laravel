<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    public function index(){
        $users = User::all();
        return view('manage-account.index',compact('users'));
    }

    public function create(Request $request){
        $request->validate([
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        $form_data = $request->all();
    
        User::create([
            'email' => $form_data['email'],
            'password' => Hash::make($form_data['password'])
        ]);    
        // return response()->json(['message' => $form_data]);
    
        return redirect()->back()->with('success', 'Thêm mới tài khoản thành công!');
    }

    public function destroy($id){
        $user = User::find($id);
        if($user){
            $user -> delete();
            return redirect()->route('staff')->with('success', 'Xoá thành công!');
        }
        return redirect()->route('staff')->with('error', 'Tài khoản không tồn tại!');
    }   
}
