<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Routing\Controller;
use App\MailTemplate;
use App\Tr_pengaduan;


class LandingController extends Controller {
    
    public function index(Request $request) {
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

        return view('pages.landing.index', compact('model'));
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
    
    public function verifikasi(Request $request) {
        $token = $request->get('token');
        
        $kode_tiket = '';
        $model = Tr_pengaduan::where('verified_code', $token)->first();
        if ($model != null) {
            $kode_tiket = substr(base64_encode(md5(date('YmdHis') . $model->email . rand(10, 99) . rand(10, 99))), 0, 8);
            
            $model->kode_tiket = $kode_tiket;
            $model->verified_code = '';
            $model->verified_email_date = date('Y-m-d H:i:s');
            $model->verified_email = 'Y';
            $model->save();

            $params = [
                '{url}' => URL::to('/tiket?kode=' . $kode_tiket),
                '{kode_tiket}' => $kode_tiket
            ];
            MailTemplate::sendWith('pengaduan_kode_tiket', $model->email, $params);
        } else {
            $token = null;
        }
        
        return view('pages.landing.verifikasi', compact('token', 'kode_tiket'));
    }

    public function tiket(Request $request) {
        $kode_tiket = $request->get('kode');

        $lampiran = null;
        $model = null;
        
        if (!empty($kode_tiket)) {
            $model = Tr_pengaduan::where('kode_tiket', $kode_tiket)->first();
            
            if ($model != null) {
                $lampiran = $model->lampiran->all();
            }
        }
        
        return view('pages.landing.tiket', compact('model', 'lampiran', 'kode_tiket'));
    }
}