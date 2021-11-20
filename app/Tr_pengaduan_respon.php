<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tr_pengaduan_respon extends Model {
    public $timestamps = false;
    
    protected $table = "tr_pengaduan_respon";  
    protected $primaryKey = 'respon_id';
    protected $fillable = ['respon_id', 'pengaduan_id', 'user_id', 'posisi_id', 'jawaban', 'create_date', 'create_by', 'update_date', 'update_by', 'is_from_pengadu'];
    
    public function responOleh() {
        return $this->belongsTo(Users::class, 'user_id');
    }
    
    public function lampiran() {
        return $this->hasMany(Tr_pengaduan_respon_dokumen::class, 'respon_id');
    }
}
