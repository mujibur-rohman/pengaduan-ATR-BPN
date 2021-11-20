<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFkDokumen extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tr_pengaduan_dokumen', function (Blueprint $table) {
            $table->foreign('pengaduan_id')->references('pengaduan_id')->on('tr_pengaduan');
        });
        
        DB::statement('delete from tr_pengaduan_log
            where pengaduan_id not in (
                    select pengaduan_id from tr_pengaduan
            )');
        
        Schema::table('tr_pengaduan_log', function (Blueprint $table) {
            $table->foreign('pengaduan_id')->references('pengaduan_id')->on('tr_pengaduan');
            $table->foreign('id_status')->references('status_id')->on('ms_pengaduan_status');
            $table->foreign('id_posisi')->references('posisi_id')->on('ms_pengaduan_posisi');
            $table->foreign('user_id')->references('id_user')->on('users');
        });
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
