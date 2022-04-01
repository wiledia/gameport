<?php

use Illuminate\Database\Seeder;

class LanguagesTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('languages')->delete();

        \DB::table('languages')->insert([
            0 => [
                'id' => 1,
                'name' => 'English',
                'app_name' => 'english',
                'flag' => null,
                'abbr' => 'en',
                'script' => 'Latn',
                'native' => 'English',
                'active' => 1,
                'default' => 1,
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null,
            ],
            1 => [
                'id' => 2,
                'name' => 'German',
                'app_name' => 'german',
                'flag' => null,
                'abbr' => 'de',
                'script' => 'Latn',
                'native' => 'Deutsch',
                'active' => 1,
                'default' => 0,
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null,
            ],
        ]);
    }
}
