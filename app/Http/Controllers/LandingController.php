<?php

namespace App\Http\Controllers;

use App\faq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cookie;
use App\MailTemplate;
use App\Tr_pengaduan;

class LandingController extends Controller {
    
    private function getAuthModel(Request $request) {
        $cJson = $request->cookie('ticket');
        if (empty($cJson)) { return redirect('/tiket_login'); }
        
        $json = json_decode($cJson);
        $kode_tiket = $json->kode_tiket;
        
        if (empty($kode_tiket)) { return redirect('/tiket_login'); }
        
        $model = Tr_pengaduan::where('kode_tiket', $kode_tiket)->first();
        if ($model == null) { return redirect('/tiket_login'); }
        
        return $model;
    }
    
    public function index(Request $request) {
        $faq = faq::where('faq_kategori', 'Eksternal')->get();
        // dd($faq);
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
        return view('pages.landing.index', compact('model', 'faq'));
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
                
                $cJson = json_encode([
                    'kode_tiket' => $model->kode_tiket,
                ]);
                Cookie::queue('ticket', $cJson, 120);
                
                $params = [
                    '{url}' => URL::to('/tiket?kode=' . $kode_tiket),
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
            Cookie::queue('ticket', $cJson, 120);
            
            return redirect()->route('tiket');
        }
        
        return view('pages.landing.tiket_login', compact('model'));
    }
    
    public function tiket(Request $request) {
        $model = $this->getAuthModel($request);
        $lampiran = $model->lampiran->all();
        $tangapan = \App\Tr_pengaduan_respon::where('pengaduan_id', $model->pengaduan_id)->get();
        
        return view('pages.landing.tiket', compact('model', 'lampiran', 'tangapan'));
    }
}