<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePengaduanKlasifikasi extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ms_pengaduan_klasifikasi', function(Blueprint $table){
            $table->increments('klasifikasi_id');
            $table->string('nama_klasifikasi', 255);
        });
        
        DB::table('ms_pengaduan_klasifikasi')->insert(
            array(
                'nama_klasifikasi' => 'Berkadar Pengawasan'
            )
        );
        
        DB::table('ms_pengaduan_klasifikasi')->insert(
            array(
                'nama_klasifikasi' => 'Tidak berkadar Pengawasan'
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
