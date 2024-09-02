<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\BookingDetail;
use App\Models\Booking;
use App\Models\Order;
use App\Models\Room;
use App\Models\BookingService;
use App\Models\Service;
use App\Models\Product;
use App\Models\ProductService;
use Carbon\Carbon;

class BookingDetailController extends Controller
{
    public function show($id)
    {
        $bookingDetail = BookingDetail::with(['room', 'booking.order'])->find($id);
        $room = Room::findOrFail($bookingDetail->room_id);

        if (!$bookingDetail) {
            return response()->json([
                'success' => false,
                'message' => 'BookingDetail not found'
            ], 404);
        }
        $total = $bookingDetail->check_in->diffInDay($bookingDetail->check_out) * $room->category->price;
        return response()->json([
            'success' => true,
            'booking_detail' => $bookingDetail,
            'total' => $total
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
        ->where('is_check_in', true)
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

    public function addServices(Request $request, $id){
        $bookingDetail = BookingDetail::find($id);

        if (!$bookingDetail) {
            return response()->json([
                'message' => 'Booking detail not found.',
            ], 404);
        }
        $serviceIds = $request->input('service_ids');

        DB::transaction(function () use ($serviceIds, $bookingDetail) {
            foreach ($serviceIds as $serviceId) {
                BookingService::create([
                    'booking_detail_id' => $bookingDetail->id,
                    'service_id' => $serviceId,
                ]);
            }
        });

        return response()->json([
            'message' => 'Services added successfully to the booking.',
            'booking' => $bookingDetail->booking_services
        ], 200);
    }

    public function addService(Request $request, $id){
        $bookingDetail = BookingDetail::find($id);
        if (!$bookingDetail) {
            return response()->json([
                'success' => false,
                'message' => 'Booking detail not found.',
            ], 404);
        }

        $product = Product::find($request->id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        $productService = ProductService::where('booking_detail_id', $id)->where('product_id', $request->id)->exists();
        if ($productService) {
            return response()->json([
                'success' => false,
                'message' => "Service of BookingDetail is exists"
            ], 200);
        }

        ProductService::create([
            'booking_detail_id' => $id,
            'product_id' => $request->id
        ]);
        
        return response()->json([
            'success' => true,
            'booking' => $bookingDetail->product_services
        ], 201);
    }

    public function deleteService(Request $request, $id){
        $bookingDetail = BookingDetail::find($id);
        if (!$bookingDetail) {
            return response()->json([
                'success' => false,
                'message' => 'Booking detail not found.',
            ], 404);
        }

        ProductService::where('booking_detail_id', $id)
            ->where('product_id', $request->id)
            ->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Service delete success',
            'booking_detail' => $bookingDetail->product_services
        ], 200);
    }
}
