<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Room;
use App\Models\Order;
use App\Models\Bill;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $booking = Booking::with(['user', 'order', 'booking_details.room'])->get();
        return response()->json($booking);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        {
            \DB::beginTransaction();
    
            try {
                $order = Order::find($request->order_id);

                if (!$order) {
                    return response()->json(['message' => 'Order not found'], 404);
                }

                $booking = Booking::create([
                    'staff_id' => $request->staff_id,
                    'order_id' => $request->order_id,
                ]);
    
                foreach ($request->rooms as $roomData) {
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
                    'message' => 'Booking created successfully',
                    'booking' => $booking,
                ], 201);
    
            } catch (\Exception $e) {
                \DB::rollback();
                return response()->json([
                    'success' => false,
                    'message' => 'Error creating booking: ' . $e->getMessage(),
                ], 500);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $booking = Booking::with(['user', 'order', 'booking_details.room'])->find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $bookingDetails = $booking->booking_details;

        $allCheckedIn = $bookingDetails->every(function ($detail) {
            return $detail->is_check_in;
        });

        $allCheckedOut = $bookingDetails->every(function ($detail) {
            return $detail->is_check_out;
        });

        if ($allCheckedIn && $allCheckedOut) {
            $status = true;
        } else {
            $status = false;
        }

        return response()->json([
            'booking' => $booking,
            'status' => $status
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $booking->update($request->only('staff_id', 'order_id'));

        if ($request->has('rooms')) {
            foreach ($request->rooms as $roomData) {
                BookingDetail::updateOrCreate(
                    ['booking_id' => $booking->id, 'room_id' => $roomData['id']],
                    ['check_in' => $roomData['check_in'], 'check_out' => $roomData['check_out']]
                );
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Booking updated successfully',
            'booking' => $booking,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $booking->booking_details()->delete();
        $booking->delete();

        return response()->json(['success' => true, 'message' => 'Booking deleted successfully']);
    }

    public function bookingAtCounter(Request $request){
        \DB::beginTransaction();
        try{
            $order = Order::create([
                'fullname' => $request->fullname,
                'phone' => $request->phone,
                'citizen_number' => $request->citizen_number,
                'email' => $request->email,
                'status' => "Đặt tại quầy",
                'category_id' => $request->category_id,
                'number_of_rooms' => $request->number_of_rooms,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            $booking = Booking::create([
                //Lấy current_user ở đoạn này thay cho $request->staff_id
                'staff_id' => $request->staff_id,
                'order_id' => $order->id,
            ]);

            BookingDetail::create([
                'booking_id' => $booking->id,
                'room_id' => $request->room_id,
                'check_in' => $order->start_date,
                'check_out' => $order->end_date,
                'is_check_in' => true,
                'is_check_out' => false
            ]);

            \DB::commit();
            return response()->json([
                'success' => true,
                'order' => $order,
                'booking' => $booking,
                
            ], 201);
        } catch (\Throwable $th){
            \DB::rollback();
            return response()->json($th);
        }
    }

    public function exportBill(Request $request, string $id)
    {
        \DB::beginTransaction();
        try{
            $booking = Booking::with(['booking_details.room', 'services'])->find($id);

            if (!$booking) {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking không tồn tại!'
                ], 404);
            }

            $total = 0;

            foreach($booking->booking_details as $booking_detail){
                $checkIn = $booking_detail->check_in;
                $checkOut = $booking_detail->check_out;
                $room = $booking_detail->room;

                if (!$checkIn || !$checkOut || !$room) {
                    continue; 
                }

                $days = $checkIn->diffInDays($checkOut);

                $total += $days * $room->category->price;
            }

            foreach($booking->services as $service){
                $total += $service->price;
            }

            $bill = Bill::create([
                'payment_method' => $request->payment_method,
                'total' => $total,
                'booking_id' => $id
            ]);

            \DB::commit();
            return response()->json([
                "bill" => $bill
            ]);
        } catch (\Throwable $th){
            \DB::rollback();
            return response()->json([
                "error" => true,
                "throw" => $th
            ]);
        }
    }

    public function getHistory()
    {
        $bookings = Booking::whereDoesntHave('booking_details', function ($query) {
            $query->where('is_check_in', false)
                  ->orWhere('is_check_out', false);
        })->with(['booking_details.room', 'order', 'services']) 
          ->get();
          
        return response()->json([
            'success' => true,
            'bookings' => $bookings
        ]);
    }
}
