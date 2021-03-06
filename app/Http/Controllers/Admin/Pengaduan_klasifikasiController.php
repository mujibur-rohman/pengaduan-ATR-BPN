<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Pengaduan_klasifikasi;
use Auth;


class Pengaduan_klasifikasiController extends Controller {
    
    public function allPengaduan_klasifikasi() {
        return view('pages.admin.Pengaduan_klasifikasi.index');
    }
   
    public function list() {
        echo json_encode([
            'data' => Pengaduan_klasifikasi::all()
        ]);
    }
    
    public function index(Request $r) {
        return view('pages.admin.Pengaduan_klasifikasi.index');
    }

    public function save(Request $r) {
        
        $klasifikasi_id = $r->post('klasifikasi_id');
        $nama_klasifikasi = $r->post('nama_klasifikasi');
        
        if (empty($nama_klasifikasi)) { 
            echo json_encode([
                'success' => false,
                'message' => 'Nama klasifikasi tidak boleh kosong'
            ]);
            return;
        }
        
        $model = null;
        if (!empty($klasifikasi_id)) {
            $model = Pengaduan_klasifikasi::find($klasifikasi_id);
            if ($model == null) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Data tidak ada'
                ]);
                return;
            }
        } else {
            $model = new Pengaduan_klasifikasi();
        }
        $model->nama_klasifikasi = $nama_klasifikasi;
        
        $model->save();
        
        echo json_encode([
            'success' => true,
            'message' => 'Data berhasil disimpan'
        ]);
    }
    
    public function delete(Request $r) {
        $klasifikasi_id = $r->post('klasifikasi_id', '');
        
        if (empty($klasifikasi_id)) {
            echo json_encode([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
            return;
        }
        
        $model = Pengaduan_klasifikasi::find($klasifikasi_id);
        if ($model == null) {
            echo json_encode([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
            return;
        }
        
        $model->delete();
        echo json_encode([
            'success' => true,
            'message' => 'Data berhasil di hapus'
        ]);
        return;
    }
}