@extends('layouts.admin')
@section('htmlheader_title')
    {{ trans('pusat') }}
@endsection
@section('main-content')

<!-- ============================================================== -->
<!-- Start right Content here main -->
           
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!--   main  ============================================================== -->  
           
            <div class="panel-heading" style="margin-bottom: 2%">
                <h1 class="panel-title col-md-5">Daftar Faq</h1>
            </div>
            <!-- Isi Content -->
            @foreach ($faqs as $faq)                 
            <div class="faq-accordion">
                <a class="kategori" data-toggle="collapse" href="#collapse{{$faq->faq_id}}" role="button" aria-expanded="false" aria-controls="collapse{{$faq->faq_id}}">
                    <i class="panah fas fa-chevron-right px-2"></i>
                    {{$faq->faq_topik}}
                </a>
                <div class="childKategori collapse" id="collapse{{$faq->faq_id}}">
                    @foreach ($faq->children as $topik)
                    
                    <a class="topik" data-toggle="collapse" href="#collapse{{$topik->faq_id}}" role="button" aria-expanded="false" aria-controls="collapse{{$topik->faq_id}}">
                        <i class="panah fas fa-chevron-right px-2"></i>
                        {{$topik->faq_topik}}
                    </a>
                    <div class="childKategori collapse" id="collapse{{$topik->faq_id}}">
                        @foreach ($topik->children as $question)
                        
                        <a class="question" data-toggle="collapse" href="#collapse{{$question->faq_id}}" role="button" aria-expanded="false" aria-controls="collapse{{$question->faq_id}}">
                        <i class="panah fas fa-chevron-right px-2"></i>
                        {{$question->faq_question}}
                        <div class="collapse mt-3 px-5" id="collapse{{$question->faq_id}}">
                            {{$question->faq_answer}}
                        </div>
                        </a>    
                        @endforeach
                    </div>
                    @endforeach
                </div>
            </div>
            @endforeach
            
        </div>
    </div>
</div>

@endsection

@push('script')

<script>
    const acc = document.querySelectorAll('a[data-toggle="collapse"]');
    console.log('haha');
    
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function(){
            this.querySelector('.panah').classList.toggle('rotatePanah');
        })
    }
</script>


@endpush