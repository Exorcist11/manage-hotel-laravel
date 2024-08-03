<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
/**
     * Hiển thị danh sách tất cả các thể loại.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    /**
     * Tạo một thể loại mới.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try{
            $imagePath = null;
            if ($request->hasFile('image')){
                $image = $request->file('image');
                $imagePath = $image->store('public/images');
                $imageUrl = Storage::url($imagePath);
            }
            $category = Category::create([
                'name' => $request->name,
                'max_occupancy' => $request->max_occupancy,
                'size' => $request->size,
                'description' => $request->description,
                'image' => $imageUrl,
            ]);
            return response()->json([
                'success' => true,
                '$category' => $category
            ], 201);
        } catch (\Throwable $th){
            return response()->json($th);
        }
    }

    /**
     * Hiển thị chi tiết một thể loại cụ thể.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($category);
    }

    /**
     * Cập nhật một thể loại cụ thể.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $category = Category::findOrFail($id);

            $updateData = array_filter($request->only([
                'name', 'max_occupancy', 'size', 'description', 'image'
            ]), function ($value) {
                return $value !== null;
            });
    
            $category->update($updateData);    

            return response()->json([
                'success' => true,
                'message' => 'Category updated successfully',
                'data' => $category
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Xóa một thể loại cụ thể.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
