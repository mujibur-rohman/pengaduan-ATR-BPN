<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Request;
use Auth;

class User extends Authenticatable {
    
    public static $permissionCookieName = "tHyarF8Uj";
    
    protected $primaryKey = 'id_user';
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function hasRole($role_name){
        if (Auth::user()->role->name == $role_name) {
            return true;
        } else {
            return false;
        }
    }

    public function role(){
        return $this->belongsTo(Role::class,'id_role','id_role');
    }
    
    public static function getActivePermission() {
        $name = Cookie::get(User::$permissionCookieName);
        return empty($name) ? Auth::user()->role->name : $name;
    }
    
    public function setActivePermission($permission) {
        if (!$this->hasPermission($permission)) {
            $permission = Auth::user()->role->name;
        }
        
        Cookie::queue(User::$permissionCookieName, $permission, 120);
    }
    
    public function hasPermission($permission) {
        $flag = str_split(Auth::user()->flag_role);
        $r = [
            'admin' => 0,
            'verifikator' => 1,
            'responder' => 2
        ];
        if (isset($r[$permission])) {
            $index = $r[$permission];
            return $flag[$index] == "1";
        } else {
            return false;
        }
    }
    
    public static function getRoleDropdown() {
        $active = User::getActivePermission();
        $role = [];
        $flag = str_split(Auth::user()->flag_role);
        if ($flag[0] == "1") { $role['admin'] = 'Admin'; }
        if ($flag[1] == "1") { $role['verifikator'] = 'Verifikator'; }
        if ($flag[2] == "1") { $role['responder'] = 'Responder'; }
        
        $html = '';
        foreach($role as $name => $label) {
            $selected = $active == $name ? " selected" : "";
            $html.= '<option value="' . $name . '"' . $selected . '>' . $label . '</option>';
        }
        return $html;
    }
    
    public static function getStatus() {
        $status = [];
        $role_name = Auth::user()->role->name;
        switch($role_name) {
            case 'admin':
                $status = [
                    0 => 'Semua Data',
                    1 => 'Laporan Diterima',
                    2 => 'Proses Verifikasi',
                    3 => 'Proses Responder',
                    4 => 'Tindak Lanjut',
                    5 => 'Selesai'
                ];
                break;
            case 'responder':
                $status = [
                    3 => 'Proses Responder',
                    4 => 'Tindak Lanjut',
                    5 => 'Selesai'
                ];
                break;
            case 'verifikator':
                $status = [
                    2 => 'Proses Verifikasi',
                ];
                break;
        }
        
        return $status;
    }
}
