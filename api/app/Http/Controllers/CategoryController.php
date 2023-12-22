<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categories::all();
        return response()->json($categories, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category = new Categories;
        $category->name = $request->name ? $request->name : "";
        $category->save();
        return response()->json([ 
            'success' => 'Category created successfully',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Categories::find($id);
        if(!empty($category)){
            return response()->json($category, 200);
        }
        else{
            return response()->json([
                'error' => 'category not found',
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Categories::find($id);
        if(!empty($category)){
            $category->name = is_null($request->name) ? $category->name : $request->name;
            $category->save();
            return response()->json([
                'success' => 'category updated successfully',
            ], 200);
        }
        else{
            return response()->json([
                'error' => 'category not found',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Categories::where('id', $id)->exists()){
            $category = Categories::find($id);
            $category->delete();
            return response()->json([
                'success' => 'category deleted successfully',
            ], 202);
        }
        else{
            return response()->json([
                'error' => 'category not found',
            ], 404);
        }
    }
}
