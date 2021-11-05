<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Pengaduan_jenis;
use Auth;


class Pengaduan_jenisController extends Controller {
    
    public function allPengaduan_jenis() {
        return view('pages.admin.Pengaduan_jenis.index');
    }
   
    public function list() {
        echo json_encode([
            'data' => Pengaduan_jenis::all()
        ]);
    }
    
    public function index(Request $r) {
        return view('pages.admin.Pengaduan_jenis.index');
    }

    public function save(Request $r) {
        
        $jenis_id = $r->post('jenis_id');
        $nama_jenis = $r->post('nama_jenis');
        
        if (empty($nama_jenis)) { 
            echo json_encode([
                'success' => false,
                'message' => 'Nama jenis tidak boleh kosong'
            ]);
            return;
        }
        
        $model = null;
        if (!empty($jenis_id)) {
            $model = Pengaduan_jenis::find($jenis_id);
            if ($model == null) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Data tidak ada'
                ]);
                return;
            }
        } else {
            $model = new Pengaduan_jenis();
        }
        $model->nama_jenis = $nama_jenis;
        
        $model->save();
        
        echo json_encode([
            'success' => true,
            'message' => 'Data berhasil disimpan'
        ]);
    }
    
    public function delete(Request $r) {
        $jenis_id = $r->post('jenis_id', '');
        
        if (empty($jenis_id)) {
            echo json_encode([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
            return;
        }
        
        $model = Pengaduan_jenis::find($jenis_id);
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