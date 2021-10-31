<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tr_pengaduan extends Model {   
    protected $table = "tr_pengaduan";  
    protected $primaryKey = 'pengaduan_id';
    protected $fillable = [
        'pengaduan_id','nama_jenis',
        'nama', 'alamat', 'email',
        'pekerjaan', 'no_telp', 'obyek_aduan',
        'hubungan', 'no_berkas', 'uraian_pengaduan',
        'leadtime1', 'leadtime2', 'leadtime3',
        'create_date',
        'verified_email', 'verified_email_date', 'verified_code', 'kode_tiket'
    ];

  public function kanal() {
      return $this->belongsTo(Pengaduan_kanal::class, 'kanal_id');
  }

  public function jenis() {
    return $this->belongsTo(Pengaduan_jenis::class, 'jenis_id');
  }

  public function status() {
    return $this->belongsTo(Pengaduan_status::class, 'status_id');
  }

  public function posisi() {
    return $this->belongsTo(Pengaduan_posisi::class, 'posisi_id');
  }

  public function lampiran() {
    return $this->hasMany(Tr_pengaduan_dokumen::class, 'pengaduan_id');
  }
}