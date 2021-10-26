<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kategori_pengaduan extends Model
{
    protected $table = "kategori_pengaduan";
    protected $primaryKey = 'id_kategori_pengaduan';
    protected $fillable = ['nama_kategori_pengaduan'];
}