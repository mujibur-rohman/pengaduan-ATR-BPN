<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Tr_pengaduan;
use DB;
use Auth;

class Tr_pengaduanController extends Controller
{
    private $tr_pengaduans ;
    private $disposisi_verifikator;
    private $disposisi_responder;

    public function view($id) {
        $model = Tr_Pengaduan::find($id);
        return view('pages.admin.tr_pengaduan.view', compact('id', 'model'));
    }

    public function alltr_pengaduan()
    {
        return view('pages.admin.tr_pengaduan.index');
    }
		public function index_non_medsos2(){
        //       $pengaduan = new Tr_pengaduan;
        //       $pengaduan->created_at = $req->txttglawal;
        //     //  $tr_pengaduan->status_id = $req->cmbstatuspengaduan;
              
        //       $output= [
        //      'data' => $req->txttglawal,
        //   ];

        //   var_dump($output);
      
        $myuser=Auth::user()->id_user;
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
       ->whereIN('tr_pengaduan.kanal_id',['5,6,7,8,9,10'])
   
       
      //  ->wheredate('tr_pengaduan.created_at','>=', $pengaduan->tgls)
      //  ->wheredate('tr_pengaduan.created_at','<=', $pengaduan->tgld)  
      ->where('tr_pengaduan.create_by',$myuser) 
      ->orwhere('tr_pengaduan.create_by',NULL)            
       ->orderby('pengaduan_id', 'ASC')->get();

      return view('pages.admin.tr_pengaduan.index', compact('tr_pengaduans'));
		} 

        public function index_non_medsos(){
        //     $tr_pengaduan = new Tr_pengaduan;
        //     $tr_pengaduan->created_at = $req->txttglawal;
        //   //  $tr_pengaduan->status_id = $req->cmbstatuspengaduan;
            
        //     $output= [
        //    'data' => $req->txttglawal,
        // ];

        // var_dump($output);
		
		 $nama_status="verifikator"; $nama_status1="responder";
            $disposisi_verifikator = DB::select("call sp_cmduser_flag_role('".$nama_status."')"); 
            $disposisi_responder = DB::select("call sp_cmduser_flag_role('".$nama_status1."')");
            
    
		
           $myuser=Auth::user()->id_user;
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
           ->whereIN('tr_pengaduan.kanal_id',['5,6,7,8,9,10'])
       
           
          //  ->wheredate('tr_pengaduan.created_at','>=', $pengaduan->tgls)
          //  ->wheredate('tr_pengaduan.created_at','<=', $pengaduan->tgld)  
          ->where('tr_pengaduan.create_by',$myuser) 
          ->orwhere('tr_pengaduan.create_by','NULL')            
           ->orderby('pengaduan_id', 'ASC')->get();

          return view('pages.admin.tr_pengaduan.index', compact('tr_pengaduans','disposisi_verifikator','disposisi_responder'));
      }    
 
      

        public function index_non_medsos_update(reques $r,$id_row){ 
            
               //proses update data
            //    $pengaduan = tr_pengaduan::find($id_row);
            //    $pengaduan->status_id = $r->txtid_status; 
            //    $pengaduan->posisi_id = $r->txid_posisi;
            //    $pengaduan->create_by = $r->txtid_create_by;
            //    $pengaduan->update_by = $r->txtupdate_by;   
            //    $pengaduan->save();     
                 
                 $myuser=Auth::user()->id_user;
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
                 ->whereIN('tr_pengaduan.kanal_id',['5,6,7,8,9,10'])
             
                 
                //  ->wheredate('tr_pengaduan.created_at','>=', $pengaduan->tgls)
                //  ->wheredate('tr_pengaduan.created_at','<=', $pengaduan->tgld)  
                ->where('tr_pengaduan.create_by',$myuser) 
                ->orwhere('tr_pengaduan.create_by',NULL)            
                 ->orderby('pengaduan_id', 'ASC')->get();
    
                return view('pages.admin.tr_pengaduan.index', compact('tr_pengaduans'));
            }    
    


