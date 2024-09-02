<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('product_services');
        Schema::dropIfExists('products');

        Schema::create('services', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->decimal('price', 12, 2);

            $table->timestamps();
        });

        Schema::create('booking_services', function(Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('booking_detail_id');
            $table->unsignedInteger('service_id');

            $table->timestamps();

            $table->foreign('booking_detail_id')->references('id')->on('booking_details')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->text('detail')->nullable();
            $table->decimal('price', 12, 2);
            $table->integer('quantity');
            $table->string('image');

            $table->timestamps();
        });

        Schema::create('product_services', function (Blueprint $table){
            $table->increments('id');
            $table->integer('amount');
            $table->unsignedInteger('booking_detail_id');
            $table->unsignedInteger('product_id');

            $table->timestamps();
        });

        Schema::dropIfExists('services');
        Schema::dropIfExists('booking_services');
    }
};
