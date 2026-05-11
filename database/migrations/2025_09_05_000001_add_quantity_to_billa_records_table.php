<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddQuantityToBillaRecordsTable extends Migration
{
    public function up()
    {
        Schema::table('billa_records', function (Blueprint $table) {
            $table->integer('quantity')->nullable();
        });
    }

    public function down()
    {
        Schema::table('billa_records', function (Blueprint $table) {
            $table->dropColumn('quantity');
        });
    }
}
