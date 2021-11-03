<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTrPengaduanLog extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::table('tr_pengaduan_log', function (Blueprint $table) {
            $table->text('keterangan')->nullable();
            $table->integer('user_id')->default(0);
            $table->string('lampiran_1_nama')->nullable();
            $table->string('lampiran_1_path')->nullable();
            $table->string('lampiran_2_nama')->nullable();
            $table->string('lampiran_2_path')->nullable();
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
