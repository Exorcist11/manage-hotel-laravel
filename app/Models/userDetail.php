<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'booking_id', 
        'customer_id', 
        'room_id'
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
