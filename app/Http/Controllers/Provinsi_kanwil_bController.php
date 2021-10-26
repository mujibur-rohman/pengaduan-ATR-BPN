<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Provinsi_kanwil;

use DB;

class Provinsi_kanwilController extends Controller
{
    public function allProvinsi_kanwil()
    {
        return view('admin.provinsi_kanwil.index');
    }

    public function index()
    {
       
        return view('admin.provinsi_kanwil.index');
    }

    public function get()
    {
        $data = DB::table('kota')
        ->whereIn('ket_kota', ['Provinsi','Kabupaten'])
        ->orderby('kode_kota', 'ASC')->get();

     //   $data = Provinsi_kanwil::where('kode_kota=Provinsi')->orderby('kode_kota', 'ASC')->get();
        echo json_encode($data);
    }
    public function getmax()
    {   $data = DB::table('kota')
        ->selectRaw('max(kode_kota) + 1 as jml')
        ->get();
        echo json_encode($data);
    }

    public function save(Request $r)
    {
        $provinsi_kanwil = new Provinsi_kanwil;
        $provinsi_kanwil->kode_kota = $r->input('txtkode_kota');
        $provinsi_kanwil->ket_kota = $r->input('txtket_kota');
        $provinsi_kanwil->nama_kota = $r->input('txtnama_kota');
        $provinsi_kanwil->ibu_kota = $r->input('txtibu_kota');
        $provinsi_kanwil->created_user = $r->input('txtcreated_user');
        
        $provinsi_kanwil->save();
        $msg['success'] = FALSE;
        
        if ($provinsi_kanwil) {
            $msg['success'] = TRUE;
        }
          echo json_encode($msg);
        //echo "sukses";
        //return redirect()->route('listprovinsi_kanwil');
        
    }


    // Panggil data untuk edit data provinsi_kanwil 
    
    public function getprovinsi_kanwil($id){
        //$data = provinsi_kanwil::find($id);
        $data = DB::table('kota')->where('kode_kota', $id)->get();
        echo json_encode($data);
    }

    // .--Panggil data untuk edit data provinsi_kanwil 


    public function update(Request $r, $id)
    {
        $provinsi_kanwil = Provinsi_kanwil::find($id);
        //$siswa->nis = $r->input('nis');
        $provinsi_kanwil->kode_kota   = $r->input('txtkode_kota');
        $provinsi_kanwil->ket_kota = $r->input('txtket_kota');  
        $provinsi_kanwil->nama_kota = $r->input('txtnama_kota');  
        $provinsi_kanwil->ibu_kota = $r->input('txtibu_kota');  
        $provinsi_kanwil->created_user = $r->input('txtcreated_user');    
        $provinsi_kanwil->save();
        echo "sukses";
    }

    public function delete($id)
    {
        $provinsi_kanwil = DB::table('kota')->where('kode_kota', $id)->delete();
        $msg['success'] = FALSE;
        if ($provinsi_kanwil) {
            $msg['success'] = TRUE;
        }
        echo json_encode($msg);
    }
}