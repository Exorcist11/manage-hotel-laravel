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
        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('fullname');
            $table->date('birth');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->string('phone_number');
            $table->string('address');
            $table->unsignedInteger('user_id');
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email');
            $table->string('password');
            $table->unsignedTinyInteger('role')->default(0);
        });

        Schema::create('orders', function(Blueprint $table) {
            $table->increments('id');
            $table->string('fullname');
            $table->string('phone');
            $table->string('citizen_number');
            $table->integer('number_of_rooms');
            $table->string('email')->nullable();
            $table->unsignedInteger('category_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->unsignedTinyInteger('status')->default(0);
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('max_occupancy');
            $table->float('size');
            $table->text('description')->nullable();
            $table->string('image');
            $table->timestamps();
        });

        Schema::create('rooms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('room_no');
            $table->integer('floor');
            $table->unsignedInteger('category_id');
            $table->timestamps();
        });

        Schema::create('bookings', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('staff_id');
            $table->unsignedInteger('order_id');
            $table->timestamps();
        });

        Schema::create('booking_details', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('booking_id');
            $table->unsignedInteger('room_id');
            $table->dateTime('check_in');
            $table->dateTime('check_out');
            $table->boolean('is_check_in')->default(false);
            $table->boolean('is_check_out')->default(false);
            $table->timestamps();
        });

        Schema::create('bills', function (Blueprint $table) {
            $table->increments('id');
            $table->decimal('total', 13, 2)->nullable();
            $table->unsignedTinyInteger('payment_method');
            $table->unsignedInteger('booking_detail_id');
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->text('detail')->nullable();
            $table->integer('quantity');
            $table->unsignedInteger('booking_detail_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
        Schema::dropIfExists('users');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('categories');

        Schema::dropIfExists('rooms');
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('booking_details');
        Schema::dropIfExists('bills');
        Schema::dropIfExists('products');
    }
};
