<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropUnusedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::drop('calon_siswas');
        Schema::drop('detail_tes_seleksis');
        Schema::drop('jadwal_pendaftarans');
        Schema::drop('jenis_pertanyaans');
        Schema::drop('jurusans');
        Schema::drop('kelas');
        Schema::drop('kota');
        Schema::drop('panitias');
        Schema::drop('password_resets');
        Schema::drop('pembayarans');
        Schema::drop('pertanyaans');
        Schema::drop('pilihan_jawabans');
        Schema::drop('q_r_s');
        Schema::drop('steps');
        Schema::drop('tahun_ajarans');
        Schema::drop('tes_seleksis');
        Schema::drop('tr_pengaduans');
        Schema::enableForeignKeyConstraints();
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
