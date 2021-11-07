<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class faq extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'faq_id';
    protected $fillable = ['faq_question', 'faq_answer', 'faq_kategori'];
} 