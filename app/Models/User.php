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

	const ROLES = [
		0 => 'Nhân viên',
		1 => 'Quản lý',
		2 => 'Lễ tân'
	];

	protected $casts = [
        'role' => 'integer',
    ];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'email',
		'password',
		'role'
	];

	public function bookings()
	{
		return $this->hasMany(Booking::class, 'staff_id');
	}

	public function profile()
	{
		return $this->hasOne(Profile::class);
	}

    public function getRoleAttribute($value)
    {
        return self::ROLES[$value];
    }

    public function setRoleAttribute($value)
    {
        $role = array_search($value, self::ROLES);
        if ($role !== false) {
            $this->attributes['role'] = $role;
        }
    }
}
