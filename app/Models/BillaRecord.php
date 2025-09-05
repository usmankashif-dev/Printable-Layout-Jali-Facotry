<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillaRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        // Bundle
        'sheets_per_bundle', 'bundle_date', 'bundle_packed_by',
        // Stock
        'khana', 'ogauge', 'b_width', 'jalilenght', 'sheet_size', 'lot', 'machine_id', 'party_name', 'stock_packed_by', 'stock_date',
        // Order
        'order_ogauge', 'order_jalilenght', 'cutsheet', 'order_lot', 'order_party_name',
    ];
}
