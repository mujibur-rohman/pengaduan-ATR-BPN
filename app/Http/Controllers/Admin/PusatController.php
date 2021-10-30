<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
//use App\Providers\NamaProviderBaru::class


use App\TahunAjaran;
use App\JadwalPendaftaran;
use App\Jurusan;
use App\Kelas;
use App\Menus;

use DB;

class PusatController extends Controller {  
	private $menu1; 
	private $global;
    
	public function index(){
    	return view('pages.admin.pusat.index');
    }

    public function postIndex(Request $req){
    	$tahunajarans = TahunAjaran::all();
        $tahunajaran = TahunAjaran::find($req->id_th_ajaran);
    	// $tahunajaran = TahunAjaran::find($req->id_th_ajaran);
    	$siswas = DB::table('tahun_ajarans')
    				->join('jadwal_pendaftarans','jadwal_pendaftarans.id_th_ajaran','tahun_ajarans.id_th_ajaran')
    				->join('calon_siswas','calon_siswas.id_jadwal','jadwal_pendaftarans.id_jadwal')
    				->join('jurusans','jurusans.kd_jurusan','calon_siswas.kd_jurusan')
    				->join('kelas','kelas.kd_kelas','calon_siswas.kd_kelas')
    				->where('tahun_ajarans.id_th_ajaran',$req->id_th_ajaran)
    				->select('jadwal_pendaftarans.nm_jadwal','calon_siswas.no_pendf','calon_siswas.nm_cln_siswa','jurusans.nm_jurusan','kelas.nm_kelas')
    				->orderBy('calon_siswas.no_pendf')
    				->get();
    	return view('pages.admin.siswa.index', compact('tahunajarans','tahunajaran','siswas'));	
    }
}
