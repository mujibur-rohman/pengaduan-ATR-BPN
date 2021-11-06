<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class AddMailTemplateResponder extends Migration
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
                'name' => 'disposisi_ke_responder',
                'subject' => 'Status Pengaduan Anda',
                'body' => '<p>Saat ini pengaduan anda sedang menunggu response dari tim terkait</p>'
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
