<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Provinsi_kanwil extends Model
{
    protected $table = "kota";
    protected $primaryKey = 'kode_kota';
    protected $fillable = ['ket_kota','nama_kota','ibu_kota','created_user'];
}

