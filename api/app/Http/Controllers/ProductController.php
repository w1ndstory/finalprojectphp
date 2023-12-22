<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\Country;
use App\Models\Categories;
class ProductController extends Controller
{
    public function getByCategory($categoryId)
    {
        $products = Products::where('category_id', $categoryId)->get();
        if ($products->isEmpty()) {
            return response()->json([
                'error' => 'Products not found for this category',
            ], 404);
        }
        return response()->json($products, 200);
    }
    public function index()
    {
        $products = Products::all();
        return response()->json($products, 200);
    }
    public function create()
    {   
        //
    }
    public function store(Request $request)
    {
        $product = new Products;
        $product->title = $request->title ? $request->title : "";
        $product->name = $request->name ? $request->name : "";
        $product->description = $request->description ? $request->description : "";
        $product->featured = $request->featured ? $request->featured : "";
        $product->material = $request->material ? $request->material : "";
        $product->price = $request->price ? $request->price : "";
        $product->category_id = $request->category_id ? $request->category_id : "";
        $product->madein_id = $request->madein_id ? $request->madein_id : "";
        $product->image1 = $request->image1 ? $request->image1 : "";
        $product->image2 = $request->image2 ? $request->image2 : "";
        $product->image3 = $request->image3 ? $request->image3 : "";
        $product->image4 = $request->image4 ? $request->image4 : "";
        $product->save();
        return response()->json([
            'success' => 'Product created successfully',
        ], 200);
    }
    public function show(string $id)
    {
        $product = Products::find($id);
        if (!empty($product)) {
            return response()->json($product, 200);
        } else {
            return response()->json([
                'error' => 'Product not found',
            ], 404);
        }
    }
    public function edit(string $id)
    {
        //
    }
    public function update(Request $request, string $id)
    {
        $product = Products::find($id);
        if (!empty($product)) {
            $product->title = $request->title ? $request->title : $product->title;
            $product->name = is_null($request->name) ? $product->name : $request->name;
            $product->description = $request->description ? $request->description : $product->description;
            $product->featured = $request->featured ? $request->featured : $product->featured;
            $product->material = $request->material ? $request->material : $product->material;
            $product->price = $request->price ? $request->price : $product->price;
            $product->save();
            return response()->json([
                'success' => 'Product updated successfully',
            ], 200);
        } else {
            return response()->json([
                'error' => 'Product not found',
            ], 404);
        }
    }
    public function destroy(string $id)
    {
        if (Products::where('id', $id)->exists()) {
            $product = Products::find($id);
            $product->delete();
            return response()->json([
                'success' => 'Product deleted successfully',
            ], 202);
        } else {
            return response()->json([
                'error' => 'Product not found',
            ], 404);
        }
    }
}
