<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ms_faqs;
use Auth;


class MsFaqsController extends Controller {
    
    public function allFaq() {
        return view('pages.admin.Faq.index');
    }
   
    public function list() {
        echo json_encode([
            'data' => ms_faqs::all()
        ]);
    }

    public function daftarfaq(){
        $faqs = ms_faqs::where('parent_id', 0)->with('children.children')->get();
        // dd($faqs[0]->children[0]);
        return view('pages.admin.ms_faq.index', compact('faqs')); 
    }
     
    public function index(Request $r) {
        $kategori = ms_faqs::where('faq_kategori', 'kategori')->get();
        $topik = ms_faqs::where('faq_kategori', 'topik')->get();
        // dd($topik);
        return view('pages.admin.Faq.index', compact('kategori', 'topik'));
    }

    public function save(Request $r) {
        
        $faq_id = $r->post('faq_id');
        $parent_id = $r->post('parent_id');
        $faq_question = $r->post('faq_question');
        $faq_answer = $r->post('faq_answer');
        $faq_topik = $r->post('faq_topik');
        $faq_kategori = $r->post('faq_kategori');
        $faq_posisi = $r->post('faq_posisi');
        
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
            $model = ms_faqs::find($faq_id);
            if ($model == null) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Data tidak ada'
                ]);
                return;
            }
        } else {
            $model = new ms_faqs();
        }
        $model->faq_kategori = $faq_kategori;
        $model->parent_id = intval($parent_id);
        $model->faq_question = $faq_question;
        $model->faq_answer = $faq_answer;
        $model->faq_topik = $faq_topik;
        $model->faq_posisi = $faq_posisi;
        
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
        
        $model = ms_faqs::find($faq_id);
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