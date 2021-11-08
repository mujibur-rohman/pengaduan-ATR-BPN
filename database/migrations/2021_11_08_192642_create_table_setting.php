<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableSetting extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function(Blueprint $table) {
            $table->string('kind', 255)->primary();
            $table->string('label', 255);
            $table->enum('type', ['string', 'number', 'boolean', 'text', 'json', 'color']);
            $table->text('content');
            $table->string('description', 255);
        });
        
        DB::table('settings')->insert([
            array(
                'kind' => 'admin_email',
                'label' => 'Email admin',
                'type' => 'string',
                'content' => 'devpengaduan@gmail.com',
                'description' => 'Alamat email pengirim dari Kementerian ATR/BPN ke email pengadu.'
            ),
            array(
                'kind' => 'pengaduan.color_status_diterima_bg',
                'label' => 'Bg Diterima',
                'type' => 'color',
                'content' => '#cacaca',
                'description' => 'Warna background untuk status pengaduan "Laporan diterima"'
            ),
            array(
                'kind' => 'pengaduan.color_status_diterima_text',
                'label' => 'Text Diterima',
                'type' => 'color',
                'content' => '#000',
                'description' => 'Warna text untuk status pengaduan "Laporan diterima"'
            ),
            array(
                'kind' => 'pengaduan.color_status_verifikasi_bg',
                'label' => 'Bg Verifikator',
                'type' => 'color',
                'content' => '#cacaca',
                'description' => 'Warna background untuk status pengaduan "Proses Verifikasi"'
            ),
            array(
                'kind' => 'pengaduan.color_status_verifikasi_text',
                'label' => 'Text Verifikator',
                'type' => 'color',
                'content' => '#000',
                'description' => 'Warna text untuk status pengaduan "Proses Verifikasi"'
            ),
            array(
                'kind' => 'pengaduan.color_status_responder_bg',
                'label' => 'Bg Responder',
                'type' => 'color',
                'content' => '#cacaca',
                'description' => 'Warna background untuk status pengaduan "Proses Responder"'
            ),
            array(
                'kind' => 'pengaduan.color_status_responder_text',
                'label' => 'Text Responder',
                'type' => 'color',
                'content' => '#000',
                'description' => 'Warna text untuk status pengaduan "Proses Responder"'
            ),
            array(
                'kind' => 'pengaduan.color_status_respon_bg',
                'label' => 'Bg Tanggapan',
                'type' => 'color',
                'content' => '#cacaca',
                'description' => 'Warna background untuk status pengaduan "Tanggapan"'
            ),
            array(
                'kind' => 'pengaduan.color_status_respon_text',
                'label' => 'Text Tanggapan',
                'type' => 'color',
                'content' => '#000',
                'description' => 'Warna text untuk status pengaduan "Tanggapan"'
            ),
            array(
                'kind' => 'pengaduan.color_status_selesai_bg',
                'label' => 'Bg Selesai',
                'type' => 'color',
                'content' => '#cacaca',
                'description' => 'Warna background untuk status pengaduan "Selesai"'
            ),
            array(
                'kind' => 'pengaduan.color_status_selesai_text',
                'label' => 'Text Selesai',
                'type' => 'color',
                'content' => '#000',
                'description' => 'Warna text untuk status pengaduan "Selesai"'
            ),
            array(
                'kind' => 'pengaduan.lock_duration',
                'label' => 'Lama Terkunci',
                'type' => 'number',
                'content' => '10',
                'description' => 'Lama data pengaduan terkunci sehingga tidak dapat di proses disaat bersamaan dalam satuan menit'
            ),
        ]);
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
