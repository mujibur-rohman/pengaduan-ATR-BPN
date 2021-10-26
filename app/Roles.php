<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{   protected $table = "roles";  
    protected $primaryKey = 'id_role';
    protected $fillable = ['id_role','name'];

    
}
