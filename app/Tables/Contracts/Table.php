<?php

namespace App\Tables\Contracts;

//use Illuminate\Database\Eloquent\Builder;

use Illuminate\Database\Query\Builder;
interface Table
{
    //public function query(): Builder;
    public function query();
}
