<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $table = 'people';

    public $timestamps = false;

    protected $fillable = [
        'type_doc',
        'number_doc',
        'first_name',
        'second_name',
        'ap_paternal',
        'ap_maternal',
        'address',
        'contact',
    ];

    public function user()
    {
        // una persona tiene un usuario
        return $this->hasOne(App\Models\User::class);
    }
}
