<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePengaduanLog extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tr_pengaduan_log', function(Blueprint $table){
            $table->increments('log_pengaduan_id');
            $table->integer('pengaduan_id');
            $table->integer('id_status');
            $table->integer('id_posisi');
            $table->datetime('waktu');
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
