<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Tr_pengaduan;

use DB;
use Image;
use Carbon\Carbon;

class LandingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.landing.index');
    }


    public function getmax_form()
    {
        $tr_pengaduans = DB::table('tr_pengaduan')
        ->selectRaw('max(pengaduan_id) + 1 as jml')
        ->get();
      
        view('pages.landing.index',compact('tr_pengaduans'));
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $pengaduan = new tr_pengaduanss;
        $pengaduan->nik = $r->input('txtnik');
        $pengaduan->no_berkas = $r->input('txtno_berkas');

        $pengaduan->save();
        $msg['success'] = FALSE;
        
        if ($tr_pengaduan) {
            $msg['success'] = TRUE;
        }
          echo json_encode($msg);
     

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tr_pengaduans = DB::table('tr_pengaduan')
        ->selectRaw('max(pengaduan_id) + 1 as jml')
        ->get();
      
        view('pages.landing.index',compact('tr_pengaduans'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
