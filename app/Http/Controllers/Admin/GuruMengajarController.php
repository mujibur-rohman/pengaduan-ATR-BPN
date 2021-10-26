<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\TahunAjaran;
use App\CalonSiswa;
use App\Guru;
use App\Mengajar;
use App\User;

use DB;
use Carbon\Carbon;

class GuruMengajarController extends Controller
{
    public function dateFormat($date){
        return Carbon::createFromFormat('d-m-Y', $date)->toDateString();
    }

    public function index(){
        $tahunajarans = TahunAjaran::all();
        $tahunajaran = TahunAjaran::orderBy('created_at','asc')->first();
    	$gurus = Guru::all();
    	$mengajar = $tahunajaran->mengajar;
    	return view('pages.admin.gurumengajar.index', compact('tahunajarans','gurus','mengajar','tahunajaran'));
    }

    public function postIndex(Request $req){
        $tahunajarans = TahunAjaran::all();
        $tahunajaran = TahunAjaran::where('id_th_ajaran',$req->id_th_ajaran)->first();
        $gurus = Guru::all();
        $mengajar = $tahunajaran->mengajar;
        return view('pages.admin.gurumengajar.index', compact('tahunajarans','gurus','mengajar','tahunajaran'));
    }

    public function indexMengajar($kd_mengajar){
        $tahunajarans = TahunAjaran::all();
        $mengajar = Mengajar::find($kd_mengajar);
        return view('pages.admin.gurumengajar.index_mengajar', compact('tahunajarans','mengajar'));
    }

    public function postAddGuru(Request $req){
    	$guru = new Guru();
        $guru->kd_guru = $req->kd_guru;
        $guru->nm_guru = $req->nm_guru;
        // $guru->daya_tampung = $req->daya_tampung;
        $guru->save();

        return redirect(route('indexGuruMengajarAdmin'));
    }

    public function postAddMengajar(Request $req){
        $guru = new Mengajar();
        $guru->kd_mengajar = $req->kd_mengajar;
        $guru->kd_guru = $req->kd_guru;
        $guru->nm_mengajar = $req->nm_mengajar;
        $guru->id_th_ajaran = $req->id_th_ajaran;
        $guru->save();

        return redirect(route('indexGuruMengajarAdmin'));
    }

    public function postUpdateGuru(Request $req){
        $guru = Guru::find($req->kd_guru);
        $guru->nm_guru = $req->nm_guru;
        $guru->save();

        return redirect(route('indexGuruMengajarAdmin'));
    }

    public function postUpdateMengajar(Request $req){
        $mengajar = Mengajar::find($req->kd_mengajar);
        $mengajar->kd_guru = $req->kd_guru;
        $mengajar->nm_mengajar = $req->nm_mengajar;
        $mengajar->save();

        return redirect(route('indexGuruMengajarAdmin'));
    }


    // Mau diubah ke method post - backup
    // public function deleteGuru($id){
    //     $guru = Guru::find($id)->delete();
    //     return redirect(route('indexGuruMengajarAdmin'));
    // }
    
    // public function deleteMengajar($id){
    //     $mengajar = Mengajar::find($id)->delete();
    //     return redirect(route('indexGuruMengajarAdmin'));   
    // }

    public function deleteGuru(Request $req){
        $guru = Guru::find($req->kd_guru)->delete();
        if ($guru) {
            flash('Guru dengan kode ' . $req->kd_guru . ' berhasil dihapus...')->success();
        } else {
            flash('Guru dengan kode ' . $req->kd_guru . ' tidak berhasil dihapus...')->danger();
        }
        return redirect(route('indexGuruMengajarAdmin'));
    }
    
    public function deleteMengajar(Request $req){
        $mengajar = Mengajar::find($req->kd_mengajar)->delete();
        if ($mengajar) {
            flash('Mengajar dengan kode ' . $req->kd_mengajar . ' berhasil dihapus...')->success();
        } else {
            flash('Mengajar dengan kode ' . $req->kd_mengajar . ' tidak berhasil dihapus...')->success();
        }
        return redirect(route('indexGuruMengajarAdmin'));   
    }

    public function detail($id){
    	
    }

    public function detailSiswa($no_pendf){
        $siswa = CalonSiswa::find($no_pendf);
        return view('pages.admin.gurumengajar.detail_siswa',compact('siswa'));
    }

    public function editSiswa($id){
        $gurus = Guru::all();
        $siswa = CalonSiswa::find($id);
        return view('pages.admin.gurumengajar.edit_siswa', compact('gurus','siswa'));
    }

    public function updateSiswa(Request $req, $no_pendf){
        $user = User::find($req->id_user);
        $user->email = $req->email;
        $user->save();

        $siswa = CalonSiswa::find($no_pendf);
        $siswa->id_user = $req->id_user;
        $siswa->id_jadwal = $req->id_jadwal;
        $siswa->kd_guru = $req->kd_guru;
        $siswa->id_jadwal = $req->id_jadwal;
        $siswa->nm_cln_siswa = $req->nm_cln_siswa;
        $siswa->nisn = $req->nisn;
        $siswa->jns_kelamin = $req->jns_kelamin;
        $siswa->tmp_lahir = $req->tmp_lahir;
        $siswa->tgl_lahir = $this->dateFormat($req->tgl_lahir);
        $siswa->agama = $req->agama;
        $siswa->alamat = $req->alamat;
        $siswa->nm_ortu = $req->nm_ortu;
        $siswa->pkrj_ortu = $req->pkrj_ortu;
        $siswa->gaji_ortu = $req->gaji_ortu;
        $siswa->sklh_asal = $req->sklh_asal;
        $siswa->save();
        
        return redirect(route('detailSiswaMengajarAdmin', $siswa->no_pendf));
    }
}
