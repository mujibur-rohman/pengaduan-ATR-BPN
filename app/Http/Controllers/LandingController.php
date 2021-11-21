<?php

namespace App\Http\Controllers;

use App\ms_faqs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use App\MailTemplate;
use App\Tr_pengaduan;

class LandingController extends Controller {
    
    public function index(Request $request) {
        $faqs = ms_faqs::where([['faq_posisi', 'Eksternal'], ['parent_id', 0]])->with('children.children')->get();
        // dd($faqs);
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
        // dd($faq);
        return view('pages.landing.index', compact('model', 'faqs'));
    }

    public function simpan(Request $request) {
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
            return redirect('/#form')
                        ->withErrors($validator)
                        ->withInput();
        }

        $data = $request->post('pengaduan');
        $code = md5(date('YmdHis') . $data['email'] . rand(10, 99) . rand(10, 99)) . '_' . time();
        
        $model = new Tr_pengaduan();
        $model->jenis_id = 1;
        $model->kanal_id = 5;
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
        $model->verified_email = 'N';
        $model->verified_code = $code;
        $model->kode_tiket = '';
        $model->sex = $data['sex'];
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
            $this->saveLampiran($model->pengaduan_id, 'bukti1', $request, $request->bukti1);
            $this->saveLampiran($model->pengaduan_id, 'bukti2', $request, $request->bukti2);
            $this->saveLampiran($model->pengaduan_id, 'bukti3', $request, $request->bukti3);
            $this->saveLampiran($model->pengaduan_id, 'bukti4', $request, $request->bukti4);
            $this->saveLampiran($model->pengaduan_id, 'bukti5', $request, $request->bukti5);
        }
        
        // send email
        $params = [
            '{url}' => \Illuminate\Support\Facades\URL::to('/verifikasi?token=' . $code)
        ];
        MailTemplate::sendWith('pengaduan_verified', $model->email, $params);
        
        return view('pages.landing.simpan', compact('model'));
    }

    private function saveLampiran($pengaduan_id, $field, $request, $request_field) {
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
    
    public function asJson($success, $data, $message = "") {
        $json = [
            'success' => $success
        ];
        
        if (!empty($data)) { $json['data'] = $data; }
        if (!empty($message)) { $json['message'] = $message; }
        
        return response()->json($json);
    }
    
    public function verifikasi(Request $request) {
        $token = $request->get('token');
        
        $kode_tiket = '';
        $model = Tr_pengaduan::where('verified_code', $token)->first();
        if ($model != null) {
            
            if ($request->ajax()) {
                $password = $request->post('password');
                $password_repeat = $request->post('password_repeat');
                
                if ($password == "") { return $this->asJson(false, null, 'Password tidak boleh kosong'); }
                if (strlen($password) < 7) { return $this->asJson(false, null, 'Panjang password minimal 10 karakter'); }
                if ($password != $password_repeat) { return $this->asJson(false, null, 'Password dan ulangi password tidak sama'); }
                
                $model->generatePassword($password);
                $model->verified_code = '';
                $model->verified_email_date = date('Y-m-d H:i:s');
                $model->verified_email = 'Y';
                $model->save();
                
                $message = 'Pengaduan terbaru. Kode tiket #' . $model->kode_tiket;
                $url = URL::to('/admin/tr_pengaduan/view/' . $model->pengaduan_id);
                
                \App\Notification::addToAdmin($message, $url);
                
                $cJson = json_encode([
                    'kode_tiket' => $model->kode_tiket,
                ]);
                Cookie::queue('ticket', $cJson, 120);
                
                $params = [
                    '{url}' => URL::to('/tiket?kode=' . $model->kode_tiket),
                    '{kode_tiket}' => $kode_tiket
                ];
                MailTemplate::sendWith('pengaduan_kode_tiket', $model->email, $params);
                
                return $this->asJson(true, [], "Berhasil disimpan");
            } else {
                $kode_tiket = substr(base64_encode(md5(date('YmdHis') . $model->email . rand(10, 99) . rand(10, 99))), 0, 8);
                
                $model->kode_tiket = empty($model->kode_tiket) ? $kode_tiket : $model->kode_tiket;
                $model->save();
            }
            
        } else {
            $token = null;
        }
        
        if (empty($model->password_hash)) {
            return view('pages.landing.password', compact('token', 'kode_tiket', 'model'));
        } else {
            return view('pages.landing.verifikasi', compact('token', 'kode_tiket', 'model'));
        }
    }

    private function getAuthModel(Request $request) {
        $cJson = $request->cookie('ticket');
        
        if (empty($cJson)) { return null; }
        
        $json = json_decode($cJson);
        $kode_tiket = $json->kode_tiket;
        
        if (empty($kode_tiket)) { return null; }
        
        $model = Tr_pengaduan::where('kode_tiket', $kode_tiket)->first();
        if ($model == null) { return null; }
        
        return $model;
    }
    
    public function tiket_login(Request $request) {
        $model = null;
            
        if ($request->method() == "POST") {
            $kode_tiket = $request->post('kode_tiket', null);
            $password = $request->post('password', null);
            
            if (!empty($kode_tiket) && !empty($password)) {
                $model = Tr_pengaduan::where('kode_tiket', $kode_tiket)->first();
                
                $error = false;
                if ($model == null) { 
                    return redirect()->route('tiket_login')
                        ->with('error', "Kode tiket atau password salah");
                }
                
                $password_hash = base64_encode(md5($model->pengaduan_id . $password));
                if ($model->password_hash != $password_hash) {
                    return redirect()->route('tiket_login')
                        ->with('error', "Kode tiket atau password salah");
                }
            }
            
            $cJson = json_encode([
                'kode_tiket' => $model->kode_tiket,
            ]);
            Cookie::queue(Cookie::make('ticket', $cJson, 120));
            
            return redirect()->route('tiket');
        }
        
        return view('pages.landing.tiket_login', compact('model'));
    }
    
    public function tiket(Request $request) {
        
        $model = $this->getAuthModel($request);
        
        if ($model == null) { return redirect('/tiket_login'); }
        $old_jawaban = $request->old('tangapan');
        
        if ($request->method() == "POST") {
            $pengaduan_id = $request->post("pengaduan_id");
            $action = $request->post("action");
            $jawaban = $request->post("tangapan");
            
            if ($action == "save_tangapan") {
                // validate pengaduan_id
                if ($pengaduan_id != $model->pengaduan_id) {
                    return redirect()->route('tiket')
                        ->with('error', "Gagal menyimpan. Pengaduan ID salah");
                }
                
                if ($model->status_id != 4) {
                    return redirect()->route('tiket')
                        ->with('error', "Gagal menyimpan. Status pengaduan salah");
                }
                
                if ($jawaban == "") {
                    return redirect()->route('tiket')
                        ->with('error', "Tanggapan tidak boleh kosong");
                }
                
                $min_word_count = \App\Settings::getValue('min_word_tanggapan', 5);
                $word_count = str_word_count($jawaban, 0);
                if ($word_count < $min_word_count) {
                    return redirect()->route('tiket')
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
                $respon->is_from_pengadu = 'Y';
                $respon->save();
                
                $model->updated_at = date('Y-m-d H:i:s');
                $model->save();
                
                $message = 'Pengadu memberikan tangapan. Kode tiket #' . $model->kode_tiket;
                $url = URL::to('/admin/tr_pengaduan/view/' . $model->pengaduan_id);
                
                \App\Notification::add($model->posisi_user_id, $message, $url);
                
            } else if ($action == "logout") {
                setcookie('ticket', 'Expired', time() - 100000, '/');
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Berhasil logout'
                ]);
                exit();
            } else if ($action == "close_ticket") {
                $model->status_id = 5;
                $model->save();
                
                $log = new \App\Tr_pengaduan_log();
                $log->pengaduan_id = $model->pengaduan_id;
                $log->id_status = 5;
                $log->id_posisi = $model->posisi_id;
                $log->waktu = date('Y-m-d H:i:s');
                $log->keterangan = '';
                $log->user_id = $model->posisi_user_id;
                $log->save();
                
                $message = 'Pengadu sudah menyelesaikan pengaduan. Kode tiket #' . $model->kode_tiket;
                $url = URL::to('/admin/tr_pengaduan/view/' . $model->pengaduan_id);
                
                \App\Notification::add($model->posisi_user_id, $message, $url);
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Terima kasih'
                ]);
                exit();
            }
        }
        
        $lampiran = $model->lampiran->all();
        $tangapan = \App\Tr_pengaduan_respon::where('pengaduan_id', $model->pengaduan_id)->get();
        
        return view('pages.landing.tiket', compact('model', 'lampiran', 'tangapan', 'old_jawaban'));
    }
}