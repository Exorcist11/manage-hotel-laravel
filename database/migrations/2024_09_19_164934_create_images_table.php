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
        Schema::table('categories', function (Blueprint $table) {
            $table->string('list_images')->nullable();
            $table->string('image')->nullable()->change();
        });

        Schema::create('images', function (Blueprint $table) {
            $table->increments('id');
            $table->string('url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
        
        Schema::table('categories', function(Blueprint $table) {
            $table->dropColumn('list_images');
            $table->string('image')->nullable(false)->change();
        });
    }
};
