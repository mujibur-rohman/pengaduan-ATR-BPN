<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreateViewUserData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('CREATE VIEW view_user_posisi AS
            select t.id_user, t.username, r.name as role_name, t.fullname, 
            pc.parent_id, pp.nama_posisi as parent_wilayah, 
            t.posisi_id, pc.nama_posisi, t.flag_role,
            substr(t.flag_role, 1, 1) as r1, substr(t.flag_role, 2, 1) as r2, substr(t.flag_role, 3, 1) as r3
            from users as t
            join roles as r on t.id_role = r.id_role
            join ms_pengaduan_posisi as pc on t.posisi_id = pc.posisi_id
            left join ms_pengaduan_posisi as pp on pc.parent_id = pp.posisi_id
        ');
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
