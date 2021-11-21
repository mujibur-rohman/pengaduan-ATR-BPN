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

class Tr_pengaduanController extends MyController {
    
    public function save_create(Request $request) {
        $kanal_id = $request->post('kanal_id');
        
        if (!in_array($kanal_id, [7,8])) {
            return redirect('admin/tr_pengaduan/create?kanal_id=' . $kanal_id);
        }
        
        $rules = [
            'pengaduan.nama' => ['required', 'max:50'],
            'pengaduan.nik' => ['required'],
            'pengaduan.alamat' => ['required'],
            'pengaduan.email' => ['email', 'required'],
            'pengaduan.phone' => ['required'],
            'pengaduan.pekerjaan' => ['required'],
            'pengaduan.objek_aduan' => ['required'],
            'pengaduan.hubungan' => ['required'],
            'pengaduan.no_berkas' => ['required'],
            'pengaduan.uraian' => ['required'],
            'bukti1' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
            'bukti2' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
            'bukti3' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
            'bukti4' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
            'bukti5' => ['file', 'max:1024', 'mimetypes:image/jpg,image/png,image/jpeg,application/pdf'],
        ];
        $msg = [
            'required' => ':attribute harus diisi.',
            'mimetypes' => 'Bukti lampiran harus dalam format jpeg atau pdf',
            'max' => 'Ukuran bukti lampiran maksimal 1Mb'
        ];
        $field = [
            'pengaduan.nik' => 'NIK',
            'pengaduan.alamat' => 'alamat',
            'pengaduan.email' => 'alamat email',
            'pengaduan.phone' => 'nomor handphone',
            'pengaduan.objek_aduan' => 'Objek Aduan (No. SHM/Letak Tanah)',
            'pengaduan.uraian' => 'Uraian Pengaduan',
            'pengaduan.no_berkas' => 'Nomor Berkas Permohonan (untuk pelayanan)'
        ];
        $validator = Validator::make($request->all(), $rules, $msg, $field);

        if ($validator->fails()) {
            return redirect('admin/tr_pengaduan/create')
                        ->withErrors($validator)
                        ->withInput();
        }

        $data = $request->post('pengaduan');
        
        $model = new Tr_pengaduan();
        $model->jenis_id = 1;
        $model->kanal_id = $kanal_id;
        $model->status_id = 1;
        $model->posisi_id = 1;
        $model->kategori_id = 0;
        $model->klasifikasi_id = 0;
        $model->nik = $data['nik'];
        $model->nama = $data['nama'];
        $model->alamat = $data['alamat'];
        $model->email = $data['email'];
        $model->pekerjaan = $data['pekerjaan'];
        $model->no_telp = $data['phone'];
        $model->obyek_aduan = $data['objek_aduan'];
        $model->hubungan = $data['hubungan'];
        $model->no_berkas = $data['no_berkas'];
        $model->uraian_pengaduan = $data['uraian'];
        $model->create_by = 1;
        $model->created_at = date('Y-m-d H:i:s');
        $model->update_by = 0;
        $model->updated_at = date('Y-m-d H:i:s');
        $model->verified_email = 'Y';
        $model->verified_code = '';
        $model->kode_tiket = '';
        $model->save();
        
        // log pengaduan
        $modelLog = new \App\Tr_pengaduan_log();
        $modelLog->pengaduan_id = $model->pengaduan_id;
        $modelLog->id_status = $model->status_id;
        $modelLog->id_posisi = $model->posisi_id;
        $modelLog->waktu = date('Y-m-d H:i:s');
        $modelLog->user_id = 1;
        $modelLog->save();

        if ($request->file()) {
            $this->saveLampiranCreate($model->pengaduan_id, 'bukti1', $request, $request->bukti1);
            $this->saveLampiranCreate($model->pengaduan_id, 'bukti2', $request, $request->bukti2);
            $this->saveLampiranCreate($model->pengaduan_id, 'bukti3', $request, $request->bukti3);
            $this->saveLampiranCreate($model->pengaduan_id, 'bukti4', $request, $request->bukti4);
            $this->saveLampiranCreate($model->pengaduan_id, 'bukti5', $request, $request->bukti5);
        }
        
        return redirect('admin/tr_pengaduan/view/' . $model->pengaduan_id)
                ->with('message', 'Berhasil menyimpan data');
    }
    
