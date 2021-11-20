<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableNotification extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function(Blueprint $table) {
            $table->integer('id', true);
            $table->integer('user_id');
            $table->text('message');
            $table->string('url', 255)->nullable();
            $table->dateTime('created_at');
            $table->char('is_read', 1)->default('N');
            
            $table->foreign('user_id')->references('id_user')->on('users');
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
