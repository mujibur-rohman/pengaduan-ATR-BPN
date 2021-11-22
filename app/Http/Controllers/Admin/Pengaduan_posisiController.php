<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Pengaduan_posisi;
use Auth;
use DB;

class Pengaduan_posisiController extends Controller {
    public $timestamps = false;
    
    public function list() {
        $model = DB::table('ms_pengaduan_posisi as t')
            ->select('t.*', 'p.nama_posisi as parent_name')
            ->leftJoin('ms_pengaduan_posisi as p', 't.parent_id', 'p.posisi_id')
            ->get();
        
        echo json_encode([
//            'data' => Pengaduan_posisi::all(),
            'data' => $model
        ]);
    }
    
    public function index(Request $r) {
        return view('pages.admin.pengaduan_posisi.index');
    }

    public function save(Request $r) {
        
        $posisi_id = $r->post('posisi_id');
        $parent_id = $r->post('parent_id');
        $nama_posisi = $r->post('nama_posisi');
        $user_id = Auth::id();
        
        if (empty($nama_posisi)) { 
            echo json_encode([
                'success' => false,
                'message' => 'Nama lokasi tidak boleh kosong'
            ]);
            return;
        }
        
        if ($parent_id == $posisi_id) { 
            echo json_encode([
                'success' => false,
                'message' => 'Parent ID tidak boleh sama dengan lokasi penggaduan'
            ]);
            return;
        }
        
        $model = null;
        if (!empty($posisi_id)) {
            $model = Pengaduan_posisi::find($posisi_id);
            if ($model == null) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Data tidak ada'
                ]);
                return;
            }
        } else {
            $model = new Pengaduan_posisi();
            $model->create_by = $user_id;
            $model->create_date = date('Y-m-d H:i:s');
        }
        $model->parent_id = $parent_id;
        $model->nama_posisi = $nama_posisi;
        $model->update_by = $user_id;
        $model->update_date = date('Y-m-d H:i:s');
        
        if ($model->save()) {
            echo json_encode([
                'success' => true,
                'message' => 'Data berhasil disimpan'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Data gagal disimpan'
            ]);
        }
        
    }
    
    public function delete(Request $r) {
        $posisi_id = $r->post('posisi_id', '');
        
        if (empty($status_id)) {
            echo json_encode([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
            return;
        }
        
        $model = Pengaduan_posisi::find($posisi_id);
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