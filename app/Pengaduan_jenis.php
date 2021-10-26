<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pengaduan_jenis extends Model
{   protected $table = "ms_pengaduan_jenis";  
    protected $primaryKey = 'jenis_id';
    protected $fillable = ['jenis_id','nama_jenis','keterangan','created_at'];
}