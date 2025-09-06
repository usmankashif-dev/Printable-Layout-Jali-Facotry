<?php



namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;

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
            // Billa fields
            'printed_billa_type' => 'required|string',
            'printed_billa_quantity' => 'required|integer',
        ]);

        $record = BillaRecord::create($validated);
        // Redirect to the selected Billa page with full order info
        return redirect()->route($validated['printed_billa_type'], ['billaFormId' => $record->id]);
    }

    public function storePrintInfo(Request $request)
    {
        Log::info('storePrintInfo request', $request->all());
        // Validate input
        $request->validate([
            'originalOrderId' => 'required|integer|exists:billa_records,id',
            'printed_billa_type' => 'required|string',
            'printed_billa_quantity' => 'required|integer',
        ]);

        // Find the original order
        $original = BillaRecord::find($request->originalOrderId);

        if (!$original) {
            Log::error('Original order not found for ID: ' . $request->originalOrderId);
            // Handle not found error gracefully
            return redirect()->back()->withErrors(['Order not found.']);
        }

        // Duplicate the original order and set printed info
        $newOrder = $original->replicate();
        Log::info('Duplicating order', ['original_id' => $original->id, 'new_data' => [
            'printed_billa_type' => $request->printed_billa_type,
            'printed_billa_quantity' => $request->printed_billa_quantity
        ]]);
        $newOrder->printed_billa_type = $request->printed_billa_type;
        $newOrder->printed_billa_quantity = $request->printed_billa_quantity;
        $newOrder->save();
    Log::info('New order saved', ['new_id' => $newOrder->id]);

    // Redirect to the selected Billa page with full order info (Inertia client-side redirect)
    return \Inertia\Inertia::location(route($request->printed_billa_type, ['billaFormId' => $newOrder->id]));
    }
}
