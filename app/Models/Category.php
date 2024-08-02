<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 * 
 * @property int $id
 * @property string $name
 * @property int $max_occupancy
 * @property float $size
 * @property string|null $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Room[] $rooms
 *
 * @package App\Models
 */
class Category extends Model
{
    protected $table = 'categories';

    protected $casts = [
        'max_occupancy' => 'int',
        'size' => 'float'
    ];

    protected $fillable = [
        'name',
        'max_occupancy',
        'size',
        'description',
        'image'
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
