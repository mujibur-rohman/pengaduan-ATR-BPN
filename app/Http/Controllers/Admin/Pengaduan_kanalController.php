<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


use App\Users;
use App\Pengaduan_kanal;
use DB;


class Pengaduan_kanalController extends Controller
{
    private $users;private $pengaduan_kanal;


	
    public function allPengaduan_kanal()
    {
        return view('pages.admin.Pengaduan_kanal.index');
    }

   
		public function index(){
            $pengaduan_kanal = Pengaduan_kanal::all();
            return view('pages.admin.Pengaduan_kanal.index', compact('pengaduan_kanal'));
		}

    public function get()
    {  

        $data = DB::table('ms_pengaduan_kanal')
        ->join('users', 'ms_pengaduan_kanal.created_by', '=', 'users.id_user')
        ->select('ms_pengaduan_kanal.*', 'users.username')
        ->orderby('kanal_id', 'ASC')->get();
        echo json_encode($data);
    }

    public function create()
    {
        $users = Users::all();
        return view('pages.admin.pengaduan_kanal.index', compact('users'));
    }

    public function getmax()
    {   $data = DB::table('ms_pengaduan_kanal')
        ->selectRaw('max(kanal_id) + 1 as jml')
        ->get();
        echo json_encode($data);
    }

    public function save(Request $r)
    {
        $Pengaduan_kanal = new Pengaduan_kanal;
        $Pengaduan_kanal->kanal_id = $r->input('txtkanal_id');
        $Pengaduan_kanal->nama_kanal = $r->input('txtnama_kanal');
        $Pengaduan_kanal->created_by = $r->input('txtcreated_by');
       
        
        $Users->save();
        $msg['success'] = FALSE;
        
        if ($Pengaduan_kanal) {
            $msg['success'] = TRUE;
        }
          echo json_encode($msg);
     
        
    }


    // Panggil data untuk edit data Pengaduan_kanal 
    
    public function getPengaduan_kanal($id){
       
        $data = DB::table('ms_pengaduan_kanal')
        ->join('users', 'ms_pengaduan_kanal.created_by', '=', 'users.id_user')
        ->select('ms_pengaduan_kanal.*', 'users.username')
        ->orderby('kanal_id', 'ASC')->get();
        echo json_encode($data);
    }

    // .--Panggil data untuk edit data Pengaduan_kanal 


    public function update(Request $r, $id)
    {
        $Users = Users::find($id);
        $Users->kanal_id   = $r->input('txtkanal_id');
        $Users->nama_kanal = $r->input('txtnama_kanal');  
        $Users->created_by = $r->input('txtcreated_by');  
        
        $Users->save();
        echo "sukses";
    }

    public function delete($id)
    {
        $Users = DB::table('ms_pengaduan_kanal')->where('kanal_id', $id)->delete();
        $msg['success'] = FALSE;
        if ($Users) {
            $msg['success'] = TRUE;
        }
        echo json_encode($msg);
    }
}
