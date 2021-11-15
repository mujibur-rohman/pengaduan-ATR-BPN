<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ms_faqs extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'faq_id';
    protected $fillable = ['faq_topik', 'faq_question', 'faq_answer', 'faq_kategori', 'faq_posisi', 'parent_id'];
}