<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Bill
 * 
 * @property int $id
 * @property int $room_id
 * @property string $custom_name
 * @property float $total
 * @property Carbon $check_in
 * @property Carbon $check_out
 * @property string $payment_method
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Room $room
 *
 * @package App\Models
 */
class Bill extends Model
{
	protected $table = 'bills';

	protected $casts = [
		'room_id' => 'int',
		'total' => 'float',
		'check_in' => 'datetime',
		'check_out' => 'datetime'
	];

	protected $fillable = [
		'room_id',
		'custom_name',
		'total',
		'check_in',
		'check_out',
		'payment_method'
	];

	public function room()
	{
		return $this->belongsTo(Room::class);
	}
}
