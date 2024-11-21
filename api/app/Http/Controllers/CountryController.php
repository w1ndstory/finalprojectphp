<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;

class CountryController extends Controller
{
    public function index()
    {
        $countries = Country::all();
        return response()->json($countries, 200);
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
        $country = new Country;
        $country->name = $request->name ? $request->name : "";
        $country->save();
        return response()->json([
            'success' => 'country created successfully',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $country = Country::find($id);
        if(!empty($country)){
            return response()->json($country, 200);
        }
        else{
            return response()->json([
                'error' => 'country not found',
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
        $country = Country::find($id);
        if(!empty($country)){
            $country->name = is_null($request->name) ? $country->name : $request->name;
            $country->save();
            return response()->json([
                'success' => 'country updated successfully',
            ], 200);
        }
        else{
            return response()->json([
                'error' => 'country not found',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Country::where('id', $id)->exists()){
            $book = Country::find($id);
            $book->delete();
            return response()->json([
                'success' => 'country deleted successfully',
            ], 202);
        }
        else{
            return response()->json([
                'error' => 'country not found',
            ], 404);
        }
    }
}
