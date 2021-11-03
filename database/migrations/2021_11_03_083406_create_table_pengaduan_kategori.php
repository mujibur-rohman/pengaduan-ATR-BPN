<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePengaduanKategori extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ms_pengaduan_kategori', function(Blueprint $table){
            $table->increments('kategori_id');
            $table->string('nama_kategori', 255);
        });
        
        DB::table('ms_pengaduan_kategori')->insert(
            array(
                'nama_kategori' => 'Disiplin Pegawai'
            )
        );
        
        DB::table('ms_pengaduan_kategori')->insert(
            array(
                'nama_kategori' => 'Sengketa'
            )
        );
        
        DB::table('ms_pengaduan_kategori')->insert(
            array(
                'nama_kategori' => 'Konflik Pertanahan'
            )
        );
        
        DB::table('ms_pengaduan_kategori')->insert(
            array(
                'nama_kategori' => 'Informasi dan Pelayanan Pertanahan'
            )
        );
        
        Schema::table('tr_pengaduan', function (Blueprint $table) {
            $table->integer('kategori_id');
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
