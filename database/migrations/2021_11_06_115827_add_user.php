<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        
        // $username, $email, $fullname, $role_id, $posisi_id, $flag_role
        // user kanwil
        $this->insert('kanwil_dki_ver', 'kanwil.ver.dki@example.com', 'Andi Verifikator DKI', 2, 2, '011');
        $this->insert('kanwil_jabar_ver', 'kanwil.ver.jabar@example.com', 'Budi Verifikator JABAR', 2, 5, '011');
        
        // user kantah
        $this->insert('kantah_jakut_res', 'kantah.res.jakut@example.com', 'Iwan Responder JAKUT', 3, 3, '001');
        $this->insert('kantah_jakbar_res', 'kanwil.res.jakbar@example.com', 'Dodi Responder JAKBAR', 3, 4, '001');
        
        $this->insert('kantah_bdg_res', 'kanwil.res.bdg@example.com', 'Asep Responder BANDUNG', 3, 6, '001');
        $this->insert('kantah_bgr_res', 'kanwil.res.bgr@example.com', 'Boby Responder BOGOR', 3, 7, '001');
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
