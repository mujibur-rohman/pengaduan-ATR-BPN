<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAdminUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->insert('admin_dki', 'admin.dki@example.com', 'Andi Admin DKI', 1, 1, '111');
    }

    public function insert($username, $email, $fullname, $role_id, $posisi_id, $flag_role) {
        $password = '$2y$10$X47ny1D2gBbnxjs1Nc9ic.9G2XPUFhiv9a0CDqpv4iNPxdDJ3hNG2';
        DB::table('users')->insert(
            array(
                'username' => $username,
                'email' => $email,
                'password' => $password,
                'id_role' => $role_id,
                'posisi_id' => $posisi_id,
                'flag_role' => $flag_role,
                'fullname' => $fullname,
                
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            )
        );
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
