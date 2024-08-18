<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Product
 * 
 * @property int $id
 * @property int $amount
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Product $product
 * @property Room $room
 *
 * @package App\Models
 */
class ProductRoom extends Model
{
    protected $table = 'product_rooms';

    protected $fillable = [
        'product_id',
        'room_id',
        'amount'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function booking_detail()
    {
        return $this->belongsTo(BookingDetail::class);
    }
}
