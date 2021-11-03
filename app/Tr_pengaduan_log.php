<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tr_pengaduan_log extends Model {
    public $timestamps = false;
    
    protected $table = "tr_pengaduan_log";  
    protected $primaryKey = 'log_pengaduan_id';
    protected $fillable = [
        'log_pengaduan_id', 'pengaduan_id', 'id_status', 'id_posisi', 'waktu',
        'keterangan', 'lampiran_1_nama', 'lampiran_1_path', 'lampiran_2_nama', 'lampiran_2_path'
    ];
    
    public function status() {
        return $this->belongsTo(Pengaduan_status::class, 'id_status');
    }
    
    public function user() {
        return $this->belongsTo(Users::class, 'user_id');
    }
}
