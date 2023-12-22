<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Orders::all();
        return response()->json($orders, 200);
    }
    public function create()
    {   
        //
    }
    public function store(Request $request)
    {
        $order = new Orders;
        $order->product_id = $request->product_id ? $request->product_id : "";
        $order->size = $request->size ? $request->size : "";
        $order->quantity = $request->quantity ? $request->quantity : "";
        $order->save(); 
        return response()->json([
            'success' => 'order created successfully',
        ], 200);
    }
    public function show(string $id)
    {
        $order = Orders::find($id);
        if (!empty($order)) {
            return response()->json($order, 200);
        } else {
            return response()->json([
                'error' => 'order not found',
            ], 404);
        }
    }
    public function edit(string $id)
    {
        //
    }
    public function update(Request $request, string $id)
    {
        $order = Orders::find($id);
        if (!empty($order)) {
            $order->product_id = $request->product_id ? $request->product_id : $order->product_id;
            $order->size = $request->size ? $request->size : $order->size;
            $order->quantity = $request->quantity ? $request->quantity : $order->quantity;
            $order->save();
            return response()->json([
                'success' => 'order updated successfully',
            ], 200);
        } else {
            return response()->json([
                'error' => 'order not found',
            ], 404);
        }
    }
    public function destroy(string $id)
    {
        if (Orders::where('id', $id)->exists()) {
            $order = Orders::find($id);
            $order->delete();
            return response()->json([
                'success' => 'order deleted successfully',
            ], 202);
        } else {
            return response()->json([
                'error' => 'order not found',
            ], 404);
        }
    }
}
