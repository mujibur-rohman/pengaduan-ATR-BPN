<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
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
                'name' => 'memberikan_respon',
                'subject' => 'Tanggapan atas pengaduan anda',
                'body' => '<p>Berikut ini adalah tanggapan dari tim terkair</p>{content}'
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
