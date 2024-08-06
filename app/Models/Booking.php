<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Booking
 * 
 * @property int $id
 * @property int $staff_id
 * @property int $customer_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Customer $customer
 * @property User $user
 * @property Collection|BookingDetail[] $booking_details
 *
 * @package App\Models
 */
class Booking extends Model
{
	protected $table = 'bookings';

	protected $casts = [
		'staff_id' => 'int',
		'order_id' => 'int'
	];

	protected $fillable = [
		'staff_id',
		'order_id'
	];

	public function customer()
	{
		return $this->belongsTo(Order::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'staff_id');
	}

	public function booking_details()
	{
		return $this->hasMany(BookingDetail::class);
	}
}
