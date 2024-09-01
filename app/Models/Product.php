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
 * @property int $quantity
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
		'quantity' => 'int'
	];

	protected $fillable = [
		'name',
		'price',
		'quantity',
		'image',
		'detail'
	];

	public function product_services()
	{
		return $this->hasMany(ProductService::class);
	}
}
