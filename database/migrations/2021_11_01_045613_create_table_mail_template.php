<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTableMailTemplate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('mail_template', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50)->unique();
            $table->string('subject', 255);
            $table->text('body');
        });
        
        DB::table('mail_template')->insert(
            array(
                'name' => 'pengaduan_verified',
                'subject' => 'Verifikasi Email',
                'body' => '<p>Silahkan verifikasi email anda: <a href="{url}">Verifikasi email</a></p><p>{url}</p>'
            )
        );
        
        DB::table('mail_template')->insert(
            array(
                'name' => 'pengaduan_kode_tiket',
                'subject' => 'Kode Tiket Pengaduan',
                'body' => '<p>Kode tiket anda adalah {kode_tiket}. Jangan memberikan kode tiket anda pada siapapun.</p> '
                    . '<p>Untuk melihat proses pengaduan silahkan klik link <a href="{url}">Proses Pengduan</a></p>'
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
