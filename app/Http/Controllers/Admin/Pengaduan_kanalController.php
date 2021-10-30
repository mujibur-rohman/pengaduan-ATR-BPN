<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Pengaduan_kanal;
use Auth;


class Pengaduan_kanalController extends Controller {
    
    public function allPengaduan_kanal() {
        return view('pages.admin.Pengaduan_kanal.index');
    }
   
    public function list() {
        echo json_encode([
            'data' => Pengaduan_kanal::all()
        ]);
    }
    
    public function index(Request $r) {
        return view('pages.admin.Pengaduan_kanal.index');
    }

    public function save(Request $r) {
        $kanal_id = $r->post('kanal_id');
        $nama_kanal = $r->post('nama_kanal');
        $user_id = Auth::id();
        
        if (empty($nama_kanal)) {
            echo json_encode([
                'success' => false,
                'message' => 'Nama Kanal tidak boleh kosong'
            ]);
            return;
        }
        
        $model = null;
        if (!empty($kanal_id)) {
            $model = Pengaduan_kanal::find($kanal_id);
            if ($model == null) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Data tidak ada'
                ]);
                return;
            }
        } else {
            $model = new Pengaduan_kanal();
            $model->created_by = $user_id;
            $model->created_at = date('Y-m-d H:i:s');
        }
        
        $model->nama_kanal = $nama_kanal;
        $model->update_by = $user_id;
        $model->updated_at = date('Y-m-d H:i:s');
        $model->save();
        
        echo json_encode([
            'success' => true,
            'message' => 'Data berhasil disimpan'
        ]);
    }
    
    public function delete(Request $r) {
        $kanal_id = $r->post('kanal_id', '');
        
        if (empty($kanal_id)) {
            echo json_encode([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
            return;
        }
        
        $model = Pengaduan_kanal::find($kanal_id);
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
