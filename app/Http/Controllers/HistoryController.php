<?php

namespace App\Http\Controllers;

use App\Models\BillaRecord;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        $records = BillaRecord::latest()->get();
        return Inertia::render('HistoryPage', [
            'records' => $records
        ]);
    }
}
