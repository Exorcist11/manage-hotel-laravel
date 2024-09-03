<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();
        return response()->json(['services' => $services]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $service = Service::create([
                'title' => $request->title,
                'price' => $request->price
            ]);
            return response()->json([
                'success' => true,
                'service' => $service
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
        $service = Service::find($id);
        if ($service) {
            return response()->json($service);
        }
        return response()->json([
            'success' => false,
            'message' => 'Dịch vụ không tồn tại!'
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $service = Service::find($id);
        if ($service) {
            $updateData = array_filter($request->only([
                'title', 'price'
            ]), function ($value) {
                return $value !== null;
            });
    
            $service->update($updateData);    

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật thông tin dịch vụ thành công!',
                'service' => $service
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Dịch vụ không tồn tại!'
        ], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service = Service::find($id);
        if ($service) {
            $service->delete();
            return response()->json([
                'success' => true,
                'message' => 'Xoá thành công!'
            ], 200);
        }
        return response()->json([
            'success' => false,
            'message' => 'Dịch vụ không tồn tại!'
        ], 404);
    }
}
