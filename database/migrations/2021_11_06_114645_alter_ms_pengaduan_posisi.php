<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Pengaduan_posisi;
use Illuminate\Support\Facades\DB;

class AlterMsPengaduanPosisi extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        DB::statement("SET foreign_key_checks=0");
        
        Schema::table('ms_pengaduan_posisi', function (Blueprint $table) {
            $table->integer('parent_id')->default(0)->change();
        });
        
        Pengaduan_posisi::truncate();
        $root_id = $this->insert(0, 'Humas Pusat ATR BPN');
        
        // Provinsi DKI Jakarta
        $level1 = $this->insert($root_id, 'Kanwil DKI Jakarta');
        $level2 = $this->insert($level1, 'Kantah Jakarta Utara');
        $level3 = $this->insert($level1, 'Kantah Jakarta Barat');
        
        // Provinsi Jawa Barat
        $level1 = $this->insert($root_id, 'Kanwil Jawa Barat');
        $level2 = $this->insert($level1, 'Kantah Bandung');
        $level3 = $this->insert($level1, 'Kantah Bogor');
        
        DB::statement("SET foreign_key_checks=0");
    }
    
    public function insert($parent_id, $name) {
        DB::table('ms_pengaduan_posisi')->insert(
            array(
                'parent_id' => $parent_id,
                'nama_posisi' => $name,
                'keterangan' => '',
                'create_date' => date('Y-m-d H:i:s'),
                'create_by' => 1,
                'update_date' => date('Y-m-d H:i:s'),
                'update_by' => 1,
            )
        );
        
        return DB::getPdo()->lastInsertId();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        //
    }
}
