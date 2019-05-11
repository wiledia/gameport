<?php

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {


        \DB::table('permissions')->delete();

        \DB::table('permissions')->insert(array (
            0 =>
            array (
                'id' => 1,
                'slug' => 'access_backend',
                'name' => 'Access backend',
                'http_path' => '/
                /update/*',
                'http_method' => 'GET',
                'created_at' => '2017-01-08 23:25:26',
                'updated_at' => '2017-01-08 23:25:26',
            ),
            1 =>
            array (
                'id' => 2,
                'slug' => 'edit_games',
                'name' => 'Edit games',
                'http_path' => '/games*
                /genres*',
                'http_method' => NULL,
                'created_at' => '2017-01-09 17:12:28',
                'updated_at' => '2017-01-09 17:12:28',
            ),
            2 =>
            array (
                'id' => 3,
                'slug' => 'edit_listings',
                'name' => 'Edit Listings',
                'http_path' => '/listings*',
                'http_method' => NULL,
                'created_at' => '2017-01-09 17:12:35',
                'updated_at' => '2017-01-09 17:12:35',
            ),
            3 =>
            array (
                'id' => 4,
                'slug' => 'edit_platforms',
                'name' => 'Edit Platforms',
                'http_path' => '/platforms*
                /digital*',
                'http_method' => NULL,
                'created_at' => '2017-01-09 17:12:43',
                'updated_at' => '2017-01-16 22:31:25',
            ),
            4 =>
            array (
                'id' => 5,
                'slug' => 'edit_users',
                'name' => 'Edit Users',
                'http_path' => '/users*
                /roles*
                /permissions*',
                'http_method' => NULL,
                'created_at' => '2017-01-09 17:12:59',
                'updated_at' => '2017-01-09 17:12:59',
            ),
            5 =>
            array (
                'id' => 6,
                'slug' => 'edit_ratings',
                'name' => 'Edit Ratings',
                'http_path' => '/ratings*',
                'http_method' => NULL,
                'created_at' => '2017-01-16 22:33:47',
                'updated_at' => '2017-01-16 22:33:47',
            ),
            6 =>
            array (
                'id' => 7,
                'slug' => 'edit_settings',
                'name' => 'Edit Settings',
                'http_path' => '/settings*',
                'http_method' => NULL,
                'created_at' => '2017-01-16 22:39:43',
                'updated_at' => '2017-01-16 22:39:43',
            ),
            7 =>
            array (
                'id' => 8,
                'slug' => 'edit_translations',
                'name' => 'Edit Translations',
                'http_path' => '/language*
                /translation*',
                'http_method' => NULL,
                'created_at' => '2017-01-16 22:39:52',
                'updated_at' => '2017-01-16 22:39:52',
            ),
            8 =>
            array (
                'id' => 9,
                'slug' => 'edit_offers',
                'name' => 'Edit Offers',
                'http_path' => '/offers*
                /reports*',
                'http_method' => NULL,
                'created_at' => '2017-01-19 20:22:15',
                'updated_at' => '2017-01-19 20:22:15',
            ),
            9 =>
            array (
                'id' => 10,
                'slug' => 'edit_pages',
                'name' => 'Edit Pages',
                'http_path' => '/pages*
                /menu-item*',
                'http_method' => NULL,
                'created_at' => '2017-01-21 23:13:30',
                'updated_at' => '2017-01-21 23:13:30',
            ),
            10 =>
            array (
                'id' => 11,
                'slug' => 'edit_comments',
                'name' => 'Edit Comments',
                'http_path' => '/comments*',
                'http_method' => NULL,
                'created_at' => '2017-01-21 23:14:30',
                'updated_at' => '2017-01-21 23:14:30',
            ),
            11 =>
            array (
                'id' => 12,
                'slug' => 'edit_payments',
                'name' => 'Edit Payments',
                'http_path' => '/payments*
                /transactions*
                /withdrawals*',
                'http_method' => NULL,
                'created_at' => '2017-01-21 23:15:30',
                'updated_at' => '2017-01-21 23:15:30',
            ),
            12 =>
            array (
                'id' => 13,
                'slug' => 'edit_articles',
                'name' => 'Edit Articles',
                'http_path' => '/articles*
                /categories*
                /tags*',
                'http_method' => NULL,
                'created_at' => '2017-01-21 23:16:30',
                'updated_at' => '2017-01-21 23:16:30',
            ),
            13 =>
            array (
                'id' => 14,
                'slug' => 'access_logs',
                'name' => 'Access Logs',
                'http_path' => '/logs*',
                'http_method' => NULL,
                'created_at' => '2017-01-21 23:16:30',
                'updated_at' => '2017-01-21 23:16:30',
            ),
        ));


    }
}
