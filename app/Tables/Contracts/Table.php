<?php

namespace App\Tables\Contracts;

use Illuminate\Database\Eloquent\Builder;


interface Table
{
    public function query(): Builder;
}
