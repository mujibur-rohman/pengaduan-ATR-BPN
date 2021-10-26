<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Disposisi extends Model
{


    protected $table = 'deposisi';
    public $incrementing = false;
    protected $primaryKey = 'id_deposisi';
    protected $fillable = ['id_karyawan',
                            'kode_kota',
                            'status_aktif'
                            
    ];
}