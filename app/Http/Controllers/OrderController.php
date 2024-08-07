<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Order;
use App\Models\Room;
use App\Models\Booking;
use App\Models\BookingDetail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $all_orders = Order::all();
        return response()->json(['orders' => $all_orders]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $order = Order::create([
                'fullname' => $request->fullname,
                'gender' => $request->gender,
                'phone_number' => $request->phone_number,
                'citizen_number' => $request->citizen_number,
                'email' => $request->email,
                'category_id' => $request->category_id,
                'number_of_rooms' => $request->number_of_rooms,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);
            return response()->json([
                'success' => true,
                'order' => $order
            ], 201);
        } catch (\Throwable $th){
            return response()->json($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($order);
    }

    public function updateStatus(string $id, Request $request)
    {
        {
            \DB::beginTransaction();
            try {
                $order = Order::find($id);

                if ($order->status == "Chấp nhận"){
                    return response()->json([
                        'succcess' => false,
                        'message' => 'Order đã được chấp nhận'
                    ]);
                }

                if ($request->status == "Từ chối")
                {
                    $order->status = "Từ chối";
                    $order->save();
                    \DB::commit();
                    return response()->json([
                        'success' => true,
                        'message' => 'Hủy Order thành công',
                        'order' => $order,
                    ], 201);
                } else {
                    $rooms = Room::where('category_id', $order->category_id)
                        ->take($order->number_of_rooms)
                        ->get();
                    $booking = Booking::create([
                        //Lấy current_user ở đoạn này thay cho $request->staff_id
                        'staff_id' => $request->staff_id,
                        'order_id' => $id,
                    ]);

                    foreach ($rooms as $roomData) {
                        BookingDetail::create([
                            'booking_id' => $booking->id,
                            'room_id' => $roomData['id'],
                            'check_in' => $order->start_date,
                            'check_out' => $order->end_date,
                        ]);
                    }

                    $order->status = "Chấp nhận";
                    $order->save();
                    \DB::commit();
                    return response()->json([
                        'success' => true,
                        'message' => 'Order thành công',
                        'order' => $order,
                    ], 201);
                }
            } catch (\Exception $e) {
                \DB::rollback();
                return response()->json([
                    'success' => false,
                    'message' => 'Lỗi cập nhật trạng thái order: ' . $e->getMessage(),
                ], 500);
            }
        }
    }
}
