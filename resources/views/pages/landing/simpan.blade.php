@extends('layouts.landing_default')

@section('htmlheader_title')
    {{ trans('Pelayanan Pengaduan ATR/BPN') }}
@endsection

@section('main-content') 

<div class="section-1" id="beranda">
    <div class="alert alert-info">
        <p>
            Laporan pengaduan anda telah kami terima. Kami telah mengirimkan sebuah email ke alamat email yang anda berikan.
            Silahkan verifikasi email anda untuk melanjutkan proses pengaduan.
        </p>
    </div>
</div>
@endsection