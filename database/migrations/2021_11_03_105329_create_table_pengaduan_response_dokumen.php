<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePengaduanResponseDokumen extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tr_pengaduan_respon_dokumen', function (Blueprint $table) {
            $table->increments('dokumen_id');
            $table->integer('respon_id');
            $table->string('nama_file', 255);
            $table->string('file_path', 255);
            $table->dateTime('create_date');
            $table->integer('create_by');
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
