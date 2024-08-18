<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookingDetail
 * 
 * @property int $id
 * @property int $booking_id
 * @property int $room_id
 * @property Carbon $check_in
 * @property Carbon $check_out
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Booking $booking
 * @property Room $room
 *
 * @package App\Models
 */
class BookingDetail extends Model
{
	protected $table = 'booking_details';

	protected $casts = [
		'booking_id' => 'int',
        'room_id' => 'int',
        'check_in' => 'datetime',
        'check_out' => 'datetime',
        'is_check_in' => 'boolean',
        'is_check_out' => 'boolean'
	];

	protected $fillable = [
		'booking_id',
        'room_id',
        'check_in',
        'check_out',
        'is_check_in',
        'is_check_out'
	];

	public function booking()
	{
		return $this->belongsTo(Booking::class);
	}

	public function room()
	{
		return $this->belongsTo(Room::class);
	}

	public function bill()
	{
		return $this->hasOne(Bill::class);
	}

	public function product_services()
	{
		return $this->hasMany(ProductServices::class);
	}
}
