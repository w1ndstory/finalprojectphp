<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Orders::all();
        return response()->json($orders);
    }
    public function create()
    {   
        //
    }
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'product_id' => 'required|exists:products,id',
                'size' => 'required|string',
                'quantity' => 'required|integer|min:1',
                'client_name' => 'required|string|max:255',
                'status' => 'required|string|max:255',
            ]);

            $order = Orders::create($validatedData);
            $order->expected_payment_date = $order->created_at->addDay();
            $order->save();
            return response()->json([
                'success' => 'Order created successfully',
                'order' => $order,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create order',
                'message' => $e->getMessage(),
            ], 500);
        }
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
            $order->status = $request->status ? $request->status : $order->status;
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
    public function downloadPendingPaymentsReport()
    {
        $orders = Orders::where('status', 'Not Payed')->get();
        $filename = "pending_payments_report.csv";
        $handle = fopen($filename, 'w');
        fputcsv($handle, ['Order Number', 'Client Name', 'Order Date', 'Status', 'Expected Payment Date']);
    
        foreach ($orders as $order) {
            fputcsv($handle, [
                $order->id,
                $order->client_name,
                $order->created_at,
                $order->status,
                $order->expected_payment_date
            ]);
        }
        fclose($handle);
        return response()->download($filename)->deleteFileAfterSend(true);
    }
    public function downloadMaxSizeOrders()
    {
        $orders = Orders::where('size', 'XL')->get();
        $filename = "size_xl_orders.csv";
        $handle = fopen($filename, 'w');
        fputcsv($handle, ['Order Number', 'Client Name', 'Order Date', 'Status', 'Size']);
    
        foreach ($orders as $order) {
            fputcsv($handle, [
                $order->id,
                $order->client_name,
                $order->created_at,
                $order->status,
                $order->size
            ]);
        }
        fclose($handle);
        return response()->download($filename)->deleteFileAfterSend(true);
    }
}
