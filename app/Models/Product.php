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
 * @package App\Models
 */
class Product extends Model
{
	protected $table = 'products';

	protected $casts = [
		'price' => 'float',
		'amount' => 'int'
	];

	protected $fillable = [
		'name',
		'price',
		'amount'
	];

	public function product_rooms()
	{
		return $this->hasMany(ProductRoom::class);
	}
}
