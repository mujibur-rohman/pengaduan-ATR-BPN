<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Pengaduan_kategori;
use App\Tr_pengaduan;
use DB;
use Illuminate\Support\Facades\Auth;

class PusatController extends Controller {  
    
    public function index(){ 
        $model = Tr_pengaduan::get();
        // dd(Auth::user());
        // dd($model[0]->kategori->nama_kategori);
    	return view('pages.admin.pusat.index', compact('model')); 
    }

    public function list(){
        // KATEGORI
        $data = Tr_pengaduan::get();
        $kategori = [];
        $klasifikasi = [];
        foreach ($data as $ktg) {
            if (!in_array($ktg->kategori->nama_kategori, $kategori)) {
                array_push($kategori, $ktg->kategori->nama_kategori);
            }
            if (!in_array($ktg->klasifikasi->nama_klasifikasi, $klasifikasi)) {
                array_push($klasifikasi, $ktg->klasifikasi->nama_klasifikasi);
            }
        } 

        // KLASIFIKASI
        
        echo json_encode([
            'data' => $data,
        ]);
    }
}