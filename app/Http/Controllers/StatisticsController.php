<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Room;
use App\Models\Category;
use App\Models\Product;
use App\Models\Bill;
use Carbon\Carbon;
use App\Models\Order;
use App\Models\BookingDetail;

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
}