    	public function index_non_medsos_user(){
             $myuser=Auth::user()->id_user;
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
             ->whereIN('tr_pengaduan.kanal_id',['5,6,7,8,9,10'])
             ->where('tr_pengaduan.create_by',$myuser)             
             ->orderby('pengaduan_id', 'ASC')->get();

            return view('pages.admin.tr_pengaduan.index', compact('tr_pengaduans'));
		}    
    
    	public function index_medsos($id){ //facebook
			$myuser=Auth::user()->id_user;
            $nama_status="verifikator"; $nama_status1="responder";
            $disposisi_verifikator = DB::select("call sp_cmduser_flag_role('".$nama_status."')"); 
            $disposisi_responder = DB::select("call sp_cmduser_flag_role('".$nama_status1."')");
            
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
            ->where('tr_pengaduan.kanal_id',$id)
			 ->where('tr_pengaduan.create_by',$myuser) 
         // ->whereIN('tr_pengaduan.kanal_id',['1,2,3,4'])
         //  ->wheredate('tr_pengaduan.created_at','>=','2021-10-01')
         //  ->wheredate('tr_pengaduan.created_at','<=','2021-10-29')   
           ->orderby('pengaduan_id', 'ASC')->get();
          return view('pages.admin.tr_pengaduan.index', compact('tr_pengaduans','disposisi_verifikator','disposisi_responder'));
      }    

      public function index_verifikasi($idu,$idu1){ //facebook
        $myuser=Auth::user()->id_user;
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
       ->where('tr_pengaduan.status_id',2)
       ->where('tr_pengaduan.create_by',$myuser)
       ->where('tr_pengaduan.kanal_id',$idu1)
       ->wheredate('tr_pengaduan.created_at','>=','2021-10-01')
       ->wheredate('tr_pengaduan.created_at','<=','2021-10-29')   
       ->orderby('pengaduan_id', 'ASC')->get();
      return view('pages.admin.tr_pengaduan.index', compact('tr_pengaduans'));
  } 

