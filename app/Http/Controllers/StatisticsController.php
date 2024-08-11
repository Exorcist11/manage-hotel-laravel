<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
