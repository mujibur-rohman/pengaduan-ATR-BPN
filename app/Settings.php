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
}