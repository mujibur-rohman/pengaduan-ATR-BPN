<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;

class MailTemplate extends Model {
        public $timestamps = false;
    protected $table = 'mail_template';
    protected $primaryKey = 'id';
    protected $fillable = [ 'id','name', 'subject', 'body' ];
    
    public static function getTemplate($name) {
        return MailTemplate::where('name', $name)->first();
    }
    
    public static function sendWith($name, $to, $params) {
        $tpl = MailTemplate::getTemplate($name);
        $html = str_replace(array_keys($params), $params, $tpl->body);
        
        Mail::send([], [], function(Message $message) use ($html, $to, $tpl) {
            $message->to($to)
                ->subject($tpl->subject)
                ->from(config('mail.from.address'))
                ->setBody($html, 'text/html');
        });
    }
}