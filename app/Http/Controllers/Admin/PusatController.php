<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use DB;

class PusatController extends Controller {  
    
    public function index(){
    	return view('pages.admin.pusat.index');
    }
}
