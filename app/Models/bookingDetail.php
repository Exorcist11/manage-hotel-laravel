<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bookingDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'room_id',
        'unit',
        'price'
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
