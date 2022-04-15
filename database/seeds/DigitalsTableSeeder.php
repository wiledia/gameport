<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DigitalsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('digitals')->delete();

        \DB::table('digitals')->insert([
            0 => [
                'id' => 1,
                'name' => 'Steam',
                'description' => null,
                'deleted_at' => null,
                'created_at' => '2017-01-15 12:33:48',
                'updated_at' => '2017-01-15 12:33:48',
            ],
            1 => [
                'id' => 2,
                'name' => 'Origin',
                'description' => null,
                'deleted_at' => null,
                'created_at' => '2017-01-15 12:33:55',
                'updated_at' => '2017-01-15 12:33:55',
            ],
            2 => [
                'id' => 3,
                'name' => 'Battle.net',
                'description' => null,
                'deleted_at' => null,
                'created_at' => '2017-01-15 12:34:03',
                'updated_at' => '2017-01-15 12:34:03',
            ],
            3 => [
                'id' => 4,
                'name' => 'Uplay',
                'description' => null,
                'deleted_at' => null,
                'created_at' => '2017-01-15 12:34:11',
                'updated_at' => '2017-01-15 12:34:11',
            ],
            4 => [
                'id' => 5,
                'name' => 'PlayStation Network',
                'description' => null,
                'deleted_at' => null,
                'created_at' => '2017-01-15 12:34:19',
                'updated_at' => '2017-01-15 12:34:19',
            ],
            5 => [
                'id' => 6,
                'name' => 'Xbox Live',
                'description' => null,
                'deleted_at' => null,
                'created_at' => '2017-01-15 12:34:27',
                'updated_at' => '2017-01-15 12:34:27',
            ],
            6 => [
                'id' => 7,
                'name' => 'Nintendo eShop',
                'description' => null,
                'deleted_at' => null,
                'created_at' => '2017-01-15 12:34:38',
                'updated_at' => '2017-01-15 12:34:38',
            ],
        ]);
    }
}
