<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ClearTablePengaduan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("SET foreign_key_checks=0");
        App\Tr_pengaduan::truncate();
        App\Tr_pengaduan_log::truncate();
        App\Tr_pengaduan_dokumen::truncate();
        App\Tr_pengaduan_respon_dokumen::truncate();
        App\Tr_pengaduan_respon::truncate();
        DB::statement("SET foreign_key_checks=1");
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