  public function index_disposisi($idu){ //facebook
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
   ->where('tr_pengaduan.status_id',3)
   ->where('tr_pengaduan.status_id',$idu)
   ->wheredate('tr_pengaduan.created_at','>=','2021-10-01')
   ->wheredate('tr_pengaduan.created_at','<=','2021-10-29')   
   ->orderby('pengaduan_id', 'ASC')->get();
  return view('pages.admin.tr_pengaduan.index', compact('tr_pengaduans'));
} 

public function index_responder($idu){ //facebook
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
   ->where('tr_pengaduan.status_id',4)
   ->where('tr_pengaduan.create_by',$idu)
   ->wheredate('tr_pengaduan.created_at','>=','2021-10-01')
   ->wheredate('tr_pengaduan.created_at','<=','2021-10-29')   
   ->orderby('pengaduan_id', 'ASC')->get();
  return view('pages.admin.tr_pengaduan.index', compact('tr_pengaduans'));
} 
    public function index(Request $request){
        $nama_status = "verifikator"; 
        $nama_status1="responder";
        
        $txttglawal = $request->post('start_date', date('Y-m-d'));
        $txttglakhir = $request->post('end_date', date('Y-m-d'));
        $kanal_id = (int) $request->post('kanal_id', 0);
        $status_id = (int) $request->post('status_id', 0);
        $posisi_id = (int) $request->post('posisi_id', 0);
        
        $disposisi_verifikator = DB::select("call sp_cmduser_flag_role('".$nama_status."')"); 
        $disposisi_responder = DB::select("call sp_cmduser_flag_role('".$nama_status1."')");

        $tr_pengaduans = DB::table('tr_pengaduan')
            ->join('ms_pengaduan_jenis', 'tr_pengaduan.jenis_id', 'ms_pengaduan_jenis.jenis_id')
            ->join('ms_pengaduan_kanal', 'tr_pengaduan.kanal_id', 'ms_pengaduan_kanal.kanal_id')
            ->join('ms_pengaduan_posisi', 'tr_pengaduan.posisi_id', 'ms_pengaduan_posisi.posisi_id')
            ->join('ms_pengaduan_status', 'tr_pengaduan.status_id', 'ms_pengaduan_status.status_id')
            ->leftjoin('users', 'tr_pengaduan.create_by', 'users.id_user')
            ->select('tr_pengaduan.pengaduan_id', 'ms_pengaduan_jenis.nama_jenis', 'ms_pengaduan_kanal.nama_kanal',
                'ms_pengaduan_posisi.nama_posisi', 'ms_pengaduan_status.nama_status',
                'nama', 'alamat', 'tr_pengaduan.email', 'pekerjaan', 'no_telp', 'obyek_aduan', 'hubungan', 'no_berkas', 'uraian_pengaduan', 'users.username',
                'leadtime1', 'leadtime2', 'leadtime3', 'tr_pengaduan.created_at' )
            ->where(function($q) use ($kanal_id) {
                return $kanal_id != 0 ? $q->where('tr_pengaduan.kanal_id', $kanal_id) : '';
            })
            ->where(function($q) use ($status_id) {
                return $status_id != 0 ? $q->where('tr_pengaduan.status_id', $status_id) : '';
            })
            ->where(function($q) use ($posisi_id) {
                return $posisi_id != 0 ? $q->where('tr_pengaduan.posisi_id', $posisi_id) : '';
            })
            ->wheredate('tr_pengaduan.created_at', '>=', $txttglawal)
            ->wheredate('tr_pengaduan.created_at', '<=', $txttglakhir)   
            ->orderby('pengaduan_id', 'ASC')->get();

        return view('pages.admin.tr_pengaduan.index', compact(
            'tr_pengaduans',
            'disposisi_verifikator',
            'disposisi_responder',
            'txttglawal',
            'txttglakhir',
            'kanal_id', 'status_id'
        ));
    }    

 //      ->whereDate('tgl_mulai_pendf','<=',$this->carbon)
   //    ->whereDate('tgl_hasil_seleksi','>=',$this->carbon)

    //buat di panggil di form  fronend tdk jadi batal
            public function index2(){      
        return view('fronend.form_user.formpengaduan.index');
            }

    public function get()
    {  

        $data = DB::table('tr_pengaduan')
        ->select('tr_pengaduan.*')
        ->orderby('pengaduan_id', 'ASC')->get();
        echo json_encode($data);
    }

    public function create()
    {
        $tr_pengaduan = tr_pengaduan::all();
        return view('pages.admin.tr_pengaduan.index', compact('tr_pengaduan'));
    }

    public function getmax()
    {   $data = DB::table('tr_pengaduan')
        ->selectRaw('max(pengaduan_id) + 1 as jml')
        ->get();
        echo json_encode($data);
    }
   


