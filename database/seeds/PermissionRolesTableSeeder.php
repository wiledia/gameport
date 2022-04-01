<?php

use Illuminate\Database\Seeder;

class PermissionRolesTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('permission_roles')->delete();

        \DB::table('permission_roles')->insert([
            0 => [
                'permission_id' => 1,
                'role_id' => 1,
            ],
            1 => [
                'permission_id' => 1,
                'role_id' => 2,
            ],
            2 => [
                'permission_id' => 2,
                'role_id' => 1,
            ],
            3 => [
                'permission_id' => 2,
                'role_id' => 2,
            ],
            4 => [
                'permission_id' => 3,
                'role_id' => 1,
            ],
            5 => [
                'permission_id' => 3,
                'role_id' => 2,
            ],
            6 => [
                'permission_id' => 4,
                'role_id' => 1,
            ],
            7 => [
                'permission_id' => 4,
                'role_id' => 2,
            ],
            8 => [
                'permission_id' => 5,
                'role_id' => 1,
            ],
            9 => [
                'permission_id' => 6,
                'role_id' => 1,
            ],
            10 => [
                'permission_id' => 7,
                'role_id' => 1,
            ],
            11 => [
                'permission_id' => 8,
                'role_id' => 1,
            ],
            12 => [
                'permission_id' => 9,
                'role_id' => 1,
            ],
            13 => [
                'permission_id' => 10,
                'role_id' => 1,
            ],
            14 => [
                'permission_id' => 11,
                'role_id' => 1,
            ],
            15 => [
                'permission_id' => 12,
                'role_id' => 1,
            ],
            16 => [
                'permission_id' => 13,
                'role_id' => 1,
            ],
            17 => [
                'permission_id' => 14,
                'role_id' => 1,
            ],
        ]);
    }
}