    private function saveLampiranCreate($pengaduan_id, $field, $request, $request_field) {
        if (isset($request_field)) {
            $name = time().'_'.$request_field->getClientOriginalName();
            $path = $request->file($field)->store('public/files');
            
            $model = new \App\Tr_pengaduan_dokumen();
            $model->pengaduan_id = $pengaduan_id;
            $model->nama_file = $name;
            $model->file_path = $path;
            $model->create_date = date('Y-m-d H:i:s');
            $model->create_by = 0;
            $model->save();
        }
    }
    
    public function create(Request $request) {
        $kanal_id = $request->get('kanal_id');
        
        $model = $request->old('pengaduan');
        if (empty($model)) {
            $model = [
                'nama' => '',
                'nik' => '',
                'alamat' => '',
                'email' => '',
                'phone' => '',
                'pekerjaan' => '',
                'objek_aduan' => '',
                'hubungan' => '',
                'no_berkas' => '',
                'uraian' => ''
            ];
        }
        
        return view('pages.admin.tr_pengaduan.create', compact('kanal_id', 'model'));
    }
    
    public function index(Request $request){
        $txttglawal = $request->get('start_date', date('Y-m-d', strtotime("-7 days")));
        $txttglakhir = $request->get('end_date', date('Y-m-d'));
        $kanal_id = (int) $request->get('kanal_id', 0);
        $status_id = (int) $request->get('status_id', 0);
        $posisi_id = (int) $request->get('posisi_id', 0);
        $klasifikasi_id = (int) $request->get('klasifikasi_id', 0);
        $kategori_id = (int) $request->get('kategori_id', 0);
        
        $role_name = Auth::user()->role->name;
        $permission = \App\User::getActivePermission();
        
        switch ($permission) {
            case "admin":
                break;
            case "verifikator":
                $status_id = 2;
                break;
            case "responder":
                if (!in_array($status_id, [3, 4, 5])) {
                    $status_id = 3;
                }
                break;
        }
        $tr_pengaduans = DB::table('tr_pengaduan')
            ->join('ms_pengaduan_jenis', 'tr_pengaduan.jenis_id', 'ms_pengaduan_jenis.jenis_id')
            ->join('ms_pengaduan_kanal', 'tr_pengaduan.kanal_id', 'ms_pengaduan_kanal.kanal_id')
            ->join('ms_pengaduan_posisi', 'tr_pengaduan.posisi_id', 'ms_pengaduan_posisi.posisi_id')
            ->join('ms_pengaduan_status', 'tr_pengaduan.status_id', 'ms_pengaduan_status.status_id')
            ->leftjoin('users', 'tr_pengaduan.create_by', 'users.id_user')
            ->select('tr_pengaduan.pengaduan_id', 'ms_pengaduan_jenis.nama_jenis', 'ms_pengaduan_kanal.nama_kanal',
                'ms_pengaduan_posisi.nama_posisi', 'ms_pengaduan_status.nama_status', 'tr_pengaduan.status_id',
                'nama', 'alamat', 'tr_pengaduan.email', 'pekerjaan', 'no_telp', 'obyek_aduan', 'hubungan', 'no_berkas', 'uraian_pengaduan', 'users.username',
                'leadtime1', 'leadtime2', 'leadtime3', 'tr_pengaduan.created_at' )
            ->where('tr_pengaduan.verified_email', 'Y')
            ->where(function($q) use ($kanal_id) {
                return $kanal_id != 0 ? $q->where('tr_pengaduan.kanal_id', $kanal_id) : '';
            })
            ->where(function($q) use ($status_id, $role_name) {
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

        $kanal_name = $kanal_id == 0 ? "Semua" : \App\Pengaduan_kanal::getName($kanal_id);
        
        return view('pages.admin.tr_pengaduan.index', compact(
            'tr_pengaduans',
            'txttglawal', 'txttglakhir',
            'kanal_id', 'status_id', 'klasifikasi_id', 'kategori_id',
            'kanal_name', 'permission'
        ));
    }
    
    public function view($id) {
        $model = Tr_Pengaduan::find($id);
        $posisi = DB::table('ms_pengaduan_posisi')->get();
        $isLocked = Tr_pengaduan::isLocked($model);
        $permission = \App\User::getActivePermission();
        $is_valid_permission = $model->checkPermission($permission);
        
        if ($is_valid_permission) {
            if ($isLocked) {
                if ($model->lock_by_id == Auth::id()) {
                    $isLocked = false;
                    Tr_pengaduan::lockNow($model, Auth::id());
                }
            } else {
                Tr_pengaduan::lockNow($model, Auth::id());
            }
        }
        
        $lampiran = null;
        $tangapan = null;
        $old_jawaban = "";
        
        if ($model != null) {
            $lampiran = $model->lampiran->all();
            $tangapan = \App\Tr_pengaduan_respon::where('pengaduan_id', $model->pengaduan_id)->get();
        }

        return view('pages.admin.tr_pengaduan.view', compact(
            'id', 'model', 'lampiran', 'posisi', 'old_jawaban',
            'tangapan', 'isLocked', 'permission', 'is_valid_permission',
        ));
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
    
    public function save_tangapan(Request $request) {
        $pengaduan_id = $request->post('pengaduan_id');
        $jawaban = $request->post('tangapan');
        
        $model = Tr_Pengaduan::find($pengaduan_id);
        if ($model == null) {
            return redirect()->route('/admin/tr_pengaduan/view/')
                ->with('error', "Gagal menyimpan. Data tidak ditemukan");
        }
        
        if ($model->status_id != 4) {
            return redirect()->route('view_pengaduan', ['id' => $pengaduan_id])
                ->with('error', "Gagal menyimpan. Status pengaduan salah");
        }

        if ($jawaban == "") {
            return redirect()->route('view_pengaduan', ['id' => $pengaduan_id])
                ->with('error', "Tanggapan tidak boleh kosong");
        }

        $min_word_count = \App\Settings::getValue('min_word_tanggapan', 5);
        $word_count = str_word_count($jawaban, 0);
        if ($word_count < $min_word_count) {
            return redirect()->route('view_pengaduan', ['id' => $pengaduan_id])
                ->with('error', "Minimal tanggapan adalah 3 kata")
                ->withInput();
        }

        // simpan data
        $respon = new \App\Tr_pengaduan_respon();
        $respon->pengaduan_id = $model->pengaduan_id;
        $respon->user_id = $model->posisi_user_id;
        $respon->posisi_id = $model->posisi_id;
        $respon->jawaban = $jawaban;
        $respon->create_date = date('Y-m-d H:i:s');
        $respon->create_by = $model->posisi_user_id;
        $respon->update_date = date('Y-m-d H:i:s');
        $respon->update_by = $model->posisi_user_id;
        $respon->is_from_pengadu = 'N';
        $respon->save();
        
        $model->updated_at = date('Y-m-d H:i:s');
        $model->save();
        
        return redirect()->route('view_pengaduan', ['id' => $pengaduan_id])
                ->with('success', "Berhasil menyimpan tanggapan")
                ->withInput();
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

            Tr_pengaduan::lockRelease($model);
            
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

            Tr_pengaduan::lockRelease($model);
            
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

            Tr_pengaduan::lockRelease($model);
            
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
    
    public function lock_release(Request $request) {
        $pengaduan_id = $request->post('pengaduan_id');
        
        $model = Tr_pengaduan::find($pengaduan_id);
        if ($model == null) {
            echo json_encode([
                'success' => false,
                'message' => 'Data pengaduan tidak ada'
            ]);
            return;
        }
        
        Tr_pengaduan::lockRelease($model);
        
        echo json_encode([
            'success' => true,
            'message' => 'Unlock success'
        ]);
    }
}