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
        'create_date', 'posisi_user_id',
        'verified_email', 'verified_email_date', 'verified_code', 'kode_tiket',
        'lock_datetime', 'lock_by_id', 'password_hash'
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

    public function kategori() {
      return $this->belongsTo(Pengaduan_kategori::class, 'kategori_id');
    }

    public function klasifikasi() {
      return $this->belongsTo(Pengaduan_klasifikasi::class, 'klasifikasi_id');
    }

    public function lampiran() {
      return $this->hasMany(Tr_pengaduan_dokumen::class, 'pengaduan_id');
    }

    public function log() {
      return $this->hasMany(Tr_pengaduan_log::class, 'pengaduan_id');
    }
    
    public function lockedBy() {
      return $this->belongsTo(Users::class, 'lock_by_id');
    }
    
    public static function lockNow($model, $user_id) {
        if ($model != null) {
            $model->lock_datetime = date('Y-m-d H:i:s');
            $model->lock_by_id = $user_id;
            $model->save();
        }
    }
    
    public static function lockRelease($model) {
        if ($model != null) {
            $model->lock_datetime = null;
            $model->lock_by_id = 0;
            $model->save();
        }
    }
    
    public static function isLocked($model) {
        if ($model != null) {
            if ($model->lock_datetime == null) { return false; }
            
            $t1 = strtotime(date('Y-m-d H:i:s'));
            $t2 = strtotime($model->lock_datetime);
            $minutes = ($t1 - $t2) / 60;
            if ($minutes < 10) { return true; }
        }
        
        return false;
    }
    
    public function generatePassword($password) {
        $this->password_hash = base64_encode(md5($this->pengaduan_id . $password));
    }
}