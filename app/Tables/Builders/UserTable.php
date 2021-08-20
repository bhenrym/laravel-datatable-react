<?php

namespace App\Tables\Builders;

use App\Tables\Contracts\Table;
use App\Tables\Traits\TableData;
use Illuminate\Support\Facades\DB;


use App\Models\User;

class UserTable implements Table
{
    // mirar consultas que sirven
    // https://desarrollowebtutorial.com/laravel-eloquent-orm-query-builder-consultas-sql/
    use TableData;

    public function query()
    {
        //Available Methods query return array not compatible collection view methods https://laravel.com/docs/8.x/queries
        //private Builder $query; in traits TableData revised
        //cuidado con db::raw or selectRaw injection sql investigar https://laravel.com/docs/8.x/queries#raw-methods
        //inject sql  http://127.0.0.1:8000/userTable/users.php?full_name='Elon Reeve'
        //return DB::table('users'); // its ok

        return DB::table('users as u')
        ->join('people as p', 'u.person_id', '=', 'p.id')
        ->join('roles as r', 'u.role_id', '=', 'r.id')
        ->select('p.type_doc', 'p.number_doc', 'p.first_name', 'p.second_name', 'p.ap_paternal', 'p.ap_maternal', 'p.address', 'p.contact', 
        'u.id', 'u.email', 'u.created_at', 'u.person_id', 'u.role_id', 'u.name_user',
        'r.name_rol',
            DB::raw('CONCAT(p.first_name," ",p.second_name) as full_name')
        );

    


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
