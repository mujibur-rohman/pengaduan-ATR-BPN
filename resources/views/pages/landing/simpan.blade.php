@extends('layouts.landing_default')

@section('htmlheader_title')
    {{ trans('Pelayanan Pengaduan ATR/BPN') }}
@endsection

@section('main-content-mailsent') 
    <div class="row mail_sent">
        <img src="{{asset('assets_fron/images/mail_sent.png')}}" alt="mail_sent">
        <div class="alert">
            <p>
                Laporan pengaduan anda telah kami terima. Kami telah mengirimkan sebuah email ke alamat email yang anda berikan.
                Silahkan verifikasi email anda untuk melanjutkan proses pengaduan.
            </p>
            <a href="{{url('/')}}" class="btn">Kembali ke Home</a>
        </div>
    </div>

@endsection