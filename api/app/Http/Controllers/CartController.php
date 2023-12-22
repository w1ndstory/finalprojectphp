<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
       /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart = Cart::all();
        return response()->json($cart, 200);
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
        $cart = new Cart;
        $cart->order_id = $request->order_id ? $request->order_id : "";
        $cart->save();
        return response()->json([
            'success' => 'cart created successfully',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cart = Cart::find($id);
        if(!empty($cart)){
            return response()->json($cart, 200);
        }
        else{
            return response()->json([
                'error' => 'cart not found',
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
        $cart = Cart::find($id);
        if(!empty($cart)){
            $cart->order_id = $request->order_id ? $request->order_id : $cart->order_id;
            $cart->save();
            return response()->json([
                'success' => 'cart updated successfully',
            ], 200);
        }
        else{
            return response()->json([
                'error' => 'cart not found',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Cart::where('id', $id)->exists()){
            $cart = Cart::find($id);
            $cart->delete();
            return response()->json([
                'success' => 'cart deleted successfully',
            ], 202);
        }
        else{
            return response()->json([
                'error' => 'cart not found',
            ], 404);
        }
    }
}
