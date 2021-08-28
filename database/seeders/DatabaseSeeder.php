<?php


use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Provider\bg_BG\Person;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */


    public function run()
    {

        \App\Models\Person::factory(20)->create();

        // DB::table('people')->insert([
        //     'id'=> 1,
        //     'type_doc'=>'Ci',
        //     'number_doc'=>'11070630',
        //     'first_name'=>'Henry',
        //     'second_name'=>'Jhonny',
        //     'ap_paternal'=>'Bautista',
        //     'ap_maternal'=>'Mamani',
        //     'address'=>'Av. juan pablo II calle jose arabe',
        //     'contact'=>'77702824'
        // ]);

        // DB::table('people')->insert([
        //     'id'=> 2,
        //     'type_doc'=>'Ci',
        //     'number_doc'=>'123456789',
        //     'first_name'=>'Julio',
        //     'second_name'=>'Eduardo',
        //     'ap_paternal'=>'Paredes',
        //     'ap_maternal'=>'Ramos',
        //     'address'=>'Calle extranca los montes',
        //     'contact'=>'77262115'
        // ]);


        // DB::table('people')->insert([
        //     'id'=> 3,
        //     'type_doc'=>'Ci',
        //     'number_doc'=>'6046805',
        //     'first_name'=>'William',
        //     'second_name'=>'Henry',
        //     'ap_paternal'=>'Bill',
        //     'ap_maternal'=>'Gates',
        //     'address'=>'Washington',
        //     'contact'=>'247262115'
        // ]);

        // DB::table('people')->insert([
        //     'id'=> 4,
        //     'type_doc'=>'Ci',
        //     'number_doc'=>'123123454',
        //     'first_name'=>'Evan',
        //     'second_name'=>'',
        //     'ap_paternal'=>'You',
        //     'ap_maternal'=>'Nat',
        //     'address'=>'Livingston, New Jersey',
        //     'contact'=>'77262115'
        // ]);

        // DB::table('people')->insert([
        //     'id'=> 5,
        //     'type_doc'=>'Nit',
        //     'number_doc'=>'11788451',
        //     'first_name'=>'Elon',
        //     'second_name'=>'Reeve',
        //     'ap_paternal'=>'Mosk',
        //     'ap_maternal'=>'Maye',
        //     'address'=>'Estado de florida',
        //     'contact'=>'22587445'
        // ]);

        // DB::table('people')->insert([
        //     'id'=> 6,
        //     'type_doc'=>'Pass',
        //     'number_doc'=>'123123454',
        //     'first_name'=>'Luis',
        //     'second_name'=>'Julian',
        //     'ap_paternal'=>'Bautista',
        //     'ap_maternal'=>'Romero',
        //     'address'=>'Calle copacabana',
        //     'contact'=>'77702569'
        // ]);



        // //******************************************************************** */



        // //Entidad::create();  // no funciona por convencion de laravel result=entidads

        // //********************************************************************** */
        // //Rol::create([]);
        // DB::table('roles')->insert([
        //     'id' => 1,
        //     'name_rol' => 'Administrador',
        //     'description' => 'Encargado de administrar el sistema'
        // ]);

        // DB::table('roles')->insert([
        //     'id' => 2,
        //     'name_rol' => 'Invitado',
        //     'description' => 'Encargado de registrar mascotas'
        // ]);

        // //***************************************************************************** */

        // DB::table('users')->insert([
        //     'id' => 1,
        //     'name_user' => 'Henry',
        //     'email' => 'henryingsis61@gmail.com',
        //     'password' => Hash::make('123456789'),
        //     'person_id' => 1,
        //     'role_id' => 1,
        // ]);

        // DB::table('users')->insert([
        //     'id' => 2,
        //     'name_user' => 'Julio',
        //     'email' => 'pipoangelitos@gmail.com',
        //     'password' => Hash::make('123456789'),
        //     'person_id' => 2,
        //     'role_id' => 2,
        // ]);

        // DB::table('users')->insert([
        //     'id' => 3,
        //     'name_user' => 'William',
        //     'email' => 'william@gmail.com',
        //     'password' => Hash::make('123456789'),
        //     'person_id' => 3,
        //     'role_id' => 2,
        // ]);

        // DB::table('users')->insert([
        //     'id' => 4,
        //     'name_user' => 'Evan',
        //     'email' => 'evan_you@gmail.com',
        //     'password' => Hash::make('123456789'),
        //     'person_id' => 4,
        //     'role_id' => 2,
        // ]);

        // DB::table('users')->insert([
        //     'id' => 5,
        //     'name_user' => 'Elon',
        //     'email' => 'elo_mosk@gmail.com',
        //     'password' => Hash::make('123456789'),
        //     'person_id' => 5,
        //     'role_id' => 2,
        // ]);

        // DB::table('users')->insert([
        //     'id' => 6,
        //     'name_user' => 'Luis',
        //     'email' => 'julianingsis61@gmail.com',
        //     'password' => Hash::make('123456789'),
        //     'person_id' => 6,
        //     'role_id' => 1,
        // ]);

        //$this->call(CategoriaSeeder::class);




        //********************************************************************** */







    }
}
