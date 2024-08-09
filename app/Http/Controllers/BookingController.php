<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Room;
use App\Models\Order;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $booking = Booking::with(['user', 'customer', 'booking_details.room'])->get();
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
                $booking = Booking::create([
                    'staff_id' => $request->staff_id,
                    'customer_id' => $request->customer_id,
                ]);
    
                foreach ($request->rooms as $roomData) {
                    BookingDetail::create([
                        'booking_id' => $booking->id,
                        'room_id' => $roomData['id'],
                        'check_in' => $roomData['check_in'],
                        'check_out' => $roomData['check_out'],
                    ]);
                }
    
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
        $booking = Booking::with(['user', 'customer', 'booking_details.room'])->find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        return response()->json($booking);
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

        $booking->update($request->only('staff_id', 'customer_id'));

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
                'phone_number' => $request->phone_number,
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
                'room_id' => $order->category_id,
                'check_in' => $order->start_date,
                'check_out' => $order->end_date,
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
}
