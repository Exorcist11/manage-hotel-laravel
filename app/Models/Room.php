<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Room
 * 
 * @property int $id
 * @property string $room_no
 * @property int $max_number
 * @property float $price
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Bill[] $bills
 * @property Collection|BookingDetail[] $booking_details
 * @property Collection|Product[] $products
 *
 * @package App\Models
 */
class Room extends Model
{
	protected $table = 'rooms';

	protected $casts = [
		'max_number' => 'int',
		'price' => 'float'
	];

	protected $fillable = [
		'room_no',
		'max_number',
		'price'
	];

	public function bills()
	{
		return $this->hasMany(Bill::class);
	}

	public function booking_details()
	{
		return $this->hasMany(BookingDetail::class);
	}

	public function product_rooms()
	{
		return $this->hasMany(ProductRoom::class);
	}

	public function category()
	{
		return $this->belongsTo(Category::class);
	}
}
