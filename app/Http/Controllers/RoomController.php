<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Room;
use App\Models\BookingDetail;
use App\Models\Bill;
use App\Models\ProductServices;
use Carbon\Carbon;
use Illuminate\Database\QueryException;

class RoomController extends Controller
{
    public function index(){
        $rooms = Room::with('category')->get();;
        return response()->json($rooms);
    }

    public function store(Request $request){
        try {
            $room = Room::create([
                'room_no' => $request->room_no,
                'floor' => $request->floor,
                'category_id' => $request->category_id
            ]);
    
            return response()->json([
                'success' => true,
                'message' => 'Thêm mới phòng thành công!',
                'data' => $room
            ], 201);
        } catch (QueryException $err) {
            if ($err->errorInfo[1] == 1062) {
                return response()->json([
                    'success' => false,
                    'message' => 'Trùng số phòng'
                ], 409);
            }
    
            Log::error('Error creating room: ' . $err->getMessage());
    
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the room. Please try again.'
            ], 500);
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
                'room_no', 'floor', 'category_id'
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

    public function getRoomsByFloor($floor)
    {
        $rooms = Room::where('floor', $floor)->get();

        if ($rooms->isEmpty()) {
            return response()->json([
                'message' => 'No rooms found on this floor'
            ], 404);
        }

        return response()->json($rooms);
    }

    public function checkIn(Request $request, $id)
    {
        try {
            $room = Room::findOrFail($id);

            $bookingDetail = BookingDetail::where('room_id', $id)
                                          ->where('check_in', '=', Carbon::today())
                                          ->first();

            if (!$bookingDetail) {
                return response()->json([
                    'success' => false,
                    'message' => 'Chưa đến thời gian đặt phòng'
                ], 404);
            }

            $bookingDetail->check_in = Carbon::now();
            $bookingDetail->is_check_in = true;
            $bookingDetail->save();

            return response()->json([
                'success' => true,
                'message' => 'Check-in phòng thành công',
                'data' => $bookingDetail
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Phòng không tồn tại'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi check-in phòng',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function checkOut(Request $request, $id)
    {
        \DB::beginTransaction();
        try {
            $room = Room::findOrFail($id);

            $bookingDetail = BookingDetail::where('room_id', $id)
                                          ->where('is_check_in', true)
                                          ->where('is_check_out', false)
                                          ->first();

            if (!$bookingDetail) {
                return response()->json([
                    'success' => false,
                    'message' => 'Chưa đến thời gian trả phòng'
                ], 404);
            }

            $bookingDetail->check_out = Carbon::now();
            $bookingDetail->is_check_out = true;
            $bookingDetail->save();

            $total = $bookingDetail->check_in->diffInDay($bookingDetail->check_out) * $room->category->price;

            foreach($bookingDetail->product_services as $service){
                $total += $service->amount * $service->product->price;
            }

            $bill = Bill::create([
                'payment_method' => $request->payment_method,
                'total' => $total,
                'booking_detail_id' => $bookingDetail->id
            ]);
            \DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Check-out phòng thành công',
                'data' => $bookingDetail,
                'bill' => $bill
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            \DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Phòng không tồn tại'
            ], 404);
        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi check-out phòng',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAvailableRooms(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $now = Carbon::now();

            if ($request->has('from') && $request->has('to')) {
                $from = Carbon::parse($request->input('from'));
                $to = Carbon::parse($request->input('to'));
            } else {
                $from = $now;
                $to = $now->copy()->addDay();
            }

            $availableRooms = Room::with('category') 
                ->whereDoesntHave('booking_details', function ($query) use ($from, $to) {
                    $query->where(function ($q) use ($from, $to) {
                        $q->where(function ($q) use ($from) {
                            $q->where('check_in', '<=', $from)
                            ->where('check_out', '>', $from);
                        })
                        ->orWhere(function ($q) use ($to) {
                            $q->where('check_in', '<', $to)
                            ->where('check_out', '>=', $to);
                        });
                    });
                })
                ->get();

            return response()->json([
                'success' => true,
                'data' => $availableRooms,
                'message' => 'Đã lấy ra phòng trống cùng thể loại'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra khi lấy phòng trống',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAvailableRoomsByCategory(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
            // 'category_id' => 'nullable|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $now = Carbon::now();

            if ($request->has('from') && $request->has('to')) {
                $from = Carbon::parse($request->input('from'));
                $to = Carbon::parse($request->input('to'));
            } else {
                $from = $now;
                $to = $now->copy()->addDay();
            }

            $query = Room::whereDoesntHave('booking_details', function ($query) use ($from, $to) {
                $query->where(function ($q) use ($from, $to) {
                    $q->where(function ($q) use ($from, $to) {
                        $q->where('check_in', '<=', $from)
                          ->where('check_out', '>', $from);
                    })
                    ->orWhere(function ($q) use ($from, $to) {
                        $q->where('check_in', '<', $to)
                          ->where('check_out', '>=', $to);
                    });
                });
            });

            if ($request->has('category_id')) {
                $query->where('category_id', $request->input('category_id'));
            }

            $availableRooms = $query->get();

            return response()->json([
                'success' => true,
                'data' => $availableRooms,
                'message' => 'Available rooms retrieved successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while retrieving available rooms',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getRoomsNotCheckedIn()
    {
        $rooms = Room::whereHas('booking_details', function ($query) {
            $query->where('is_check_in', false); 
        })->with(['booking_details' => function ($query) {
            $query->where('is_check_in', false); 
        }])->get();

        return response()->json([
            'success' => true,
            'rooms' => $rooms
        ]);
    }
}
