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
    
    public static function add($to_user, $message, $url = null) {
        $model = new Notification();
        $model->user_id = $to_user;
        $model->message = $message;
        $model->created_at = date('Y-m-d H:i:s');
        $model->is_read = 'N';
        $model->url = $url;
        $model->save();
    }
    
    public static function addToAdmin($message, $url = null) {
        $admin = Users::where('id_role', 1)->get();
        if ($admin != null) {
            foreach($admin as $row) {
                self::add($row->id_user, $message, $url);
            }
        }
    }
}