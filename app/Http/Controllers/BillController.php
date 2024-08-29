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
}
