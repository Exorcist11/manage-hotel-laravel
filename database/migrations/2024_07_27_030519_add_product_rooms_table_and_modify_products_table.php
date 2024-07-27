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
        Schema::create('product_rooms', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('product_id');
            $table->unsignedInteger('room_id');
            $table->integer('amount');
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['room_id']);
            $table->dropColumn('room_id');
            $table->string('image')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_rooms');

        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('room_id')->nullable();
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
            $table->dropColumn('image');
        });
    }
};
