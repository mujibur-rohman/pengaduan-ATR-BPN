@extends('layouts.landing')

@section('htmlheader_title')
    {{ trans('Pelayanan Pengaduan ATR/BPN') }}
@endsection

@section('main-content') 

<div class="">
        <div class="section-1" id="beranda">
            <img class="banner-home" src="{{ asset('assets_fron/images/banner-1.png') }}" alt="banner-1">
            <div class="text-home">
                <h1 class="title-home">Selamat datang di <br> <span>Portal Pengaduan ATR BPN</span></h1>
                <p class="subtitle-home">
                    Pengaduan ATR/BPN - Tempat menyalurkan Aspirasi dan Pelayanan  Aduan Kementerian Agraria dan Tata Ruang/Badan Pertanahan Nasional adalah sebuah portal untuk mengakomodir segala Pengaduan pelayanan , dan media penyalur aspirasi untuk semua pelayanan di Kementerian Agraria dan Tata Ruang/Badan Pertanahan Nasional. Gunakan menampung Pengaduan layanan masyarakat Indonesia.
                </p>
                <a href="#form" class="btn btn-color btn-laporan">Buat Laporan/Pengaduan</a>
            </div>
        </div>
        <div class="section-3" id="tentang">
            <div class="text-about">
                <h1 class="title-home" style="color: #BE9054">Tentang Portal Pengaduan Kementerian ATR / BPN</h1>
                <p class="subtitle-home">PORTAL PENGADUAN KEMENTERIAN ATR/BPN - Tempat Aspirasi dan Layanan Aduan Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional yang merupakan sebuah portal untuk mengakomodir segala pertanyaan, keluahan dan media penyalur aspirasi masyarakat.</p>
                <img src="{{ asset('assets_fron/images/avatar.png') }}" alt="avatar" class="avatar-about">
            </div>
            <img src="{{ asset('assets_fron/images/about.png') }}" alt="about" class="image-about">
        </div>
        <div class="section-4" id="plot">
            <h1 class="title-section">Alur Kerja</h1>
            <div class="plot">
                <div class="plot-items">
                    <i class="plot-icons fas fa-edit"></i>
                    <div class="plot-text">
                        <h3 class="plot-title">Tulis Laporan</h3>
                        <p class="plot-subtitle">Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap</p>
                    </div>
                </div>
                <div class="plot-items">
                    <i class="plot-icons fas fa-share"></i>
                    <div class="plot-text">
                        <h3 class="plot-title">Proses Verifikasi</h3>
                        <p class="plot-subtitle">Dalam 3 hari, laporan anda akan diverifikasi dan diteruskan kepada instansi berwenang</p>
                    </div>
                </div>
                <div class="plot-items">
                    <i class="plot-icons fas fa-comments"></i>
                    <div class="plot-text">
                        <h3 class="plot-title">Proses Tindak Lanjut</h3>
                        <p class="plot-subtitle">Dalam 5 hari, instansi akan menindaklanjuti dan membalas laporan anda</p>
                    </div>
                </div>
                <div class="plot-items">
                    <i class="plot-icons fas fa-comment-dots"></i>
                    <div class="plot-text">
                        <h3 class="plot-title">Beri Tanggapan</h3>
                        <p class="plot-subtitle">Anda dapat menanggapi kembali balasan yang diberikan oleh instansi dalam waktu 10 hari</p>
                    </div>
                </div>
                <div class="plot-items">
                    <i class="plot-icons fas fa-check"></i>
                    <div class="plot-text">
                        <h3 class="plot-title">Laporan Selesai</h3>
                        <p class="plot-subtitle">Laporan anda akan terus ditindaklanjuti hingga terselesaikan</p>                   
                    </div>
                </div>
            </div>
        </div>
        <div class="section-5" id="fitur">
            <h1 class="title-section">Fitur</h1>
            <div class="fitur">
                <div class="fitur-items">
                    <img src="{{asset('assets_fron/images/features-1.png')}}">
                    <div class="fitur-text">
                        <h3 class="fitur-title">Multi Platform</h3>
                        <p class="fitur-subtitle">Pengaduan melalui Twitter, Facebook dan Instagram anda</p>
                    </div>
                </div>
                <div class="fitur-items">
                    <img src="{{asset('assets_fron/images/features-2.png')}}">
                    <div class="fitur-text">
                        <h3 class="fitur-title">Quick Response</h3>
                        <p class="fitur-subtitle">Kami akan menjawab pertanyaan danda dengan cepat</p>
                    </div>
                </div>
                <div class="fitur-items">
                    <img src="{{asset('assets_fron/images/features-3.png')}}">
                    <div class="fitur-text">
                        <h3 class="fitur-title">Connected</h3>
                        <p class="fitur-subtitle">Kami akan membantu anda untuk terhubung langsung dengan kanwil ATR/BPN di kota anda</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="section-6" id="faq">
            <h1 class="title-section">faq</h1>
            <div class="faq-component">
                <img src="{{asset('assets_fron/images/faq-image.png')}}" alt="faq" class="faq-image">
                <div class="faq-accordion">
                    @foreach ($faq as $f)                      
                    <div class="faq-accordion-items ">
                        <i class="faq-icon fas fa-plus"></i>
                        <h3>{{$f->faq_question}}</h3>
                    </div>               
                    <div class="faq-panel">
                        <p>{{$f->faq_answer}}</p>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
    <!-- End Faq  -->

    <!-- Start Po Area
    ============================================= -->
  

@endsection
