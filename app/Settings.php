<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Settings extends Model {
    public $timestamps = false;
    protected $table = "settings";  
    protected $primaryKey = 'kind';
    protected $fillable = [
        'kind', 'type', 'content', 'description'
    ];
    protected $keyType = 'string';
    public $incrementing = false;
    
    /**
     * Get setting value
     * 
     * @param string $kind
     * @param any $defValue
     * @return string
     */
    public static function getValue($kind, $defValue = "") {
        $model = Settings::find($kind);
        if ($model == null) {
            return $defValue;
        } else {
            return $model->content;
        }
    }
    
    public static function setValue($kind, $value) {
        $model = Settings::find($kind);
        if ($model != null) {
            $model->content = $value;
            $model->save();
        }
    }
    
    public static function getPengaduanColorCss($prefix) {
        $css = "";
        $status = self::getPengaduanColorStatus();
        $data = self::getPengaduanColor();
        
        foreach($status as $row) {
            $key_bg = "pengaduan.color_status_{$row}_bg";
            $key_text = "pengaduan.color_status_{$row}_text";
            
            $bg = isset($data[$key_bg]) ? $data[$key_bg] : "#fff";
            $text = isset($data[$key_text]) ? $data[$key_text] : "#000";
            
            $css.= "td.{$prefix}_{$row} {";
            $css.= "background-color: {$bg}; color: {$text};";
            $css.= "}\n";
        }
        
        return $css;
    }
    
    public static function getPengaduanColorStatus() {
        return [ 'diterima', 'respon', 'responder', 'selesai', 'verifikasi' ];
    }
    
    public static function getPengaduanColor() {
        $status = self::getPengaduanColorStatus();
        $kinds = [];
        foreach($status as $row) {
            $kinds[] = "pengaduan.color_status_{$row}_bg";
            $kinds[] = "pengaduan.color_status_{$row}_text";
        }
        
        $model = Settings::whereIn('kind', $kinds)->get();
        if ($model != null) {
            $result = [];
            foreach($model as $row) {
                $result[$row['kind']] = $row['content'];
            }
        }
        
        return $result;
    }
}