    public function save2(Request $r)
    {  


        $pengaduan = new Tr_pengaduans;
        $pengaduan->nik = $r->input('txtnik');
        $pengaduan->no_berkas = $r->input('txtno_berkas');

        // $output= [
        //     'data' => $r->input('txtnik'),
        // ];

        // var_dump($output);

        $pengaduan->save();
        $msg['success'] = FALSE;
        
        if ($pengaduan) {
            $msg['success'] = TRUE;
        }
          echo json_encode($msg);
     

    }


    
    public function save(Request $r)
    {  

    //   $output= [
    //         'data' => $r->input('txtnik'),
    //     ];

    //     var_dump($output);


        $pengaduan = new Tr_pengaduan;
        $pengaduan->pengaduan_id = $r->input('txtpengaduan_id');
        $pengaduan->jenis_id = $r->input('txtjenis_id');
        $pengaduan->kanal_id = $r->input('txtkanal_id');
        $pengaduan->status_id = $r->input('txtstatus_id');
        $pengaduan->posisi_id = $r->input('txtposisi_id');
        $pengaduan->nama = $r->input('txtnama');
        $pengaduan->alamat = $r->input('txtalamat');
        $pengaduan->email = $r->input('txtemail');
        $pengaduan->pekerjaan = $r->input('txtpekerjaan');
        $pengaduan->no_telp = $r->input('txtno_telp');
        $pengaduan->obyek_aduan = $r->input('txtobyek_aduan');
        $pengaduan->hubungan = $r->input('txthubungan');
        $pengaduan->no_berkas = $r->input('txtno_berkas');
        $pengaduan->uraian_pengaduan = $r->input('txturaian_pengaduan');
        $pengaduan->create_by = $r->input('txtcreate_by');
        $pengaduan->leadtime1 = $r->input('txtleadtime1');
        $pengaduan->leadtime2 = $r->input('txtleadtime2');
        $pengaduan->leadtime3 = $r->input('txtleadtime3');
        $pengaduan->leadtime4 = $r->input('txtleadtime4');
        $pengaduan->leadtime5 = $r->input('txtleadtime5');
        $pengaduan->update_by = $r->input('txtupdate_by');
        $pengaduan->nik = $r->input('txtnik');
        $pengaduan->save();
        $msg['success'] = FALSE;
        
        if ($pengaduan) {
            $msg['success'] = TRUE;
        }
          echo json_encode($msg);
     
        
    }

 
    public function saveform2(Request $r)
     {  // $jenisid=2;$kanalid=5;$kosong=0;
      
        $pengaduan = new Tr_pengaduan;


        $pengaduan->jenis_id = $r->input('txtpengaduan_id');
        $pengaduan->jenis_id = $r->input('txtjenis_id');
        $pengaduan->kanal_id = $r->input('txtkanal_id');
        $pengaduan->status_id = $r->input('txtstatus_id');
        $pengaduan->posisi_id = $r->input('txtposisi_id');

        $pengaduan->nama = $r->input('txtnama');
        $pengaduan->alamat = $r->input('txtalamat');
        $pengaduan->email = $r->input('txtemail');
        $pengaduan->pekerjaan = $r->input('txtpekerjaan');
        $pengaduan->no_telp = $r->input('txtno_telp');

        $pengaduan->obyek_aduan = $r->input('txtobyek_aduan');
        $pengaduan->hubungan = $r->input('txhubungan');
        $pengaduan->no_berkas = $r->input('txtno_berkas');
        $pengaduan->uraian_pengaduan = $r->input('txturaian_pengaduan');
        $pengaduan->create_by = $r->input('txttxtcreate_by');

        $pengaduan->leadtime1 = $r->input('txtleadtime1'); 
         $pengaduan->leadtime2 = $r->input('txtleadtime2');
         $pengaduan->leadtime3 = $r->input('txtleadtime3');
         $pengaduan->leadtime4 = $r->input('txtleadtime4');
         $pengaduan->leadtime5 = $r->input('txtleadtime5');
         
         $pengaduan->created_at = $r->input('txtcreated_at');
         $pengaduan->update_at = $r->input('txtupdate_at');
         $pengaduan->update_by = $r->input('txtupdate_by');
        $pengaduan->nik = $r->input('txtnik');

       
        $pengaduan->save();
        $msg['success'] = FALSE;
        
        if ($pengaduan) {
            $msg['success'] = TRUE;
        }
          echo json_encode($msg);
     
        
    }
 
    public function update_verifikasi(Request $r, $id)
    {
        $pengaduan = tr_pengaduan::find($id);
        $pengaduan->status_id = $r->input('txtstatus_id');
        $pengaduan->posisi_id = $r->input('txtposisi_id');
        $pengaduan->create_by = $r->input('txtcreate_by');
        $pengaduan->update_by = $r->input('txtupdate_by');   
        $pengaduan->save();
        echo "sukses";
    }

    
    // .--Panggil data untuk edit data tr_pengaduan 


