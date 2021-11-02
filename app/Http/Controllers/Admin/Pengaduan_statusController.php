<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Pengaduan_status;
use Auth;


class Pengaduan_statusController extends Controller {
    public $timestamps = false;
    
    public function allPengaduan_status() {
        return view('pages.admin.Pengaduan_status.index');
    }
   
    public function list() {
        echo json_encode([
            'data' => Pengaduan_status::all()
        ]);
    }
    
    public function index(Request $r) {
        return view('pages.admin.Pengaduan_status.index');
    }

    public function save(Request $r) {
        
        $status_id = $r->post('status_id');
        $nama_status = $r->post('nama_status');
        $user_id = Auth::id();
        
        if (empty($nama_status)) { 
            echo json_encode([
                'success' => false,
                'message' => 'Nama status tidak boleh kosong'
            ]);
            return;
        }
        
        $model = null;
        if (!empty($status_id)) {
            $model = Pengaduan_status::find($status_id);
            if ($model == null) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Data tidak ada'
                ]);
                return;
            }
        } else {
            $model = new Pengaduan_status();
            $model->create_by = $user_id;
            $model->create_date = date('Y-m-d H:i:s');
        }
        $model->nama_status = $nama_status;
        $model->update_by = $user_id;
        $model->update_date = date('Y-m-d H:i:s');
        
        $model->save();
        
        echo json_encode([
            'success' => true,
            'message' => 'Data berhasil disimpan'
        ]);
    }
    
    public function delete(Request $r) {
        $status_id = $r->post('status_id', '');
        
        if (empty($status_id)) {
            echo json_encode([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
            return;
        }
        
        $model = Pengaduan_status::find($status_id);
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