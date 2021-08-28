<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_rol',
        'description'
    ];
    //public $timestamps = false;



    public function users()  // plural por que un rol lo tiene muchos usuarios
    {
        //un rol lo tiene muchos usuarios
        return $this->hasMany(App\Models\User::class);
    }
}
