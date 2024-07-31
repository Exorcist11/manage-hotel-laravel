<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Room;

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
                // Create a new booking
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
                // Rollback transaction
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
}
