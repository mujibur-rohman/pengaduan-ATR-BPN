<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Tr_pengaduan;

use DB;

class ResponderController extends Controller
{
    public function index(){
		$tr_pengaduans =  DB::table('tr_pengaduan')
		->join('ms_pengaduan_jenis','tr_pengaduan.jenis_id','ms_pengaduan_jenis.jenis_id')
		->join('ms_pengaduan_kanal','tr_pengaduan.kanal_id','ms_pengaduan_kanal.kanal_id')
		->join('ms_pengaduan_posisi','tr_pengaduan.posisi_id','ms_pengaduan_posisi.posisi_id')
		->join('ms_pengaduan_status','tr_pengaduan.status_id','ms_pengaduan_status.status_id')
		->leftjoin('users','tr_pengaduan.create_by','users.id_user')
		->select('tr_pengaduan.pengaduan_id','ms_pengaduan_jenis.nama_jenis','ms_pengaduan_kanal.nama_kanal',
		'ms_pengaduan_posisi.nama_posisi','ms_pengaduan_status.nama_status',
		'nama','alamat','tr_pengaduan.email','pekerjaan','no_telp','obyek_aduan','hubungan','no_berkas','uraian_pengaduan','users.username',
		'leadtime1',  'leadtime2',  'leadtime3',  'tr_pengaduan.created_at' )
		->where('tr_pengaduan.kanal_id',5)
		->orderby('pengaduan_id', 'ASC')->get();

    	return view('pages.admin.responder.index', compact('tr_pengaduans'));
    }

    public function postIndex(Request $req){
    	 // 	return view('pages.admin.responder.index', compact('tr_pengaduans'));	
    }
}
