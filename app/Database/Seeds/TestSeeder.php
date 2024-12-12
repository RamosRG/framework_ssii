<?php


namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class TestSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'name'       => 'John Doe',
            'FirstName'       => 'Don',
            'LastName'       => 'Don',
            'password'   => password_hash('password', PASSWORD_DEFAULT),
            'fk_department'       => 14,
            'status'     => 1,
            'fk_role'       => 2,
            'email'      => 'john.doe@example.com',
            'fk_role'    => 1,
        ];
        $this->db->table('users')->insert($data);
    }
}
