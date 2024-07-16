<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class users extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname', 
        'birthday', 
        'gender', 
        'email', 
        'phone_number', 
        'address', 
        'role_id'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
