<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('billa_records', function (Blueprint $table) {
            $table->string('printed_billa_type')->nullable();
            $table->integer('printed_billa_quantity')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('billa_records', function (Blueprint $table) {
            $table->dropColumn(['printed_billa_type', 'printed_billa_quantity']);
        });
    }
};
