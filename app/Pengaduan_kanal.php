<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pengaduan_kanal extends Model
{  
 
    protected $table = "ms_pengaduan_kanal";  
    protected $primaryKey = 'kanal_id';
    protected $fillable = ['kanal_id','nama_kanal','created_by','created_at','update_by'];
}
