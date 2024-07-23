<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Room;

class RoomController extends Controller
{
    public function index(){
        $rooms = Room::all();
        return response()->json($rooms);
    }

    public function store(Request $request){
        $request->validate([
            'room_no'=> 'required|string|max:255',
            'max_number'=> 'required|integer',
            'price'=> 'required|numeric'
        ]);

        try {
            Room::create([
                'room_no' => $request -> room_no,
                'max_number' => $request -> max_number,
                'price' => $request -> price
            ]);

            return redirect()->back()->with('success', 'Thêm mới phòng thành công!');
        } catch (Exception $err) {
             \Log::error('Error creating room: ' . $e->getMessage());

             return redirect()->back()->with('error', 'An error occurred while creating the room. Please try again.');
        }
    }

    public function destroy($id){
        $room = Room::find($id);
        if($room){
            $room -> delete();
            return redirect()->route('rooms')->with('success', 'Xoá thành công!');
        }
        return redirect()->route('rooms')->with('error', 'Tài khoản không tồn tại!');
    } 
}
