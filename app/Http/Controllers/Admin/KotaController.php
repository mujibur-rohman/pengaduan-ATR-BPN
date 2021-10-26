<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;



use App\Kota;
use DB;


class KotaController extends Controller
{
    private $Kota;
   



    public function allKota()
    {
        return view('pages.admin.Kota.index');
    }


    public function index()
    {
        $kota = Kota::all();
        return view('pages.admin.Kota.index');
    }

    public function get()
    {
        $data = DB::table('kota')
            ->select('kota.*')
            ->where('kota.ket_kota', 'Provinsi')
            ->orderby('kode_kota', 'ASC')->get();
        echo json_encode($data);
    }
    public function postIndex(Request $req)
    {
        $kota = kota::all();
        $kota = kota::where('ket_kota', $req->ket_kota)->first();
        
        
        return view('pages.admin.kota.index', compact('kota'));
    }

    
}