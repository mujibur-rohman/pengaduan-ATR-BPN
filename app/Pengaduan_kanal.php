<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pengaduan_kanal extends Model {
    protected $table = "ms_pengaduan_kanal";  
    protected $primaryKey = 'kanal_id';
    protected $fillable = ['kanal_id','nama_kanal','created_by','created_at','update_by'];
    
    public static function getName($kanal_id) {
        $model = Pengaduan_kanal::find($kanal_id);
        if ($model != null) {
            return $model->nama_kanal;
        } else {
            return "";
        }
    }
}
