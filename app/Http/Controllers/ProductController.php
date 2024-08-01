<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json(['products' => $products]);
    }

    public function create(Request $request)
    {
         try{
            $imagePath = null;
            if ($request->hasFile('image')){
                $image = $request->file('image');
                $imagePath = $image->store('public/images');
                $imageUrl = Storage::url($imagePath);
            }
            $product = Product::create([
                'name' => $request->name,
                'price' => $request->price,
                'amount' => $request->amount,
                'image' => $imageUrl,
            ]);
            return response()->json([
                'success' => true,
                'product' => $product
            ], 201);
        } catch (\Throwable $th){
            return response()->json($th);
        }
    }

    public function show(string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'product' => $product
        ], 200);
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $updateData = array_filter($request->only([
                'name', 'price', 'amount', 'image'
            ]), function ($value) {
                return $value !== null;
            });
    
            $product->update($updateData);    

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
                'data' => $product
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(string $id)
    {
         $product = Product::find($id);

         if ($product) {
             $product->delete();
 
             return response()->json([
                 'success' => true,
                 'message' => 'Product deleted successfully.'
             ], 200);
         }
         return response()->json([
             'success' => false,
             'message' => 'Product not found.'
         ], 404);
    }
}
