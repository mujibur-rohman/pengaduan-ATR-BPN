<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

class AdminController extends Controller {
    
    public function index(){
    	return view('pages.admin.index');
    }
    
    public function load_notif() {
        $items = \App\Notification::getNotif(Auth::user()->id_user);
        $total = \App\Notification::getTotalUnread(Auth::user()->id_user);;
        
        echo json_encode([
            'success' => true,
            'data' => [
                'items' => $items,
                'total' => $total
            ]
        ]);
    }
    
    public function jadwal(){
    	return view('pages.admin.jadwal');
    }
}
