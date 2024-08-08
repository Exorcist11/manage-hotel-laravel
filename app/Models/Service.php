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
		'description',
        'price',
		'booking_id'
	];

    public function booking()
	{
		return $this->belongsTo(Booking::class);
	}
}
