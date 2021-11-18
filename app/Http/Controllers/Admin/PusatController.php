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
        ]);
    }
}