<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Disposisi;
use App\Karyawan;
use File;

use DB;

class DisposisiController extends Controller
{
    public function index(){
        return view('admin.disposisi.index');
    }


    public function getProfil($id){
    
        $datanew= array(
            'data1' => DB::table('deposisi')
            ->join('deposisi', 'deposisi.id_deposisi', '=', 'deposisi.id_deposisi')
            ->join('kota', 'kota.kode_kota', '=', 'deposisi.kode_kota')
            ->select('deposisi.*', 'deposisi.*','kota.ket_kota', 'kota.nama_kota')
            ->where('deposisi.id_deposisi', $id)
            ->orderBy('deposisi.id_deposisi')->get(),
            
            'data2' => DB::table('deposisi')
            ->where('id_deposisi', $id)
            ->orderBy('id_deposisi')->get()
        );

        echo json_encode($datanew);
    }

    public function get2(){
    
        $datanew= array(
            'data1' => DB::table('deposisi')
            ->join('karyawan', 'karyawan.id_karyawan', '=', 'deposisi.id_karyawan')
            ->join('kota', 'kota.kode_kota', '=', 'deposisi.kode_kota')
            ->select('deposisi.*', 'deposisi.*','kota.ket_kota', 'kota.nama_kota', 'karyawan.nama_karyawan')
            ->orderBy('deposisi.id_deposisi')->get(),
            
            'data2' => DB::table('deposisi')
            ->orderBy('id_deposisi')->get()
        );

        echo json_encode($datanew);
    }
    
    public function getkaryawan(){

        // $karyawa = DB::table('karyawan')
        //     ->join('deposisi', 'deposisi.id_karyawan', '=', 'karyawan.id_karyawan')
        //     ->select('karyawan.id_karyawan' ,'karyawan.nama_karyawan')
        //     ->where('karyawan.id_karyawan', $id)->get();
        
        // echo json_encode($karyawan,compact('karyawan'));
        $karyawan= Karyawan::all();
        return view('disposisi.index',compact('karyawan'));
    }

    public function get(){
        $data = Disposisi::all();
        echo json_encode($data);
    }

    public function save(Request $r)
    {

        $disposisi = new Disposisi;
        $disposisi->id_deposisi = $r->input('txtiddisposisi');
        $test = $r->input('txtiddisposisi');
        $disposisi->kode_kota = $r->input('txtkode_kota');
        $disposisi->id_karyawan = $r->input('txtid_karyawan');
        $disposisi->status_aktif = $r->input('txtstatus_aktif');
       
        
        $foto = $r->file('foto');
        $ext = $foto->getClientOriginalExtension();
        $newName = $test.".".$ext;
        $disposisi->foto = $newName;
        $foto->move(public_path('UploadedFile/disposisi/'), $newName);

        $disposisi->status_pegawai = $r->input('cmbstatus_aktif');

        $disposisi->save();
        $msg['success'] = FALSE;
        
        if ($disposisi) {
            $msg['success'] = TRUE;
        }
        //return redirect()->route('kotahome');
        //return "sukses";
    }

    public function update(Request $r, $id){
        $disposisi = Disposisi::find($id);
        $disposisi->id_deposisi = $r->input('txtiddisposisi');
        $test = $r->input('txtiddisposisi');
        $disposisi->kode_kota = $r->input('txtkode_kota');
        $disposisi->id_karyawan = $r->input('txtid_karyawan');
        $disposisi->status_aktif = $r->input('txtstatus_aktif');
       
        $foto = $r->file('foto');

        if(!empty($foto)){
            $ext = $foto->getClientOriginalExtension();
            $newName = $test.".".$ext;
            $disposisi->foto = $newName;
            $foto->move(public_path('UploadedFile/disposisi/'), $newName);
        }
        
        //$foto->move(public_path('UploadedFile/foto/'), $foto->getClientOriginalName());

        
        $disposisi->save();
        $msg['success'] = FALSE;
        
        if ($disposisi) {
            $msg['success'] = TRUE;
        }
    }



    public function delete($id){
        $disposisi = Disposisi::where('id_deposisi',$id)->first();
	        File::delete('UploadedFile/disposisi/'.$disposisi->foto);
        $disposisi = DB::table('deposisi')->where('id_deposisi', $id)->delete();
        
        $msg['success'] = FALSE;
        if ($disposisi) {
            $msg['success'] = TRUE;
        }
        echo json_encode($msg);
    }

    public function getdisposisi($id){
     //   $data = disposisi::find($id);
     $data=  DB::table('deposisi')
        ->join('karyawan', 'deposisi.id_karyawan', '=', 'karyawan.id_karyawan')
        ->join('kota', 'kota.kode_kota', '=', 'deposisi.kode_kota')
        ->select('deposisi.*', 'deposisi.*','kota.ket_kota', 'kota.nama_kota')
        ->where('deposisi.id_deposisi', $id)
        ->orderBy('deposisi.id_deposisi')->get();
        //$data = DB::table('matpel')->where('id_matpel', $id)->get();
        echo json_encode($data);
    }

    public function updateProfile(Request $r, $id)
    {
        $disposisi = Disposisi::find($id);
        $disposisi->id_deposisi = $r->input('txtiddisposisiprofil');
        $test = $r->input('txtiddisposisiprofil');
        $disposisi->nip = $r->input('txtnipprofil');
        $disposisi->kode_kota = $r->input('txtkode_kotaprofil');
        $disposisi->id_karyawan = $r->input('txtid_karyawanprofil');
        $disposisi->status_aktif = $r->input('txtstatus_aktifprofil');
       
        $foto = $r->file('fotoprofil');

        if(!empty($foto)){
            $ext = $foto->getClientOriginalExtension();
            $newName = $test.".".$ext;
            $disposisi->foto = $newName;
            $foto->move(public_path('UploadedFile/disposisi/'), $newName);
        }
        
        //$foto->move(public_path('UploadedFile/foto/'), $foto->getClientOriginalName());

        
        $disposisi->save();
        $msg['success'] = FALSE;
        
        if ($disposisi) {
            $msg['success'] = TRUE;
        }
    }
    
}