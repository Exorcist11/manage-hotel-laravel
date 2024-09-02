<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class Service extends Model
{
    protected $table = 'services';

	protected $casts = [
		'booking_id' => 'int',
	];

	protected $fillable = [
		'title',
		'price'
	];

    public function booking_services()
	{
		return $this->hasMany(BookingService::class);
	}
}
