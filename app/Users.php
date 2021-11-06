<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model {
    protected $table = "users";  
    protected $primaryKey = 'id_user';
    protected $fillable = ['id_user','username','email','password','id_role','posisi_id', 'fullname'];
}
