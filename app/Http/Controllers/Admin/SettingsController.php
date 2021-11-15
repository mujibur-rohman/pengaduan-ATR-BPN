<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\MyController;
use Auth;

class SettingsController extends MyController {
    
    public function change_permission(Request $request) {
        Auth::user()->setActivePermission($request->post('permission'));
        
        echo json_encode([
            'success' => true,
            'message' => 'Berhasil menyimpan data'
        ]);
    }
    
    public function index(Request $request) {
        if ($request->method() == "POST") {
            $setting = $request->post('settings');
            if (!empty($setting)) {
                foreach($setting as $field => $value) {
                    \App\Settings::setValue($field, $value);
                }
            }
        }
        
        $model = \App\Settings::all();
        return view('pages.admin.settings.index', compact(
            'model'
        ));
    }
}