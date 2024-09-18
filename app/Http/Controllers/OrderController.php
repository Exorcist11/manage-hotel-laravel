<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Order;
use App\Models\Room;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Category;
use App\Mail\OrderSuccessMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'all_orders' => Order::all(),
            'pending_orders' => Order::pending()->get(),
            'accept_orders' => Order::accept()->get(),
            'reject_orders' => Order::reject()->get(),
            'counter_orders' => Order::counter()->with('booking')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $order = Order::create([
                'fullname' => $request->fullname,
                'phone' => $request->phone,
                'citizen_number' => $request->citizen_number,
                'email' => $request->email,
                'category_id' => $request->category_id,
                'number_of_rooms' => $request->number_of_rooms,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);        // Attempt to send the success email
            try {
                Mail::to($order->email)->send(new OrderSuccessMail($order));
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order created, but email failed to send: ' . $e->getMessage(),
                ], 500);
            }
            return response()->json([
                'success' => true,
                'order' => $order
            ], 201);
        } catch (\Throwable $th){
            \Log::error($th);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred during order creation.',
                'error' => $th->getMessage()
            ], 500);
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

        $order->category_id = Category::find($order->category_id)->name;

        return response()->json($order);
    }

    public function reject(string $id, Request $request)
    {
        $order = Order::find($id);
        
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->status = "Từ chối";
        $order->save();

        return response()->json([
            'success' => true,
            'message' => 'Order đã bị từ chối',
            'order' => $order,
        ], 201);
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

    public function listChecked() {
        $checked_in_orders = Order::whereDoesntHave('booking.booking_details', function ($query) {
            $query->where('is_check_in', false);
        })->get();

        $checked_out_orders = Order::whereDoesntHave('booking.booking_details', function ($query) {
            $query->where('is_check_out', false);
        })->get();

        return response()->json([
            'success' => true,
            'checked_in' => $checked_in_orders,
            'checked_out' => $checked_out_orders
        ], 200);
    }

    public function groupedByCitizenNumber() {
        try {
            $orders = Order::select('fullname', 'email', 'citizen_number', 'phone')
            ->whereIn('id', function($query) {
                 $query->select(DB::raw('MIN(id)'))
                       ->from('orders')
                       ->groupBy('citizen_number');
             })
            ->get();

            // $orders = Order::with('booking.booking_details.room') 
            //     ->get()
            //     ->groupBy('citizen_number', 'fullname');

            return response()->json([
                'success' => true,
                'data' => $orders
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getOrdersByCitizenNumber(Request $request){
        $citizenNumber = $request->query('citizen_number');

        if (!$citizenNumber) {
            return response()->json([
                'success' => false,
                'message' => 'Citizen number is required'
            ], 400);
        }

        $orders = Order::where('citizen_number', $citizenNumber)
                ->with(['booking.booking_details.room', 'booking.booking_details.bill'])->get();

        return response()->json([
            'success' => true,
            'orders' => $orders
        ], 200);
    }
}
