<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pengaduan_posisi extends Model {
    public $timestamps = false;
    protected $table = "ms_pengaduan_posisi";  
    protected $primaryKey = 'posisi_id';
    protected $fillable = ['posisi_id', 'nama_posisi', 'keterangan', 'created_by', 'update_by'];   
}