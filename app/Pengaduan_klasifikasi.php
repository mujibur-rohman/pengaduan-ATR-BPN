<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pengaduan_klasifikasi extends Model {
    protected $table = "ms_pengaduan_klasifikasi";  
    protected $primaryKey = 'klasifikasi_id';
    protected $fillable = ['klasifikasi_id', 'nama_klasifikasi'];
}
