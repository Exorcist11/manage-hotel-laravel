<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

/**
 * Class User
 * 
 * @property int $id
 * @property string $email
 * @property string $password
 * @property bool $is_admin
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Booking[] $bookings
 * @property Collection|Profile[] $profiles
 *
 * @package App\Models
 */
class User extends Authenticatable implements AuthenticatableContract
{
	protected $table = 'users';

	protected $casts = [
		'is_admin' => 'bool'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'email',
		'password',
		'is_admin'
	];

	public function bookings()
	{
		return $this->hasMany(Booking::class, 'staff_id');
	}

	public function profiles()
	{
		return $this->hasOne(Profile::class);
	}
}
