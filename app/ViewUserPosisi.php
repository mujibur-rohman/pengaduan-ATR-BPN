<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class ViewUserPosisi extends Model {
    
    protected $table = "view_user_posisi";  
    protected $primaryKey = 'id_user';
    protected $fillable = [
        'id_user', 'username', 'email', 'fullname',
        'parent_wilayah', 'nama_posisi', 'posisi_id', 'parent_id',
        'r1', 'r2', 'r3'
    ];
    
    public static function getVerifikator() {
        return ViewUserPosisi::where('r2', 1);
    }
    
    public static function getResponder($parent_id) {
        return ViewUserPosisi::where([
            ['parent_id', '=', $parent_id],
            ['r3', '=', 1]
        ]);
    }
    
    public static function getAdmin() {
        return ViewUserPosisi::where('r1', 1);
    }
}