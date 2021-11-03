<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pengaduan_kategori extends Model {
    protected $table = "ms_pengaduan_kategori";
    protected $primaryKey = 'kategori_id';
    protected $fillable = ['kategori_id', 'nama_kategori'];
}
