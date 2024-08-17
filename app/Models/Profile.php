<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Profile
 * 
 * @property int $id
 * @property int $user_id
 * @property string $fullname
 * @property Carbon $birth
 * @property string $gender
 * @property string $phone_number
 * @property string $address
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User $user
 *
 * @package App\Models
 */
class Profile extends Model
{
	protected $table = 'profiles';

	protected $casts = [
		'user_id' => 'int',
		'birth' => 'datetime'
	];

	protected $fillable = [
		'user_id',
		'fullname',
		'birth',
		'gender',
		'phone_number',
		'address',
		'salary'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
