<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Customer
 * 
 * @property int $id
 * @property string $fullname
 * @property Carbon $birth
 * @property string $gender
 * @property string $phone_number
 * @property string $address
 * @property string $citizen_number
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Booking[] $bookings
 *
 * @package App\Models
 */
class Customer extends Model
{
	protected $table = 'customers';

	protected $casts = [
		'birth' => 'datetime'
	];

	protected $fillable = [
		'fullname',
		'birth',
		'gender',
		'phone_number',
		'address',
		'citizen_number'
	];

	public function bookings()
	{
		return $this->hasMany(Booking::class);
	}
}
