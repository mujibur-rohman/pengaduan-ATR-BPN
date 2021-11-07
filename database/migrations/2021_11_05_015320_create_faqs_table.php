<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateFaqsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faqs', function (Blueprint $table) {
            $table->increments('faq_id');
            $table->string('faq_question', 255);
            $table->text('faq_answer');
            $table->string('faq_kategori', 64); 
        });

        DB::table('faqs')->insert(
            array(
                'faq_question' => 'Bagaimana saya mengirim pengaduan kepada kementrian ATR/BPN?',
                'faq_answer' => 'Anda dapat menggunakan sosial media yang anda miliki seperti Facebook, Twitter dan Instagram dengan terlebih dulu mengikuti akun official Kementerian ATR/BPN dan menggunakan PengaduanATRBPN , untuk Pengaduanan yang diajukan ke kantor wilayah Kementerian ATR/BPN.',
                'faq_kategori' => 'Eksternal'
            )
        );
        DB::table('faqs')->insert(
            array(
                'faq_question' => 'Berapa lama saya menunggu pengaduan saya dijawab?',
                'faq_answer' => 'Kami akan segera merespon perPengaduanan maupun aspirasi anda secara cepat dan apabila diluar jam operasional, kami tetap akan melayani dengan sistem auto-replay dan akan segera ditindak lanjuti pada jam operasional.',
                'faq_kategori' => 'Eksternal'
            )
        );
        DB::table('faqs')->insert(
            array(
                'faq_question' => 'Saya ada perPengaduanan khusus untuk kantor wilayah Kementerian ATR/BPN di kota tempat tinggal saya, apakah bisa via sosial media?',
                'faq_answer' => 'Tentu saja, kami akan langsung meneruskan Pengaduanan anda pada kantor wilayah kami yang akan diproses dengan sistem aplikasi PengaduanATRBPN anda.',
                'faq_kategori' => 'Eksternal'
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
        Schema::dropIfExists('faqs');
    }
}