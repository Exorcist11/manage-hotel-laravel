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
            $table->date('birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other']);
            $table->string('phone_number');
            $table->string('address');
            $table->decimal('salary', 13, 2);
            $table->unsignedInteger('user_id');

            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->nullable();
            $table->string('password')->nullable();
            $table->unsignedTinyInteger('role')->default(0);
            $table->boolean('deactive')->default(false);

            $table->timestamps();
        });

        Schema::create('orders', function(Blueprint $table) {
            $table->increments('id');
            $table->string('fullname');
            $table->string('phone');
            $table->string('citizen_number');
            $table->integer('number_of_rooms');
            $table->string('email');
            $table->unsignedInteger('category_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->unsignedTinyInteger('status')->default(0);

            $table->timestamps();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->integer('max_occupancy');
            $table->float('size');
            $table->text('description')->nullable();
            $table->decimal('price', 12, 2);
            $table->string('image');
            $table->string('utilities')->nullable();

            $table->timestamps();
        });

        Schema::create('rooms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('room_no')->unique();
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
            $table->decimal('total', 13, 2);
            $table->unsignedTinyInteger('payment_method')->nullable();
            $table->unsignedInteger('booking_detail_id');

            $table->timestamps();
        });

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
        Schema::dropIfExists('product_services');
    }
};
