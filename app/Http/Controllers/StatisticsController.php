<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Room;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductService;
use App\Models\Bill;
use App\Models\Order;
use App\Models\Booking;
use App\Models\BookingDetail;
use Carbon\Carbon;

class StatisticsController extends Controller
{
    public function monthlyOrderStats(Request $request)
    {
        $month = $request->query('month', Carbon::now()->format('m'));
        $year = $request->query('year', Carbon::now()->format('Y'));

        $stats = DB::table('orders')
            ->select(
                DB::raw('COUNT(*) as total_orders'),
                DB::raw('SUM(CASE WHEN status IN (1, 3) THEN 1 ELSE 0 END) as successful_orders')
            )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->first();

        return response()->json([
            'success' => true,
            'month' => $month,
            'year' => $year,
            'total_orders' => $stats->total_orders,
            'successful_orders' => $stats->successful_orders,
        ]);
    }

    public function reportRecord(){
        $total_room = Room::count();
        $total_category = Category::count();
        $total_services = Product::count();
        $total_bills = Bill::sum('total');
        $total_user = Order::count();
        $order_pending = Order::pending()->count();
        $total_check_in = BookingDetail::with(['room', 'booking.order'])
            ->where('is_check_in', false)
            ->count();
        $total_check_out = BookingDetail::with(['room', 'booking.order'])
            ->where('is_check_out', false)
            ->where('is_check_in', true)
            ->count();

        $now = Carbon::now();

        $from = $now;
        $to = $now->copy()->addDay();
        
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
                ->count();
        return response()->json([
            'room'=> $total_room,
            'category' => $total_category,
            'services' => $total_services,
            'revenue' => $total_bills,
            'total_check_in' => $total_check_in,
            'total_check_out' => $total_check_out,
            'order_pending' => $order_pending,
            'available_rooms' => $availableRooms,
            'total_user' => $total_user,
        ]);
    }

    public function monthlyRevenueStats(Request $request)
    {
        // Xác định tháng và năm từ yêu cầu, hoặc sử dụng tháng hiện tại và năm hiện tại nếu không có
        $month = $request->query('month', Carbon::now()->format('m'));
        $year = $request->query('year', Carbon::now()->format('Y'));

        // Thống kê doanh thu theo tháng
        $stats = DB::table('bills')
            ->select(
                DB::raw('SUM(total) as total_revenue')
            )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->first();

        return response()->json([
            'success' => true,
            'month' => $month,
            'year' => $year,
            'total_revenue' => $stats->total_revenue ?? 0,
        ]);
    }

    public function reportByRangeTime(Request $request){
        if (!$request->has(['from', 'to'])) {
            return response()->json([
                'success' => false,
                'message' => 'From and To params are required.'
            ], 400);
        }

        try{
            $startDate = Carbon::parse($request->input('from'));
            $endDate = Carbon::parse($request->input('to'));
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid date format.'
            ], 400);
        }

        if ($endDate->lt($startDate)) {
            return response()->json([
                'success' => false,
                'message' => 'End date must be after or equal to Start date.'
            ], 400);
        }

        $orderCount = Order::whereBetween('created_at', [$startDate, $endDate])->count();
        $billSum = Bill::whereBetween('created_at', [$startDate, $endDate])->sum('total');
        $bookingCount = Booking::whereBetween('created_at', [$startDate, $endDate])->count();
        $bookingDetailCount = BookingDetail::whereBetween('created_at', [$startDate, $endDate])->count();
        $customerCount = Order::whereBetween('created_at', [$startDate, $endDate])->distinct('citizen_number')->count();
        $serviceCount = ProductService::whereBetween('created_at', [$startDate, $endDate])->count();
        $serviceSum = ProductService::whereBetween('created_at', [$startDate, $endDate])->with('product')->get()
                                    ->sum(function($service) {
                                        return $service->product->price;
                                    });

        $availableRooms = Room::with('category') 
                ->whereDoesntHave('booking_details', function ($query) use ($startDate, $endDate) {
                    $query->where(function ($q) use ($startDate, $endDate) {
                        $q->where(function ($q) use ($startDate) {
                            $q->where('check_in', '<=', $startDate)
                            ->where('check_out', '>', $startDate);
                        })
                        ->orWhere(function ($q) use ($endDate) {
                            $q->where('check_in', '<', $endDate)
                            ->where('check_out', '>=', $endDate);
                        });
                    });
                })
                ->count();
        return response()->json([
            'success' => true,
            'order_count' => $orderCount,
            'bill_sum' => $billSum,
            'booking_count' => $bookingCount,
            'booking_detail_count' => $bookingDetailCount,
            'customer_count' => $customerCount,
            'service_count' => $serviceCount,
            'service_sum' => $serviceSum,
            'available_rooms' => $availableRooms,
        ], 200);
    }
}
