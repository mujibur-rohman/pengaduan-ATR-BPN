<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Faq;
use Auth;


class FaqController extends Controller {
    
    public function allFaq() {
        return view('pages.admin.Faq.index');
    }
   
    public function list() {
        echo json_encode([
            'data' => Faq::all()
        ]);
    }
     
    public function index(Request $r) {
        return view('pages.admin.Faq.index');
    }

    public function save(Request $r) {
        
        $faq_id = $r->post('faq_id');
        $faq_question = $r->post('faq_question');
        $faq_answer = $r->post('faq_answer');
        $faq_kategori = $r->post('faq_kategori');
        
        if (empty($faq_question)) { 
            echo json_encode([
                'success' => false,
                'message' => 'Peertanyaan tidak boleh kosong'
            ]);
            return;
        }
        if (empty($faq_answer)) { 
            echo json_encode([
                'success' => false,
                'message' => 'Jawaban tidak boleh kosong'
            ]);
            return;
        }
        
        $model = null;
        if (!empty($faq_id)) {
            $model = Faq::find($faq_id);
            if ($model == null) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Data tidak ada'
                ]);
                return;
            }
        } else {
            $model = new Faq();
        }
        $model->faq_question = $faq_question;
        $model->faq_answer = $faq_answer;
        $model->faq_kategori = $faq_kategori;
        
        $model->save();
        
        echo json_encode([
            'success' => true,
            'message' => 'Data berhasil disimpan'
        ]);
    }
    
    public function delete(Request $r) {
        $faq_id = $r->post('faq_id', '');
        
        if (empty($faq_id)) {
            echo json_encode([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
            return;
        }
        
        $model = Faq::find($faq_id);
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