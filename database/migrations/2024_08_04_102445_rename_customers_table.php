<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename('customers', 'orders');

        Schema::table('orders', function (Blueprint $t) {
            $t->dropColumn('address');
            $t->dropColumn('birth');
            
            $t->string('email')->nullable();
            $t->unsignedInteger('category_id');
            $t->integer('number_of_rooms');
            $t->date('start_date');
            $t->date('end_date');
            $t->unsignedTinyInteger('status')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $t) {
            $t->dropColumn(['email', 'category_id', 'number_of_rooms', 'start_date', 'end_date', 'status']);
            $table->date('birth');
            $t->string('address');
        });

        Schema::rename('orders', 'customers');
    }
};
