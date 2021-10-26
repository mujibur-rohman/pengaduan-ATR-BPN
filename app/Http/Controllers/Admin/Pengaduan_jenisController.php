<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;



use App\Pengaduan_jenis;
use DB;


class Pengaduan_jenisController extends Controller
{
    private $pengaduan_jenis;private $users;


	
    public function allpengaduan_jenis()
    {
        return view('pages.admin.pengaduan_jenis.index');
    }

   
		public function index(){
            $pengaduan_jenis = Pengaduan_jenis::all();
            return view('pages.admin.pengaduan_jenis.index', compact('pengaduan_jenis'));
		}

    public function get()
    {  
        $data = DB::table('ms_pengaduan_jenis')
        ->select('ms_pengaduan_jenis.*')
        ->orderby('jenis_id', 'ASC')->get();
        echo json_encode($data);
    }

    public function create()
    {
        $pengaduan_jenis = Pengaduan_jenis::all();
        return view('pages.admin.pengaduan_jenis.index', compact('pengaduan_jenis'));
    }

    public function getmax()
    {   $data = DB::table('pengaduan_jenis')
        ->selectRaw('max(jenis_id) + 1 as jml')
        ->get();
        echo json_encode($data);
    }

    public function save(Request $r)
    {
        $pengaduan_jenis = new Pengaduan_jenis;
        $pengaduan_jenis->jenis_id = $r->input('txtjenis_id');
        $pengaduan_jenis->nama_jenis = $r->input('txtnama_jenis');
      
        
        $pengaduan_jenis->save();
        $msg['success'] = FALSE;
        
        if ($pengaduan_jenis) {
            $msg['success'] = TRUE;
        }
          echo json_encode($msg);
     
        
    }


    // Panggil data untuk edit data pengaduan_jenis 
    
    public function getpengaduan_jenis($id){
        $data = DB::table('ms_pengaduan_jenis')
        ->select('ms_pengaduan_jenis.*')
        ->where('jenis_id', $id) 
        ->orderby('jenis_id', 'ASC')->get();

        echo json_encode($data);
    }

    // .--Panggil data untuk edit data pengaduan_jenis 


    public function update(Request $r, $id)
    {
        $pengaduan_jenis = Pengaduan_jenis::find($id);
        $pengaduan_jenis->jenis_id   = $r->input('txtjenis_id');
        $pengaduan_jenis->nama_jenis = $r->input('txtnama_jenis');  
     
        $pengaduan_jenis->save();
        echo "sukses";
    }

    public function delete($id)
    {
        $pengaduan_jenis = DB::table('ms_pengaduan_jenis')->where('jenis_id', $id)->delete();
        $msg['success'] = FALSE;
        if ($pengaduan_jenis) {
            $msg['success'] = TRUE;
        }
        echo json_encode($msg);
    }
}
