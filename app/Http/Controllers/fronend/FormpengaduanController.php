<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


use App\Users;
use App\formpengadua;
use DB;


class FormpengaduanController extends Controller
{
    private $users;private $formpengadua;


	
    public function allformpengadua()
    {
        return view('pages.admin.formpengadua.index');
    }

   
		public function index(){
            $formpengadua = formpengadua::all();
            return view('pages.admin.formpengadua.index', compact('formpengadua'));
		}

    public function get()
    {  

        $data = DB::table('tr_pengaduan')
        ->join('users', 'tr_pengaduan.created_by', '=', 'users.id_user')
        ->select('tr_pengaduan.*', 'users.username')
        ->orderby('kanal_id', 'ASC')->get();
        echo json_encode($data);
    }

    public function create()
    {
        $users = Users::all();
        return view('pages.admin.formpengadua.index', compact('users'));
    }

    public function getmax()
    {   $data = DB::table('tr_pengaduan')
        ->selectRaw('max(kanal_id) + 1 as jml')
        ->get();
        echo json_encode($data);
    }

    public function save(Request $r)
    {
        $formpengadua = new formpengadua;
        $formpengadua->kanal_id = $r->input('txtkanal_id');
        $formpengadua->nama_kanal = $r->input('txtnama_kanal');
        $formpengadua->created_by = $r->input('txtcreated_by');
       
        
        $Users->save();
        $msg['success'] = FALSE;
        
        if ($formpengadua) {
            $msg['success'] = TRUE;
        }
          echo json_encode($msg);
     
        
    }


    // Panggil data untuk edit data formpengadua 
    
    public function getformpengadua($id){
       
        $data = DB::table('tr_pengaduan')
        ->join('users', 'tr_pengaduan.created_by', '=', 'users.id_user')
        ->select('tr_pengaduan.*', 'users.username')
        ->orderby('kanal_id', 'ASC')->get();
        echo json_encode($data);
    }

    // .--Panggil data untuk edit data formpengadua 


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
        $Users = DB::table('tr_pengaduan')->where('kanal_id', $id)->delete();
        $msg['success'] = FALSE;
        if ($Users) {
            $msg['success'] = TRUE;
        }
        echo json_encode($msg);
    }
}
