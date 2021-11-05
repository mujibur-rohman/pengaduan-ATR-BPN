<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pengaduan_kategori extends Model {

    public $timestamps = false;
    protected $table = "ms_pengaduan_kategori";
    protected $primaryKey = 'kategori_id';
    protected $fillable = ['kategori_id', 'nama_kategori'];
}