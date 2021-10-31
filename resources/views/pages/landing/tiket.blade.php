@extends('layouts.landing_default')

@section('htmlheader_title')
    {{ trans('Pelayanan Pengaduan ATR/BPN') }}
@endsection

@section('main-content') 

<div class="section-1" id="beranda">
    @if (empty($token))
    <div class="alert alert-danger">
        <p>Maaf token sudah expired atau tidak ada</p>
    </div>
    @else
    <div class="alert alert-info">
        <p>Terima kasih telah melakukan verifikasi email</p>
        <p>
            Laporan pengaduan anda telah kami terima dan akan segera kami proses. 
            Anda bisa melihat proses pengaduan dan memberikan tanggapan melalui halaman Ticket dan memasukan kode tiket anda.
        </p>
        <p>
            Kode tiket anda adalah <strong>{{ $kode_tiket }}</strong><br/>
            <strong>Mohon untuk tidak memberikan kode tiket anda kepada siapapun. Kode tiket bersifat rahasia.</strong>
        </p>
        <p>
            Kami juga telah mengirimkan sebuah email berisi informasi cara melihat proses pengaduan dan memberikan tanggapan.
        </p>
    </div>
    @endif
</div>
@endsection