<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFkRespon extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tr_pengaduan_respon', function(Blueprint $table){
            $table->integer('respon_id')->autoIncrement()->change();
        });
        
        Schema::table('tr_pengaduan_respon', function (Blueprint $table) {
            $table->foreign('pengaduan_id')->references('pengaduan_id')->on('tr_pengaduan');
            $table->foreign('posisi_id')->references('posisi_id')->on('ms_pengaduan_posisi');
            $table->foreign('user_id')->references('id_user')->on('users');
        });
        
        Schema::table('tr_pengaduan_respon_dokumen', function (Blueprint $table) {
            $table->foreign('respon_id')->references('respon_id')->on('tr_pengaduan_respon');
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
