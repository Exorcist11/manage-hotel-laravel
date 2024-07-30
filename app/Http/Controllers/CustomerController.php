<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
// use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();
        return response()->json(['customers' => $customers]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $customer = Customer::create([
                'fullname' => $request->fullname,
                'birth' => $request->birth,
                'gender' => $request->gender,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
                'citizen_number' => $request->citizen_number 
            ]);
            return response()->json([
                'success' => true,
                'customer' => $customer
            ], 201);
        } catch (\Throwable $th){
            return response()->json($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json([
                'success' => false,
                'message' => 'Customer not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'customer' => $customer
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $customer = Customer::findOrFail($id);

            $updateData = array_filter($request->only([
                'fullname', 'birth', 'gender', 'phone_number', 'address', 'citizen_number'
            ]), function ($value) {
                return $value !== null;
            });
    
            $customer->update($updateData);    

            return response()->json([
                'success' => true,
                'message' => 'Customer updated successfully',
                'data' => $customer
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Customer not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the customer',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $customer = Customer::find($id);

         if ($customer) {
             $customer->delete();
 
             return response()->json([
                 'success' => true,
                 'message' => 'Customer deleted successfully.'
             ], 200);
         }
 
         // Nếu không tìm thấy customer, trả về lỗi
         return response()->json([
             'success' => false,
             'message' => 'Customer not found.'
         ], 404);
    }
}
