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
        Schema::table('bills', function (Blueprint $t) {
            $t->dropForeign(['booking_id']);
            $t->renameColumn('booking_id', 'room_id');
            $t->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bills', function (Blueprint $t) {
            $t->dropForeign(['room_id']);
            $t->renameColumn('room_id', 'booking_id');
            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('cascade');
        });
    }
};
