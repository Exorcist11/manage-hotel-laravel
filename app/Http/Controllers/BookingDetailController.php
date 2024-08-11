<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookingDetail;
use App\Models\Booking;
use App\Models\Order;
use App\Models\Room;

class BookingDetailController extends Controller
{
    public function show($id)
    {
        $bookingDetail = BookingDetail::with(['room', 'booking.order'])->find($id);

        if (!$bookingDetail) {
            return response()->json([
                'success' => false,
                'message' => 'BookingDetail not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'booking_detail' => $bookingDetail
        ]);
    }
    public function index()
    {
        $bookingDetail = BookingDetail::with(['room', 'booking.order'])
        ->where('is_check_in', false)
        ->get();

        if (!$bookingDetail) {
            return response()->json([
                'success' => false,
                'message' => 'BookingDetail not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'booking_detail' => $bookingDetail
        ]);
    }

    public function checkOut()
    {
        $bookingDetail = BookingDetail::with(['room', 'booking.order'])
        ->where('is_check_out', false)
        ->get();

        if (!$bookingDetail) {
            return response()->json([
                'success' => false,
                'message' => 'BookingDetail not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'booking_detail' => $bookingDetail
        ]);
    }
}
