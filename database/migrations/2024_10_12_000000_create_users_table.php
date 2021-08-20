<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       
        Schema::create('users', function (Blueprint $table) {

            $table->increments('id');
            
            $table->integer('person_id')->unsigned();
            $table->foreign('person_id')->references('id')->on('people');

            $table->integer('role_id')->unsigned();
            $table->foreign('role_id')->references('id')->on('roles');
            
            //$table->string('usuario')->unique();
            $table->string('name_user');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
       

            $table->boolean('state_user')->default(1);

            $table->rememberToken();
            $table->timestamps();

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}