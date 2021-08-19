<?php

namespace App\Tables\Builders;

//use App\Tables\Contracts\Table;
use App\Tables\Traits\TableData;
use Illuminate\Support\Facades\DB;


use App\Models\User;


class UserTable
{
    // mirar consultas que sirven
    // https://desarrollowebtutorial.com/laravel-eloquent-orm-query-builder-consultas-sql/
    use TableData;

    public function query()
    {
        //Available Methods query return array not compatible collection view methods https://laravel.com/docs/8.x/queries
        //private Builder $query; in traits TableData revised
        //cuidado con db::raw or selectRaw injection sql investigar https://laravel.com/docs/8.x/queries#raw-methods
        return DB::table('users'); // its bad


        //Available Methods collection in builder https://laravel.com/docs/8.x/collections
        //return User::selectRaw('users.id, users.name, users.email ,users.created_at'); //it ok

    }

    protected $allowedFilters = [
        //users ==> u consider as in in query and in the component to list in filterColumns
        'u.id' ,
        'u.name',
        'u.email',
        'u.created_at',

    ];
    protected $orderable = [
        //users  do not consider as ==> u not in sorting nor in columns component
        'id' ,
        'name',
        'email',
        'created_at',
    ];
}
