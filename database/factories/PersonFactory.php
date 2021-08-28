<?php

namespace Database\Factories;

use App\Models\Person;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PersonFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Person::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {


        //explode(" ", $this->faker->name())[0],
        //substr($this->faker->name(), 0, 7),
        return [
            'type_doc' => $this-> faker->randomElement(['Ci', 'Nit', 'Pass']),
            'number_doc' => $this-> faker->unique()->numerify('##########'), //Str::random(10),
            'first_name' => $this->faker->firstName('male' | 'female'),
            'second_name' => $this->faker->firstName('male' | 'female'),
            'ap_paternal' => $this->faker->lastName(),
            'ap_maternal' => $this->faker->lastName(),
            'address' => $this->faker->address(),
            'contact' => $this->faker->phoneNumber(),


        ];
    }
}
