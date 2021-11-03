<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMailTemplateRecord extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('mail_template')->insert(
            array(
                'name' => 'disposisi_ke_verifikator',
                'subject' => 'Status Pengaduan Anda',
                'body' => '<p>Saat ini pengaduan anda sedang dalam proses verifikasi</p>'
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
