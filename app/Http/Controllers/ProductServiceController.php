<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductService;

class ProductServiceController extends Controller
{
    public function store(Request $request){
        try {
            $product_services = [];
    
            foreach ($request->products as $product) {
                $product_service = ProductService::create([
                    'amount' => $product['amount'],
                    'booking_detail_id' => $request->booking_detail_id,
                    'product_id' => $product['product_id']
                ]);
                $product_services[] = $product_service;
            }
    
            return response()->json([
                'success' => true,
                'message' => 'Thêm mới dịch vụ thành công!',
                'data' => $product_services
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
