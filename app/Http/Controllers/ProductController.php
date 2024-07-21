<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\category;

class ProductController extends Controller
{
    public function index()
    {
        $categories = category::all();
        return view('product.index', compact('categories'));
    }

    public function create(Request $request)
    {
        $form_input = $request->input('category_name');
        category::create([
            'category_name' => $form_input,
        ]);
        return redirect()->back()->with('success', 'Thêm mới danh mục thành công!');;
    }
}
