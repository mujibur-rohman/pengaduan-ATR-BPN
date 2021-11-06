<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Storage;
use App\Http\MyController;
use App\Tr_pengaduan;
use App\MailTemplate;
use DB;
use Auth;

class Tr_pengaduanController extends MyController
{
    private $tr_pengaduans ;
    private $disposisi_verifikator;
    private $disposisi_responder;

    public function index(Request $request){
        $txttglawal = $request->get('start_date', date('Y-m-d'));
        $txttglakhir = $request->get('end_date', date('Y-m-d'));
        $kanal_id = (int) $request->get('kanal_id', 0);
        $status_id = (int) $request->get('status_id', 0);
        $posisi_id = (int) $request->get('posisi_id', 0);
        $klasifikasi_id = (int) $request->get('klasifikasi_id', 0);
        $kategori_id = (int) $request->get('kategori_id', 0);
        
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
            ->where('tr_pengaduan.verified_email', 'Y')
            ->where(function($q) use ($kanal_id) {
                return $kanal_id != 0 ? $q->where('tr_pengaduan.kanal_id', $kanal_id) : '';
            })
            ->where(function($q) use ($status_id) {
                return $status_id != 0 ? $q->where('tr_pengaduan.status_id', $status_id) : '';
            })
            ->where(function($q) use ($posisi_id) {
                return $posisi_id != 0 ? $q->where('tr_pengaduan.posisi_id', $posisi_id) : '';
            })
            ->where(function($q) use ($kategori_id) {
                return $kategori_id != 0 ? $q->where('tr_pengaduan.kategori_id', $kategori_id) : '';
            })
            ->where(function($q) use ($klasifikasi_id) {
                return $klasifikasi_id != 0 ? $q->where('tr_pengaduan.klasifikasi_id', $klasifikasi_id) : '';
            })
            ->wheredate('tr_pengaduan.created_at', '>=', $txttglawal)
            ->wheredate('tr_pengaduan.created_at', '<=', $txttglakhir)   
            ->orderby('pengaduan_id', 'ASC')->get();

        return view('pages.admin.tr_pengaduan.index', compact(
            'tr_pengaduans',
            'txttglawal', 'txttglakhir',
            'kanal_id', 'status_id', 'klasifikasi_id', 'kategori_id'
        ));
    }
    
    public function view($id) {
        $model = Tr_Pengaduan::find($id);
        $posisi = DB::table('ms_pengaduan_posisi')->get();
        $respon = \App\Tr_pengaduan_respon::where('pengaduan_id', $id)->first();
        
        $lampiran = null;
        if ($model != null) {
            $lampiran = $model->lampiran->all();
        }

        return view('pages.admin.tr_pengaduan.view', compact('id', 'model', 'lampiran', 'posisi', 'respon'));
    }

    public function getPosisi(Request $request) {
        $posisi = $request->get('posisi');

        $data = [];
        switch($posisi) {
            default: $data = []; break;
            case "verifikator": $data = \App\ViewUserPosisi::getVerifikator()->get(); break;
            case "responder": 
                $parent_id = $request->get('posisi_id');
                $data = \App\ViewUserPosisi::getResponder($parent_id)->get(); 
                break;
        }
        
        return json_encode([
            'data' => $data,
        ]);
    }
    
