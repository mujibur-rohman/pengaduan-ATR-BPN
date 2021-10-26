<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tr_pengaduans extends Model
{   protected $table = "tr_pengaduans";  
  protected $primaryKey = 'nik';
  protected $fillable = ['nik','no_berkas' ];
     
}