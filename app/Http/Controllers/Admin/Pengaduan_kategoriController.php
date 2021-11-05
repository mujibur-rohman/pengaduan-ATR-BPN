<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Pengaduan_kategori;
use Auth;


class Pengaduan_kategoriController extends Controller {
    
    public function allPengaduan_kategori() {
        return view('pages.admin.Pengaduan_kategori.index');
    }
   
    public function list() {
        echo json_encode([
            'data' => Pengaduan_kategori::all()
        ]);
    }
    
    public function index(Request $r) {
        return view('pages.admin.Pengaduan_kategori.index');
    }

    public function save(Request $r) {
        
        $kategori_id = $r->post('kategori_id');
        $nama_kategori = $r->post('nama_kategori');
        
        if (empty($nama_kategori)) { 
            echo json_encode([
                'success' => false,
                'message' => 'Nama kategori tidak boleh kosong'
            ]);
            return;
        }
        
        $model = null;
        if (!empty($kategori_id)) {
            $model = Pengaduan_kategori::find($kategori_id);
            if ($model == null) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Data tidak ada'
                ]);
                return;
            }
        } else {
            $model = new Pengaduan_kategori();
        }
        $model->nama_kategori = $nama_kategori;
        
        $model->save();
        
        echo json_encode([
            'success' => true,
            'message' => 'Data berhasil disimpan'
        ]);
    }
    
    public function delete(Request $r) {
        $kategori_id = $r->post('kategori_id', '');
        
        if (empty($kategori_id)) {
            echo json_encode([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
            return;
        }
        
        $model = Pengaduan_kategori::find($kategori_id);
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