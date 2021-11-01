@extends('layouts.landing_default')

@section('htmlheader_title')
    {{ trans('Pelayanan Pengaduan ATR/BPN') }}
@endsection

@section('main-content-mailsent') 

<div class="row mail_sent">
    @if (empty($token))
    <img src="{{asset('assets_fron/images/empty.png')}}" alt="empty">
    <div class="alert" style="width: 100%; ">        
        <p>Maaf token sudah expired atau tidak ada!</p>
        <a href="{{url('/')}}" class="btn">Kembali ke Home</a>
    </div>
    @else
    <img src="{{asset('assets_fron/images/verified.png')}}" alt="verified">
    <div class="alert">
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
        <a href="{{url('/')}}" class="btn">Lihat Pengaduan</a>
    </div>
    @endif
</div>
@endsection