<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('billa_records', function (Blueprint $table) {
			$table->dateTime('order_created_at')->nullable()->after('created_at');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('billa_records', function (Blueprint $table) {
			$table->dropColumn('order_created_at');
		});
	}
};

