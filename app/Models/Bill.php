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
		'payment_method' => 'int'
	];

	protected $fillable = [
		'booking_detail_id',
		'total',
		'payment_method'
	];

	public function booking_detail()
	{
		return $this->belongsTo(BookingDetail::class);
	}

	// Get accessor for payment_method attribute
    public function getPaymentMethodAttribute($value)
    {
        return self::METHODS[$value] ?? null;
    }

    // Set accessor for payment_method attribute
    public function setPaymentMethodAttribute($value)
    {
        $paymentMethod = array_search($value, self::METHODS);
        if ($paymentMethod !== false) {
            $this->attributes['payment_method'] = $paymentMethod;
        } else {
            // Handle invalid payment method if necessary
            throw new \InvalidArgumentException("Invalid payment method: $value");
        }
    }
}
