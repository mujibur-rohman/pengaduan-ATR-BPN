<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFk extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ms_pengaduan_klasifikasi', function(Blueprint $table){
            $table->integer('klasifikasi_id')->autoIncrement()->change();
        });
        
        Schema::table('users', function(Blueprint $table){
            $table->integer('id_user')->autoIncrement()->change();
        });
        
        Schema::table('tr_pengaduan', function (Blueprint $table) {
            $table->foreign('jenis_id')->references('jenis_id')->on('ms_pengaduan_jenis');
            $table->foreign('kanal_id')->references('kanal_id')->on('ms_pengaduan_kanal');
            $table->foreign('status_id')->references('status_id')->on('ms_pengaduan_status');
            $table->foreign('posisi_id')->references('posisi_id')->on('ms_pengaduan_posisi');
            
            $table->foreign('posisi_user_id')->references('id_user')->on('users');
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
