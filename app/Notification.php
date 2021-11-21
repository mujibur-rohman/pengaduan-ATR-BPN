<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model {
    public $timestamps = false;
    protected $table = "notifications";  
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id','message',
        'created_at', 'is_read',
        'url'
    ];
    
    public static function add($to_user, $message, $url = null, $table_name = "", $reff_id = 0) {
        $model = new Notification();
        $model->user_id = $to_user;
        $model->message = $message;
        $model->created_at = date('Y-m-d H:i:s');
        $model->is_read = 'N';
        $model->url = $url;
        $model->table_name = $table_name;
        $model->reff_id = $reff_id;
        $model->save();
    }
    
    public static function addToAdmin($message, $url = null, $table_name = "", $reff_id = 0) {
        $admin = Users::where('id_role', 1)->get();
        if ($admin != null) {
            foreach($admin as $row) {
                self::add($row->id_user, $message, $url, $table_name, $reff_id);
            }
        }
    }
    
    public static function getNotif($user_id) {
        $model = Notification::where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        
        return $model == null ? [] : $model;
    }
    
    public static function getTotalUnread($user_id) {
        return Notification::where('user_id', $user_id)
            ->where('is_read', 'N')->count();
    }
    
    public static function release($user_id, $table_name, $reff_id) {
        $model = Notification::where('user_id', $user_id)
            ->where('table_name', $table_name)
            ->where('reff_id', $reff_id)
            ->first();
        
        if ($model != null) {
            $model->is_read = 'Y';
            $model->save();
        }
    }
}