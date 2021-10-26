<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tr_pengaduan extends Model
{   protected $table = "tr_pengaduan";  
  protected $primaryKey = 'pengaduan_id';
  protected $fillable = ['pengaduan_id','nama_jenis',
  'nama_kanal',
  'nama_status',
  'nama_posisi',
  'nama',
  'alamat',
  'email',
  'pekerjaan',
  'no_telp',
  'obyek_aduan',
  'hubungan',
  'no_berkas',
  'uraian_pengaduan',
  'username',
  'leadtime1',
  'leadtime2',
  'leadtime3',
  'create_date' 
 
        ];

       
       
}