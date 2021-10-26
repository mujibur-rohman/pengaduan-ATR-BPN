<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menus extends Model
{   protected $table = "ms_menu";  
    protected $primaryKey = 'menu_id';
    protected $fillable = ['menu_id','menu_parent_id','menu','nama_system','keterangan','sts_aktif','sequence_no','create_date','create_by','update_date','update_by'];

    
}
