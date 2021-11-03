<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePengaduanResponse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tr_pengaduan_respon', function(Blueprint $table){
            $table->increments('respon_id');
            $table->integer('pengaduan_id');
            $table->integer('user_id');
            $table->integer('posisi_id');
            $table->text('jawaban');
            $table->datetime('create_date');
            $table->integer('create_by');
            $table->datetime('update_date');
            $table->integer('update_by');
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
