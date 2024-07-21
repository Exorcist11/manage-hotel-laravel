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
        Schema::table('profiles', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->foreign('staff_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade'); 
        });

        Schema::table('booking_details', function (Blueprint $t) {
            $t->foreign('booking_id')->references('id')->on('bookings')->onDelete('cascade');
            $t->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
        });

        Schema::table('bills', function (Blueprint $t) {
            $t->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
        });

        Schema::table('products', function (Blueprint $t) {
            $t->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['staff_id']);
            $table->dropForeign(['customer_id']);
        });

        Schema::table('booking_details', function (Blueprint $t) {
            $t->dropForeign(['booking_id']);
            $t->dropForeign(['room_id']);
        });

        Schema::table('bills', function (Blueprint $t) {
            $t->dropForeign(['room_id']);
        });

        Schema::table('products', function (Blueprint $t) {
            $t->dropForeign('room_id');
        });
    }
};
