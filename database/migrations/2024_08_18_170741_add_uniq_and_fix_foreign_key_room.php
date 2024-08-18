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
        Schema::table('rooms', function (Blueprint $table){
            $table->dropForeign(['category_id']);
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->unique('room_no');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->unique('name');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->unique('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropUnique(['room_no']);
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropUnique(['name']);
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropUnique(['name']);
        });
    }
};
