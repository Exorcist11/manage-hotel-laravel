<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductService;

class ProductServiceController extends Controller
{
    public function store(Request $request){
        try {
            $product_service = ProductService::create([
                'amount' => $request->amount,
                'booking_detail_id' => $request->booking_detail_id,
                'product_id' => $request->product_id
            ]);
    
            return response()->json([
                'success' => true,
                'message' => 'Thêm mới dịch vụ thành công!',
                'data' => $product_service
            ], 201);
        } catch (Exception $err) {
            Log::error('Error creating service: ' . $err->getMessage());
    
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the service. Please try again.'
            ], 500);
        }
    }
}
