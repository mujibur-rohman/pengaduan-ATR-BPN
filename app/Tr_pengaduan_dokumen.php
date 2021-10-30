<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tr_pengaduan_dokumen extends Model {   
    protected $table = "tr_pengaduan_dokumen";  
    protected $primaryKey = 'dokumen_id';
    protected $fillable = ['dokumen_id', 'pengaduan_id', 'nama_file', 'file_path', 'create_date', 'create_by'];
}