<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pengaduan_status extends Model
{  
 
    protected $table = "ms_pengaduan_status";  
    protected $primaryKey = 'status_id';
    protected $fillable = ['status_id','nama_status','created_by','create_date','update_by','update_date'];

    
}
