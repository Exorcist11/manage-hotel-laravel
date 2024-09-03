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
 * @property int $floor
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
		'floor' => 'int',
	];

	protected $fillable = [
		'room_no',
		'floor',
		'category_id'
	];

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

	public function unavailable()
	{
		return $this->booking_details()->where('is_check_in', true)->where('is_check_out', false)->exists();
	}
}
