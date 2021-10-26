<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Kategori_pengaduan;

use DB;

class Kategori_pengaduanController extends Controller
{
    public function allKategori_pengaduan()
    {
        return view('admin.kategori_pengaduan.index');
    }

    public function index()
    {
       
        return view('admin.kategori_pengaduan.index');
    }

    public function get()
    {
        $data = kategori_pengaduan::orderby('id_kategori_pengaduan', 'ASC')->get();
        echo json_encode($data);
    }
    public function getmax()
    {   $data = DB::table('kategori_pengaduan')
        ->selectRaw('max(id_kategori_pengaduan) + 1 as jml')
        ->get();
        echo json_encode($data);
    }

    public function save(Request $r)
    {

        $kategori_pengaduan = new kategori_pengaduan;
        $kategori_pengaduan->id_kategori_pengaduan = $r->input('txtIDkategori_pengaduan');
        $kategori_pengaduan->nama_kategori_pengaduan = $r->input('txtNamakategori_pengaduan');
        
        $kategori_pengaduan->save();
        $msg['success'] = FALSE;
        
        if ($kategori_pengaduan) {
            $msg['success'] = TRUE;
        }
          echo json_encode($msg);
        //echo "sukses";
        //return redirect()->route('listkategori_pengaduan');
        
    }

    // Panggil data untuk edit data kategori_pengaduan 
    
    public function getkategori_pengaduan($id){
        //$data = kategori_pengaduan::find($id);
        $data = DB::table('kategori_pengaduan')->where('id_kategori_pengaduan', $id)->get();
        echo json_encode($data);
    }

    // .--Panggil data untuk edit data kategori_pengaduan 


    public function update(Request $r, $id)
    {
        $kategori_pengaduan = kategori_pengaduan::find($id);
        //$siswa->nis = $r->input('nis');
      //  $kategori_pengaduan->id_kategori_pengaduan = $r->input('txtIDkategori_pengaduan');
        $kategori_pengaduan->nama_kategori_pengaduan = $r->input('txtNamakategori_pengaduan');  
        $kategori_pengaduan->save();
        echo "sukses";
    }

    public function delete($id)
    {
        $kategori_pengaduan = DB::table('kategori_pengaduan')->where('id_kategori_pengaduan', $id)->delete();
        $msg['success'] = FALSE;
        if ($kategori_pengaduan) {
            $msg['success'] = TRUE;
        }
        echo json_encode($msg);
    }
}