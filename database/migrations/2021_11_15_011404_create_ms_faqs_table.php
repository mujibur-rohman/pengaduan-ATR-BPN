<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMsFaqsTable extends Migration 
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ms_faqs', function (Blueprint $table) {
            $table->increments('faq_id');
            $table->integer('parent_id')->default(1);
            $table->text('faq_question');
            $table->text('faq_answer');
            $table->string('faq_topik', 64); 
            $table->string('faq_kategori', 64); 
            $table->string('faq_posisi', 64); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ms_faqs');
    }
}