    public function update(Request $r, $id)
    {
        $pengaduan = tr_pengaduan::find($id);
        $pengaduan->pengaduan_id = $r->input('txtpengaduan_id');
        $pengaduan->jenis_id = $r->input('txtjenis');
        $pengaduan->kanal_id = $r->input('txtkanal_id');
        $pengaduan->status_id = $r->input('txtstatus_id');
        $pengaduan->posisi_id = $r->input('txtposisi_id');
        $pengaduan->dokumen_id = $r->input('txtdokumen_id');
        $pengaduan->nama = $r->input('txtnama');
        $pengaduan->alamat = $r->input('txtalamat');
        $pengaduan->email = $r->input('txtemail');
        $pengaduan->pekerjaan = $r->input('txtpekerjaan');
        $pengaduan->no_telp = $r->input('txtno_telp');
        $pengaduan->obyek_aduan = $r->input('txtnama');
        $pengaduan->hubungan = $r->input('txthubungan');
        $pengaduan->no_berkas = $r->input('txtno_berkas');
        $pengaduan->uraian_pengaduan = $r->input('txturaian_pengaduan');
        $pengaduan->create_by = $r->input('txtcreate_by');
        $pengaduan->leadtime1 = $r->input('txtleadtime1');
        $pengaduan->leadtime2 = $r->input('txtleadtime2');
        $pengaduan->leadtime3 = $r->input('txtleadtime3');
        $pengaduan->leadtime4 = $r->input('txtleadtime4');
        $pengaduan->leadtime5 = $r->input('txtleadtime5');
        $pengaduan->created_at = $r->input('txtcreated_at');
        $pengaduan->update_at = $r->input('txtupdate_at');
        $pengaduan->update_by = $r->input('txtupdate_by');   
        $pengaduan->save();
        echo "sukses";
    }

    public function delete($id)
    {
        $tr_pengaduan = DB::table('tr_pengaduan')->where('pengaduan_id', $id)->delete();
        $msg['success'] = FALSE;
        if ($tr_pengaduan) {
            $msg['success'] = TRUE;
        }
        echo json_encode($msg);
    }



    //get sosial media  API
    public function facebookget()
    {
        // $response = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
        // $data = $response->json();
        return view('pages.admin.tr_pengaduan.vfacebook');
    }
    public function twitterget()
    {
        // $response = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
        // $data = $response->json();
        return view('pages.admin.tr_pengaduan.vtwitter');
    }
    public function instagramget()
    {
        // $response = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
        // $data = $response->json();
        return view('pages.admin.tr_pengaduan.vinstagram');
    }
    public function youtubeget()
    {
        // $response = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
        // $data = $response->json();
        return view('pages.admin.tr_pengaduan.vyoutube');
    }
    //end get sosial mendia
    public function facebookpost()
    {
        // $response = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
        // $data = $response->json();
        return view('pages.admin.tr_pengaduan.vfacebook');
    }
    public function twitterpost()
    {
        // $response = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
        // $data = $response->json();
        return view('pages.admin.tr_pengaduan.vfacebook');
    }
    public function insagrampost()
    {
        // $response = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
        // $data = $response->json();
        return view('pages.admin.tr_pengaduan.vfacebook');
    }
    
public function emailget()
{
    // $response = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
    // $data = $response->json();
    return view('pages.admin.tr_pengaduan.vyoutube');
}
public function suratget()
{
    // $response = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
    // $data = $response->json();
    return view('pages.admin.tr_pengaduan.vyoutube');
}
public function portalget()
{
    // $response = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
    // $data = $response->json();
    return view('pages.admin.tr_pengaduan.vyoutube');
}

    //start post sosial media
}
