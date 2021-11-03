<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tr_pengaduan_respon_dokumen extends Model {
    public $timestamps = false;
    
    protected $table = "tr_pengaduan_respon_dokumen";  
    protected $primaryKey = 'dokumen_id';
    protected $fillable = [ 'dokumen_id', 'respon_id', 'nama_file', 'file_path' ];
}
