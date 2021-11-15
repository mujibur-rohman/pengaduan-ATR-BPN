<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Pengaduan_kategori;
use App\Tr_pengaduan;
use DB;

class PusatController extends Controller {  
    
    public function index(){
        $model = Tr_pengaduan::get();
        // dd($model[0]->status->nama_status);
    	return view('pages.admin.pusat.index', compact('model')); 
    }

    public function list(){
        echo json_encode([
            'data' => Tr_pengaduan::get(),
            'disiplinP' => Tr_pengaduan::where('kategori_id', 1)->get(),
            'sengketa' => Tr_pengaduan::where('kategori_id', 2)->get(),
            'konflikP' => Tr_pengaduan::where('kategori_id', 3)->get(),
            'informasiP' => Tr_pengaduan::where('kategori_id', 4)->get(),
            'kategori' => Pengaduan_kategori::get(),
        ]);
    }
}