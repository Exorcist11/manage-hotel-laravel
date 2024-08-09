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

	const METHODS = [
		0 => 'Tiền mặt',
		1 => 'Chuyển khoản'
	];

	protected $casts = [
		'payment_method' => 'int',
		'booking_id' => 'int',
		'total' => 'float'
	];

	protected $fillable = [
		'booking_id',
		'total',
		'payment_method'
	];

	public function room()
	{
		return $this->belongsTo(Room::class);
	}

	public function getStatusAttribute($value)
    {
        return self::METHODS[$value];
    }

    public function setStatusAttribute($value)
    {
        $payment_method = array_search($value, self::METHODS);
        if ($payment_method !== false) {
            $this->attributes['payment_method'] = $payment_method;
        }
    }
}
