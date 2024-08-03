<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Room;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{
    public function index(){
        $rooms = Room::all();
        return response()->json($rooms);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'room_no' => 'required|string|max:255',
            'max_number' => 'required|integer',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }
    
        try {
            $room = Room::create([
                'room_no' => $request->room_no,
                'max_number' => $request->max_number,
                'price' => $request->price,
                'category_id' => $request->category_id
            ]);
    
            return response()->json([
                'success' => true,
                'message' => 'Thêm mới phòng thành công!',
                'data' => $room
            ], 201);
        } catch (Exception $err) {
            Log::error('Error creating room: ' . $err->getMessage());
    
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the room. Please try again.'
            ], 500);
        }
    }

    public function show($id){
        $room = Room::find($id);
        if ($room) {
            return response()->json($room);
        }
        return response()->json([
            'success' => false,
            'message' => 'Phòng không tồn tại!'
        ], 404);
    }
 
    public function destroy($id)
    {
        $room = Room::find($id);
        if ($room) {
            $room->delete();
            return response()->json([
                'success' => true,
                'message' => 'Xoá thành công!'
            ], 200);
        }
        return response()->json([
            'success' => false,
            'message' => 'Phòng không tồn tại!'
        ], 404);
    }

    public function update(Request $request, $id)
    {
        $room = Room::find($id);
        if ($room) {
            $updateData = array_filter($request->only([
                'room_no', 'floor', 'price', 'category_id'
            ]), function ($value) {
                return $value !== null;
            });
    
            $room->update($updateData);    

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật thông tin phòng thành công!',
                'room' => $room
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Phòng không tồn tại!'
        ], 404);
    }

}
