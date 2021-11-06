<?php

use Illuminate\Database\Migrations\Migration;

class UpdateRoleName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        DB::table('roles')
              ->where('id_role', 2)
              ->update(['name' => 'verifikator']);
        
        DB::table('roles')
              ->where('id_role', 3)
              ->update(['name' => 'responder']);
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
