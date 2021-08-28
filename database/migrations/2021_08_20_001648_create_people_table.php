<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('people', function (Blueprint $table) {
            $table->increments('id');

            $table->string('type_doc', 20);
            $table->string('number_doc', 20);
            $table->string('first_name', 20);
            $table->string('second_name', 20)->nullable();
            $table->string('ap_paternal', 20);
            $table->string('ap_maternal', 20);
            $table->string('address', 300);
            $table->string('contact', 25);
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
        Schema::dropIfExists('people');
    }
}
