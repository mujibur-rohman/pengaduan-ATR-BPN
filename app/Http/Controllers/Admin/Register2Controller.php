<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Users;
use App\Roles;
use DB;

class Register2Controller extends Controller {
    
    public function list() {
        $model = DB::table('users as t')
            ->select('t.id_user', 't.fullname', 't.email', 't.id_role', 't.posisi_id', 'r.description as role_desc', 
                'p.nama_posisi', 't.flag_role', 'r.name as role_name')
            ->leftJoin('roles as r', 't.id_role', 'r.id_role')
            ->leftJoin('ms_pengaduan_posisi as p', 't.posisi_id', 'p.posisi_id')
            ->get();
        
        echo json_encode([
            'data' => $model
        ]);
    }
    
    public function index(){
        $roles = Roles::all();
        return view('pages.admin.register.index', compact('roles'));
    }

    public function errorjson($message) {
        return json_encode([
            'success' => false,
            'message' => $message
        ]);
    }
    public function save(Request $request) {
        $users = $request->post('users');
        $id_user = $request->post('id_user');
        
        // validate
        if (empty($users['fullname'])) { return $this->errorjson('Nama tidak boleh kosong'); }
        if (empty($users['email'])) { return $this->errorjson('Email tidak boleh kosong'); }
        if (!filter_var($users['email'], FILTER_VALIDATE_EMAIL)) { return $this->errorjson('Format email salah'); }
        
        $model = null;
        if (!empty($id_user)) {
            $model = \App\User::find($id_user);
            if ($model == null) { return $this->errorjson('Data user tidak ada'); }
            
            // check apakah email yg digunakan sudah ada?
            $mail = \App\User::where('email', $users['email'])
                    ->where('id_user', '<>', $id_user)
                    ->first();
            
            if ($mail != null) { return $this->errorjson("Email '{$users['email']}' sudah digunakan"); }
            
            if (!empty($users['password'])) {
                if (strlen($users['password']) < 7) { return $this->errorjson('Panjang password minimal 7 karakter'); }
                if ($users['password'] != $users['ulangi_password']) { return $this->errorjson('Password dan ulangi password tidak sama'); }
                
                $model->password = Hash::make($users['password']);
            }
        } else {
            $model = new \App\User();
            
            // check apakah email yg digunakan sudah ada?
            $mail = \App\User::where('email', $users['email'])
                    ->first();
            
            if ($mail != null) { return $this->errorjson("Email '{$users['email']}' sudah digunakan"); }
            
            if (empty($users['password'])) { return $this->errorjson('Password tidak boleh kosong'); }
            if (strlen($users['password']) < 7) { return $this->errorjson('Panjang password minimal 7 karakter'); }
            if ($users['password'] != $users['ulangi_password']) { return $this->errorjson('Password dan ulangi password tidak sama'); }
            
            $model->password = Hash::make($users['password']);
        }
        
        $role = [0,0,0];
        switch($users['id_role']) {
            case 1: $role[0] = 1; break;
            case 2: $role[1] = 1; break;
            case 3: $role[2] = 1; break;
        }
        
        if (isset($users['akses'])) {
            if (isset($users['akses'][0]) && $users['akses'][0] == 'Y') { $role[0] = 1; }
            if (isset($users['akses'][1]) && $users['akses'][1] == 'Y') { $role[1] = 1; }
            if (isset($users['akses'][2]) && $users['akses'][2] == 'Y') { $role[2] = 1; }
        }
        
        $model->username = substr(md5(date('YmdHis') . $users['email']), 20);
        $model->email = $users['email'];
        $model->fullname = $users['fullname'];
        $model->id_role = $users['id_role'];
        $model->posisi_id = $users['posisi_id'];
        $model->flag_role = implode("", $role);
        $model->save();
        
        echo json_encode([
            'success' => true,
            'message' => 'Berhasil menyimpan data',
        ]);
    }
}
