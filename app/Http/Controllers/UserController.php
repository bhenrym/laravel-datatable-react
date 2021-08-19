<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Tables\Builders\UserTable;

class UserController extends Controller
{
    //

    public function dataTable()
    {
        return response()->json([
            'collection' => (new UserTable)->advancedFilters(),
            'request' =>request()->all()
        ]);
    }
}
