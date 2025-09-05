<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('billa_records', function (Blueprint $table) {
            $table->id();
            // Bundle
            $table->integer('sheets_per_bundle');
            $table->date('bundle_date');
            $table->string('bundle_packed_by')->nullable();
            // Stock
            $table->string('khana');
            $table->string('ogauge');
            $table->string('b_width');
            $table->integer('jalilenght');
            $table->string('sheet_size');
            $table->string('lot');
            $table->string('machine_id');
            $table->string('party_name');
            $table->string('stock_packed_by');
            $table->date('stock_date');
            // Order (optional)
            $table->string('order_ogauge')->nullable();
            $table->integer('order_jalilenght')->nullable();
            $table->string('cutsheet')->nullable();
            $table->string('order_lot')->nullable();
            $table->string('order_party_name')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('billa_records');
    }
};
