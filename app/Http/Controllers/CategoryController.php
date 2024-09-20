<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Image;
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
    // public function store(Request $request)
    // {
    //     try {
    //         $imageUrl = null;
    //         if ($request->hasFile('image')) {
    //             $image = $request->file('image');
    //             $imagePath = $image->store('public/images');
    //             $imageUrl = Storage::url($imagePath);
    //         }

    //         $category = Category::create([
    //             'name' => $request->name,
    //             'max_occupancy' => $request->max_occupancy,
    //             'size' => $request->size,
    //             'description' => $request->description,
    //             'image' => $imageUrl,
    //             'price' => $request->price,
    //             'utilities' => $request->utilities
    //         ]);

    //         return response()->json([
    //             'success' => true,
    //             'category' => $category
    //         ], 201);

    //     } catch (\Throwable $th) {
    //         // Log lỗi để dễ dàng debug
    //         \Log::error($th);
            
    //         // Trả về lỗi với message chi tiết hơn
    //         return response()->json([
    //             'success' => false,
    //             'message' => $th->getMessage(),
    //         ], 500);
    //     }
    // }

    public function store(Request $request)
    {
        \DB::beginTransaction();
        try {
            $imageIds = [];

            if ($request->hasFile('images') && is_array($request->file('images'))) {
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('public/images');
                    $imageUrl = Storage::url($imagePath);

                    $imageModel = Image::create([
                        'url' => $imageUrl,
                    ]);

                    $imageIds[] = $imageModel->id;
                }
            }

            $imageIdsString = implode(',', $imageIds);

            $category = Category::create([
                'name' => $request->name,
                'max_occupancy' => $request->max_occupancy,
                'size' => $request->size,
                'description' => $request->description,
                'list_images' => $imageIdsString, 
                'price' => $request->price,
                'utilities' => $request->utilities
            ]);
            \DB::commit();

            return response()->json([
                'success' => true,
                'category' => $category,
                'images' => $imageIdsString
            ], 201);

        } catch (\Throwable $th) {
            \Log::error($th);
            \DB::rollback();
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
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

        $utilities = explode('#', $category->utilities);

        return response()->json([
            'category' => $category,
            'utilities' => $utilities
        ]);
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
                'name', 'max_occupancy', 'size', 'description', 'price', 'utilities'
            ]), function ($value) {
                return $value !== null;
            });

            $old_img = $category->image;

            $imageUrl = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = $image->store('public/images');
                $imageUrl = Storage::url($imagePath);

                if($old_img){
                    $old_img = str_replace('/storage/', 'public/', $old_img);
                    if (Storage::exists($old_img)) {
                        Storage::delete($old_img);
                    }
                }

                $category->image = $imageUrl;
            }

            if (isset($updateData['name'])) {
                $category->name = $updateData['name'];
            }
            if (isset($updateData['max_occupancy'])) {
                $category->max_occupancy = $updateData['max_occupancy'];
            }
            if (isset($updateData['size'])) {
                $category->size = $updateData['size'];
            }
            if (isset($updateData['description'])) {
                $category->description = $updateData['description'];
            }
            if (isset($updateData['price'])) {
                $category->price = $updateData['price'];
            }
            if (isset($updateData['utilities'])) {
                $category->utilities = $updateData['utilities'];
            }
    
            $category->save();    

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
        
        $old_img = $category->image;

        if($old_img){
            $old_img = str_replace('/storage/', 'public/', $old_img);
            if (Storage::exists($old_img)) {
                Storage::delete($old_img);
            }
        }
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }

    public function getListRoomByCategory($id){
        $category = Category::with('rooms')->find($id);
     
        if (!$category) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }

        return response()->json([
            'category_name' => $category->name,
            'rooms' => $category->rooms
        ]);
    }
}
