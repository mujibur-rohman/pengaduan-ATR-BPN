<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tr_pengaduan_respon extends Model {
    public $timestamps = false;
    
    protected $table = "tr_pengaduan_respon";  
    protected $primaryKey = 'respon_id';
    protected $fillable = ['respon_id', 'pengaduan_id', 'user_id', 'posisi_id', 'jawaban', 'create_date', 'create_by', 'update_date', 'update_by'];
}
