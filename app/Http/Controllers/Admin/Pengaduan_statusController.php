<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


use App\Users;
use App\Pengaduan_status;
use DB;


class Pengaduan_statusController extends Controller
{
    private $pengaduan_status;
    private $users;



    public function allpengaduan_status()
    {
        return view('pages.admin.pengaduan_status.index');
    }


    public function index()
    {
        $pengaduan_status = Pengaduan_status::all();
        return view('pages.admin.pengaduan_status.index', compact('pengaduan_status'));
    }

    public function get()
    {
        $data = DB::table('ms_pengaduan_status')
            ->select('ms_pengaduan_status.*')
            ->orderby('status_id', 'ASC')->get();
        echo json_encode($data);
    }

    public function create()
    {
        $pengaduan_status = Pengaduan_status::all();
        return view('pages.admin.pengaduan_status.index', compact('pengaduan_status'));
    }

    public function getmax()
    {
        $data = DB::table('ms_pengaduan_status')
            ->selectRaw('max(status_id) + 1 as jml')
            ->get();
        echo json_encode($data);
    }

    public function save(Request $r)
    {
        $pengaduan_status = new Pengaduan_status;
        $pengaduan_status->status_id = $r->input('txtstatus_id');
        $pengaduan_status->nama_status = $r->input('txtnama_status');
        $pengaduan_status->standar_wkt = $r->input('txtstandar_wkt');
        $pengaduan_status->create_by = $r->input('txtcreate_by');
        $pengaduan_status->update_by = $r->input('txtupdate_by');

        $pengaduan_status->save();
        $msg['success'] = FALSE;

        if ($pengaduan_status) {
            $msg['success'] = TRUE;
        }
        echo json_encode($msg);
    }


    // Panggil data untuk edit data pengaduan_status 

    public function getpengaduan_status($id)
    {
        $data = DB::table('ms_pengaduan_status')
            ->select('ms_pengaduan_status.*')
            ->where('status_id', $id)
            ->orderby('status_id', 'ASC')->get();

        echo json_encode($data);
    }

    // .--Panggil data untuk edit data pengaduan_status 


    public function update(Request $r, $id)
    {
        $pengaduan_status = Pengaduan_status::find($id);
        $pengaduan_status->status_id   = $r->input('txtstatus_id');
        $pengaduan_status->nama_status = $r->input('txtnama_status');
        $pengaduan_status->standar_wkt = $r->input('txtstandar_wkt');
        $pengaduan_status->create_by = $r->input('txtcreate_by');
        $pengaduan_status->update_by = $r->input('txtupdate_by');
        $pengaduan_status->save();
        echo "sukses";
    }

    public function delete($id)
    {
        $pengaduan_status = DB::table('ms_pengaduan_status')->where('status_id', $id)->delete();
        $msg['success'] = FALSE;
        if ($pengaduan_status) {
            $msg['success'] = TRUE;
        }
        echo json_encode($msg);
    }
}