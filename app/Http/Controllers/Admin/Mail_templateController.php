<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\MailTemplate;
use Auth;

class Mail_templateController extends Controller {
    
    public function allMailTemplate() {
        return view('pages.admin.mail_template.index');
    }
   
    public function list() {
        echo json_encode([
            'data' => MailTemplate::all()
        ]);
    }
    
    public function index(Request $r) {
        return view('pages.admin.mail_template.index');
    }

    public function save(Request $r) {
        
        $id = $r->post('id');
        $name = $r->post('name');
        $subject = $r->post('subject');
        $body = $r->post('body');
        
        if (empty($name)) { 
            echo json_encode([
                'success' => false,
                'message' => 'Name tidak boleh kosong'
            ]);
            return;
        }
        if (empty($subject)) { 
            echo json_encode([
                'success' => false,
                'message' => 'Subject tidak boleh kosong'
            ]);
            return;
        }
        if (empty($body)) { 
            echo json_encode([
                'success' => false,
                'message' => 'Body tidak boleh kosong'
            ]);
            return;
        }
        
        $model = null;
        if (!empty($id)) {
            $model = MailTemplate::find($id);
            if ($model == null) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Data tidak ada'
                ]);
                return;
            }
        } else {
            $model = new MailTemplate();
        }
        $model->name = $name;
        $model->subject = $subject;
        $model->body = $body;
        
        $model->save();
        
        echo json_encode([
            'success' => true,
            'message' => 'Data berhasil disimpan'
        ]);
    }
    
    public function delete(Request $r) {
        $id = $r->post('id', '');
        
        if (empty($id)) {
            echo json_encode([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
            return;
        }
        
        $model = MailTemplate::find($id);
        if ($model == null) {
            echo json_encode([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
            return;
        }
        
        $model->delete();
        echo json_encode([
            'success' => true,
            'message' => 'Data berhasil di hapus'
        ]);
        return;
    }
}