    /**
     * Simpan data dari admin ke verifikator
     * 
     * @param Request $request
     * @return type
     */
    public function saveAdmin(Request $request) {
        $pengaduan_id = $request->post('pengaduan_id');
        $tmp_posisi = $request->post('posisi_id');
        $keterangan = $request->post('keterangan');
        $klasifikasi_id = $request->post('klasifikasi_id');
        $kategori_id = $request->post('kategori_id');
        
        $rules = [
            'pengaduan_id' => ['required'],
            'posisi_id' => ['required'],
            'klasifikasi_id' => ['required'],
            'kategori_id' => ['required'],
            'lampiran_1' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
            'lampiran_2' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
        ];
        $msg = [
            'required' => ':attribute harus diisi.',
            'mimetypes' => 'Bukti lampiran harus dalam format jpeg atau pdf',
            'max' => 'Ukuran bukti lampiran maksimal 1Mb'
        ];
        $validator = Validator::make($request->all(), $rules, $msg);
        
        if ($validator->fails()) {
            echo json_encode([
                'success' => false,
                'message' => $validator->errors()->first()
            ]);
            return;
        }
        
        $model = Tr_pengaduan::find($pengaduan_id);
        if ($model == null) {
            echo json_encode([
                'success' => false,
                'message' => 'Data pengaduan tidak ada'
            ]);
            return;
        }
        
        $status_id = config('pengaduan.status_id_verifikator');
        $t = explode('|', $tmp_posisi);
        $id_user = $t[0];
        $posisi_id = $t[1];
        
        try {
            DB::beginTransaction();
            
            // update data pengaduan
            $model->klasifikasi_id = $klasifikasi_id;
            $model->posisi_id = $posisi_id;
            $model->posisi_user_id = $id_user;
            $model->kategori_id = $kategori_id;
            $model->status_id = $status_id;
            $model->update_by = Auth::id();
            $model->updated_at = date('Y-m-d H:i:s');
            $model->save();

            // update log
            $modelLog = new \App\Tr_pengaduan_log();
            $modelLog->pengaduan_id = $pengaduan_id;
            $modelLog->id_status = $status_id;
            $modelLog->id_posisi = $posisi_id;
            $modelLog->waktu = date('Y-m-d H:i:s');
            $modelLog->keterangan = $keterangan;
            $modelLog->user_id = $id_user;
            
            if ($request->file()) {
                if ($request->lampiran_1) {
                    $modelLog->lampiran_1_nama = time().'_'.$request->lampiran_1->getClientOriginalName();
                    $modelLog->lampiran_1_path = $request->file('lampiran_1')->store('public/files');
                }
                
                if ($request->lampiran_2) {
                    $modelLog->lampiran_2_nama = time().'_'.$request->lampiran_2->getClientOriginalName();
                    $modelLog->lampiran_2_path = $request->file('lampiran_2')->store('public/files');
                }
            }

            $modelLog->save();
            DB::commit();
            
            // send email
            $params = [];
            MailTemplate::sendWith('disposisi_ke_verifikator', $model->email, $params);
        
            echo json_encode([
                'success' => true,
                'message' => 'Berhasil menyimpan'
            ]);
        } catch (\PDOException $e) {
            // Woopsy
            DB::rollBack();
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    
    /**
     * Simpan data dari Verifikator ke Responder
     * 
     * @param Request $request
     * @return type
     */
    public function saveVerifikator(Request $request) {
        $pengaduan_id = $request->post('pengaduan_id');
        $tmp_posisi = $request->post('posisi_id');
        $keterangan = $request->post('keterangan');
        
        $rules = [
            'pengaduan_id' => ['required'],
            'posisi_id' => ['required'],
            'lampiran_1' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
            'lampiran_2' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
        ];
        $msg = [
            'required' => ':attribute harus diisi.',
            'mimetypes' => 'Bukti lampiran harus dalam format jpeg atau pdf',
            'max' => 'Ukuran bukti lampiran maksimal 1Mb'
        ];
        $validator = Validator::make($request->all(), $rules, $msg);
        
        if ($validator->fails()) {
            echo json_encode([
                'success' => false,
                'message' => $validator->errors()->first()
            ]);
            return;
        }
        
        $model = Tr_pengaduan::find($pengaduan_id);
        if ($model == null) {
            echo json_encode([
                'success' => false,
                'message' => 'Data pengaduan tidak ada'
            ]);
            return;
        }
        
        $status_id = config('pengaduan.status_id_responder');
        $t = explode('|', $tmp_posisi);
        $id_user = $t[0];
        $posisi_id = $t[1];
        
        try {
            DB::beginTransaction();
            
            // update data pengaduan
            $model->posisi_id = $posisi_id;
            $model->posisi_user_id = $id_user;
            $model->status_id = $status_id;
            $model->update_by = Auth::id();
            $model->updated_at = date('Y-m-d H:i:s');
            $model->save();

            // update log
            $modelLog = new \App\Tr_pengaduan_log();
            $modelLog->pengaduan_id = $pengaduan_id;
            $modelLog->id_status = $status_id;
            $modelLog->id_posisi = $posisi_id;
            $modelLog->waktu = date('Y-m-d H:i:s');
            $modelLog->keterangan = $keterangan;
            $modelLog->user_id = $id_user;
            
            if ($request->file()) {
                if ($request->lampiran_1) {
                    $modelLog->lampiran_1_nama = time().'_'.$request->lampiran_1->getClientOriginalName();
                    $modelLog->lampiran_1_path = $request->file('lampiran_1')->store('public/files');
                }
                
                if ($request->lampiran_2) {
                    $modelLog->lampiran_2_nama = time().'_'.$request->lampiran_2->getClientOriginalName();
                    $modelLog->lampiran_2_path = $request->file('lampiran_2')->store('public/files');
                }
            }

            $modelLog->save();
            DB::commit();
            
            // send email
            $params = [];
            MailTemplate::sendWith('disposisi_ke_responder', $model->email, $params);
        
            echo json_encode([
                'success' => true,
                'message' => 'Berhasil menyimpan'
            ]);
        } catch (\PDOException $e) {
            // Woopsy
            DB::rollBack();
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    
    /**
     * Simpan data memberikan tanggapan
     * 
     * @param Request $request
     * @return type
     */
    public function saveResponder(Request $request) {
        $pengaduan_id = $request->post('pengaduan_id');
        $jawaban = $request->post('jawaban');
        
        $rules = [
            'pengaduan_id' => ['required'],
            'jawaban' => ['required'],
            'lampiran_1' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
            'lampiran_2' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
        ];
        $msg = [
            'required' => ':attribute harus diisi.',
            'mimetypes' => 'Bukti lampiran harus dalam format jpeg atau pdf',
            'max' => 'Ukuran bukti lampiran maksimal 1Mb'
        ];
        $validator = Validator::make($request->all(), $rules, $msg);
        
        if ($validator->fails()) {
            echo json_encode([
                'success' => false,
                'message' => $validator->errors()->first()
            ]);
            return;
        }
        
        $model = Tr_pengaduan::find($pengaduan_id);
        if ($model == null) {
            echo json_encode([
                'success' => false,
                'message' => 'Data pengaduan tidak ada'
            ]);
            return;
        }
        
        $status_id = config('pengaduan.status_id_respon');
        
        try {
            DB::beginTransaction();
            
            // update data pengaduan
            $model->status_id = $status_id;
            $model->update_by = Auth::id();
            $model->updated_at = date('Y-m-d H:i:s');
            $model->save();

            // update log
            $modelLog = new \App\Tr_pengaduan_log();
            $modelLog->pengaduan_id = $pengaduan_id;
            $modelLog->id_status = $status_id;
            $modelLog->id_posisi = $model->posisi_id;
            $modelLog->waktu = date('Y-m-d H:i:s');
            $modelLog->keterangan = '';
            $modelLog->user_id = $model->posisi_user_id;
            
            // add response
            $modelRespon = new \App\Tr_pengaduan_respon();
            $modelRespon->pengaduan_id = $model->pengaduan_id;
            $modelRespon->user_id = $model->posisi_user_id;
            $modelRespon->posisi_id = $model->posisi_id;
            $modelRespon->jawaban = $jawaban;
            $modelRespon->create_date = date('Y-m-d H:i:s');
            $modelRespon->create_by = Auth::id();
            $modelRespon->update_date = date('Y-m-d H:i:s');
            $modelRespon->update_by = Auth::id();
            $modelRespon->save();
            
            if ($request->file()) {
                if ($request->lampiran_1) {
                    $modelLog->lampiran_1_nama = time().'_'.$request->lampiran_1->getClientOriginalName();
                    $modelLog->lampiran_1_path = $request->file('lampiran_1')->store('public/files');
                    
                    $modelResponLampiran = new \App\Tr_pengaduan_respon_dokumen();
                    $modelResponLampiran->respon_id = $modelRespon->respon_id;
                    $modelResponLampiran->nama_file = $modelLog->lampiran_1_nama;
                    $modelResponLampiran->file_path = $modelLog->lampiran_1_path;
                    $modelResponLampiran->create_date = date('Y-m-d H:i:s');
                    $modelResponLampiran->create_by = Auth::id();
                    $modelResponLampiran->save();
                }
                
                if ($request->lampiran_2) {
                    $modelLog->lampiran_2_nama = time().'_'.$request->lampiran_2->getClientOriginalName();
                    $modelLog->lampiran_2_path = $request->file('lampiran_2')->store('public/files');
                    
                    $modelResponLampiran = new \App\Tr_pengaduan_respon_dokumen();
                    $modelResponLampiran->respon_id = $modelRespon->respon_id;
                    $modelResponLampiran->nama_file = $modelLog->lampiran_2_nama;
                    $modelResponLampiran->file_path = $modelLog->lampiran_2_path;
                    $modelResponLampiran->create_date = date('Y-m-d H:i:s');
                    $modelResponLampiran->create_by = Auth::id();
                    $modelResponLampiran->save();
                }
            }

            $modelLog->save();
            DB::commit();
            
            // send email
            $params = [
                '{content}' => $jawaban
            ];
            MailTemplate::sendWith('memberikan_respon', $model->email, $params);
        
            echo json_encode([
                'success' => true,
                'message' => 'Berhasil menyimpan'
            ]);
        } catch (\PDOException $e) {
            // Woopsy
            DB::rollBack();
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    
    public function getLog(Request $request) {
        $pengaduan_id = $request->get('pengaduan_id');
        
        $model = Tr_pengaduan::find($pengaduan_id);
        if ($model == null) {
            echo json_encode([
                'success' => false,
                'message' => 'Data pengaduan tidak ada'
            ]);
            return;
        }
        $data = [];
        $log = $model->log()->get();
        if (!empty($log)) {
            foreach($log as $row) {
                $lampiran = [];
                if (!empty($row['lampiran_1_path'])) {
                    $lampiran[] = [
                        'name' => $row['lampiran_1_nama'],
                        'path' => URL::to('/') . Storage::url($row['lampiran_1_path'])
                    ];
                }
                
                if (!empty($row['lampiran_2_path'])) {
                    $lampiran[] = [
                        'name' => $row['lampiran_2_nama'],
                        'path' =>URL::to('/') . Storage::url($row['lampiran_2_path'])
                    ];
                }
                
                $temp = [
                    'created_at' => date('d M Y H:i', strtotime($row['waktu'])),
                    'status_id' => $row['id_status'],
                    'status_name' => $row->status->nama_status,
                    'fullname' => isset($row->user) ? $row->user->fullname : '',
                    'keterangan' => $row['keterangan'],
                    'lampiran' => $lampiran
                ];
                $data[] = $temp;
            }
        }
        
        echo json_encode([
            'success' => true,
            'data' => $data
        ]);
    }
    
    private function createResponse($pengaduan_id, $posisi_id, $keterangan) {
        $model = new \App\Tr_pengaduan_respon();
        $model->pengaduan_id = $pengaduan_id;
        $model->posisi_id = $posisi_id;
        $model->user_id = Auth::id();
        $model->jawaban = $keterangan;
        $model->create_date = date('Y-m-d H:i:s');
        $model->create_by = Auth::id();
        $model->update_date = date('Y-m-d H:i:s');
        $model->update_by = Auth::id();
        $model->save();
        
        return $model;
    }
    
    private function saveLampiran($response_id, $field, $request, $request_field) {
        if (isset($request_field)) {
            $name = time().'_'.$request_field->getClientOriginalName();
            $path = $request->file($field)->store('public/files');
            
            $model = new \App\Tr_pengaduan_respon_dokumen();
            $model->respon_id = $response_id;
            $model->nama_file = $name;
            $model->file_path = $path;
            $model->create_date = date('Y-m-d H:i:s');
            $model->create_by = Auth::id();
            $model->save();
        }
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