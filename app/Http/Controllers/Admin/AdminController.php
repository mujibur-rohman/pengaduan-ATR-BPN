<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller {
    
    public function change_permission(Request $request) {
        
    }
    public function index(){
    	return view('pages.admin.index');
    }
    public function jadwal(){
    	return view('pages.admin.jadwal');
    }
}
