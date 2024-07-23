<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return view('product.index', compact('products'));
    }

    public function create(Request $request)
    {
        $request -> validate([
            'room_id' => 'required|integer',
            'name' => 'required|string',
            'price' => 'integer|numeric',
            'amount' => 'required|integer'
        ]);

        Product::create([
            'room_id' => $request->room_id,
            'name' => $request->name,
            'price' => $request->price,
            'amount' => $request->amount,
        ]);
        // return redirect()->route('product.index')->with('success', 'Thêm mới sản phẩm thành công!');
        return redirect()->back()->with('success', 'Thêm mới danh mục thành công!');
    }
}
