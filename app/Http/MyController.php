<?php
namespace App\Http;

use App\Http\Controllers\Controller;

class MyController extends Controller {
    
    public function getFirstError($validator) {
        $errors = $validator->errors();
        foreach($validator->errors() as $field) {
            return $field;
        }
        
        return 'kosong';
    }
}