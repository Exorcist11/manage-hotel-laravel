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
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('price', 12, 2)->change();
        });

        Schema::table('bills', function(Blueprint $table) {
            $table->decimal('total', 12, 2)->change();
        });
        
        Schema::table('rooms', function(Blueprint $table) {
            $table->decimal('price', 12, 2)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('price', 8, 2)->change();
        });

        Schema::table('bills', function(Blueprint $table) {
            $table->decimal('total', 8, 2)->change();
        });
        
        Schema::table('rooms', function(Blueprint $table) {
            $table->decimal('price', 8, 2)->change();
        });
    }
};
