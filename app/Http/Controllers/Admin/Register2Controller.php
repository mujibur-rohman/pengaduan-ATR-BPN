<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Users;
use App\Roles;
use DB;

class Register2Controller extends Controller {
    private $users;
    private $roles;

    public function list() {
        $model = DB::table('users as t')
            ->select('t.id_user', 't.fullname', 't.email', 't.posisi_id', 'r.description as role_name', 'p.nama_posisi', 't.flag_role')
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

    public function get()
    {  

        $data = DB::table('users')
            ->join('roles', 'roles.id_role', '=', 'users.id_role')
            ->select('users.*', 'roles.name')
            ->orderby('id_user', 'ASC')->get();
        echo json_encode($data);
    }

    public function create()
    {
        $Roles = Roles::all();
        return view('pages.admin.register.index', compact('Roles'));
    }

    public function getmax()
    {   $data = DB::table('users')
        ->selectRaw('max(id_user) + 1 as jml')
        ->get();
        echo json_encode($data);
    }

    public function save(Request $r)
    {
        $Users = new Users;
        $Users->id_user = $r->input('txtid_user');
        $Users->username = $r->input('txtname');
        $Users->email = $r->input('txtemail');
        $Users->password = $r->input('txtpassword');
        $Users->id_role = $r->input('txtrole');
        
        $Users->save();
        $msg['success'] = FALSE;
        
        if ($Register) {
            $msg['success'] = TRUE;
        }
          echo json_encode($msg);
     
        
    }


    // Panggil data untuk edit data Register 
    
    public function getRegister($id){
        $data = DB::table('users')
            ->join('roles', 'roles.id_role', '=', 'users.id_role')
            ->select('users.*', 'roles.name')
            ->where('id_user', $id) 
            ->orderby('id_user', 'ASC')->get();

        echo json_encode($data);
    }

    // .--Panggil data untuk edit data Register 


    public function update(Request $r, $id)
    {
        $Users = Users::find($id);
        $Users->id_user   = $r->input('txtid_user');
        $Users->username = $r->input('txtname');  
        $Users->email = $r->input('txtemail');  
        $Users->password = $r->input('txtpassword');  
        $Users->id_role = $r->input('txtrole');    
        $Users->save();
        echo "sukses";
    }

    public function delete($id)
    {
        $Users = DB::table('user')->where('id_user', $id)->delete();
        $msg['success'] = FALSE;
        if ($Users) {
            $msg['success'] = TRUE;
        }
        echo json_encode($msg);
    }
}
