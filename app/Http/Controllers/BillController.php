<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bill;
use Carbon\Carbon;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bills = Bill::with(['room'])->get();
        return response()->json($bills);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bill = Bill::with(['booking_detail.room','booking_detail.room.category', 'booking_detail.booking.order'])->find($id);

        if (!$bill) {
            return response()->json(['message' => 'Không tìm thấy hóa đơn'], 404);
        }

        return response()->json($bill);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function reportMonth($year)
    {
        try {
            $reports = [];

            for ($month = 1; $month <= 12; $month++) {
                $start_date = Carbon::create($year, $month, 1)->startOfDay();
                $end_date = Carbon::create($year, $month, 1)->endOfMonth()->endOfDay();

                $completed_orders = Bill::whereBetween('updated_at', [$start_date, $end_date])
                    ->get();

                $total_revenue = $completed_orders->sum('total');

                $report = [
                    'year' => $year,
                    'month' => 'Tháng ' . $month,
                    'total_revenue' => $total_revenue,
                    'orders' => []
                ];

                $reports[] = $report;
            }

            return response()->json($reports);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }


    public function reportRange(Request $request)
    {
        try {
            $from = Carbon::parse($request->query('from'))->startOfDay();
            $to = Carbon::parse($request->query('to'))->endOfDay();

            $reports = [];

            $currentDate = $from->copy();
            while ($currentDate->lessThanOrEqualTo($to)) {
                $start_date = $currentDate->copy()->startOfMonth();
                $end_date = $currentDate->copy()->endOfMonth()->endOfDay();

                if ($start_date->lessThan($from)) {
                    $start_date = $from;
                }

                if ($end_date->greaterThan($to)) {
                    $end_date = $to;
                }

                $completed_orders = Bill::whereBetween('updated_at', [$start_date, $end_date])
                    ->get();

                $total_revenue = $completed_orders->sum('total');

                $report = [
                    'year' => $currentDate->year,
                    'month' => 'Tháng ' . $currentDate->month,
                    'total_revenue' => $total_revenue,
                    'orders' => $completed_orders
                ];

                $reports[] = $report;

                $currentDate->addMonth();
            }

            return response()->json($reports);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function reportDaysInMonth($year, $month)
    {
        try {
            $start_date = Carbon::create($year, $month, 1)->startOfDay();
            $end_date = Carbon::create($year, $month, 1)->endOfMonth()->endOfDay();

            $daily_sales = [];

            $current_date = $start_date;
            while ($current_date->lte($end_date)) {
                $next_date = $current_date->copy()->addDay()->startOfDay();

                $completed_orders = Bill::whereBetween('updated_at', [$current_date, $next_date])
                    ->get();

                $total_sales = $completed_orders->sum('total');

                $daily_sales[] = [
                    'date' => $current_date->format('d-m-Y'),
                    'total_sales' => $total_sales
                ];

                $current_date = $next_date;
            }

            return response()->json([
                'year' => $year,
                'month' => $month,
                'daily_sales' => $daily_sales
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }


}
