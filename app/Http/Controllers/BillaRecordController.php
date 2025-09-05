<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BillaRecord;
use Inertia\Inertia;

class BillaRecordController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            // Bundle
            'sheets_per_bundle' => 'required|integer',
            'bundle_date' => 'required|date',
            'bundle_packed_by' => 'nullable|string',
            // Stock
            'khana' => 'required|string',
            'ogauge' => 'required|string',
            'b_width' => 'required|string',
            'jalilenght' => 'required|integer',
            'sheet_size' => 'required|string',
            'lot' => 'required|string',
            'machine_id' => 'required|string',
            'party_name' => 'required|string',
            'stock_packed_by' => 'required|string',
            'stock_date' => 'required|date',
            // Order (optional)
            'order_ogauge' => 'nullable|string',
            'order_jalilenght' => 'nullable|integer',
            'cutsheet' => 'nullable|string',
            'order_lot' => 'nullable|string',
            'order_party_name' => 'nullable|string',
        ]);

        $record = BillaRecord::create($validated);
        return redirect()->route('History')->with('success', 'Record saved!');
    }
}
