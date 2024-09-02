<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingService extends Model
{
    protected $table = 'booking_services';

	protected $casts = [
		'booking_detail_id' => 'int',
		'service_id' => 'int'
	];

	protected $fillable = [
		'booking_detail_id',
		'service_id'
	];

	public function booking_detail()
	{
		return $this->belongsTo(BookingDetail::class);
	}
    
	public function service()
	{
		return $this->belongsTo(Service::class);
	}
}
