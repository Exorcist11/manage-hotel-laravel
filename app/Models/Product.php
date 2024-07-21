<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Product
 * 
 * @property int $id
 * @property int $room_id
 * @property string $name
 * @property float $price
 * @property int $amount
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Room $room
 *
 * @package App\Models
 */
class Product extends Model
{
	protected $table = 'products';

	protected $casts = [
		'room_id' => 'int',
		'price' => 'float',
		'amount' => 'int'
	];

	protected $fillable = [
		'room_id',
		'name',
		'price',
		'amount'
	];

	public function room()
	{
		return $this->belongsTo(Room::class);
	}
}
