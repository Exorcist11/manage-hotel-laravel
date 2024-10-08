<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class Order
 * 
 * @property int $id
 * @property string $fullname
 * @property Carbon $birth
 * @property string $gender
 * @property string $phone
 * @property string $address
 * @property string $citizen_number
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Booking[] $bookings
 *
 * @package App\Models
 */
class Order extends Model
{
	protected $table = 'orders';

	const STATUSES = [
		0 => 'Đang chờ xử lý',
		1 => 'Chấp nhận',
		2 => 'Từ chối',
		3 => 'Đặt tại quầy'
	];

	protected $casts = [
		'status' => 'integer',
		'start_date' => 'date',
		'end_date' => 'date'
	];

	protected $fillable = [
		'fullname',
		'phone',
		'citizen_number',
		'email',
		'category_id',
		'number_of_rooms', 
		'start_date',
		'end_date',
		'status'
	];

	public function booking()
	{
		return $this->hasOne(Booking::class);
	}

	public function getStatusAttribute($value)
    {
        return self::STATUSES[$value];
    }

    public function setStatusAttribute($value)
    {
        $status = array_search($value, self::STATUSES);
        if ($status !== false) {
            $this->attributes['status'] = $status;
        }
    }

	public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 0);
    }

	public function scopeAccept(Builder $query): Builder
    {
        return $query->where('status', 1);
    }

	public function scopeReject(Builder $query): Builder
    {
        return $query->where('status', 2);
    }

	public function scopeCounter(Builder $query): Builder
	{
		return $query->where('status', 3);
	}
}
