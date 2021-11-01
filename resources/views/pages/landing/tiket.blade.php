@extends('layouts.landing_default')

@section('htmlheader_title')
    {{ trans('Pelayanan Pengaduan ATR/BPN') }}
@endsection

@section('main-content-mailsent') 

<div class="section-1" id="beranda">
    @if ($model == null)
    <div class="alert alert-danger">
        <p>Maaf kode tiket salah atau tidak ada</p>
    </div>
    @else
    <div class="row">
        <div class="col-md-12">
            <fieldset class="border rounded py-3 px-4">
                <div class="row">
                    <div class="col-md-12 col-lg-12">
                        <h3>Detail Pengaduan #{{ $model->pengaduan_id }}</h3><br/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-lg-4">
                        <h5>Nomor Pengaduan</h5>
                        <p class="fs-5">{{ $model->no_berkas }}</p>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <h5>Tanggal Pengaduan</h5>
                        <p class="fs-5">{{ $model->created_at }}</p>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <h5>Jenis Pengaduan</h5>
                        <p class="fs-5">{{ $model->jenis->nama_jenis }}</p>
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <h5>Kanal Pengaduan</h5>
                        <p class="fs-5">{{ $model->kanal->nama_kanal }}</p>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <h5>Status Pengaduan</h5>
                        <p class="fs-5">{{ $model->status->nama_status }}</p>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <h5>Posisi Pengaduan</h5>
                        <p class="fs-5">{{ $model->posisi->nama_posisi }}</p>
                    </div>
                </div>
            </fieldset>
            
            <fieldset style="margin-top: 20px;" class="border rounded py-3 px-4">
                <legend>Informasi Pengirim</legend>
                <div class="row">
                    <div class="col-md-6">
                        <div class="fs-5"><strong>Nama</strong></div>
                        <div class="fs-5 mb-3">{{ $model->nama }}</div>        
                    </div>
                    <div class="col-md-6">
                        <div class="fs-5"><strong>NIK</strong></div>
                        <div class="fs-5 mb-3">{{ $model->nik }}</div>
                    </div>

                    <div class="col-md-6">
                        <div class="fs-5"><strong>Pekerjaan</strong></div>
                        <div class="fs-5 mb-3">{{ $model->pekerjaan }}</div>
                    </div>
                    <div class="col-md-6">
                        <div class="fs-5"><strong>Email</strong></div>
                        <div class="fs-5 mb-3">{{ $model->email }}</div>   
                    </div>
                    <div class="col-md-6">
                        <div class="fs-5"><strong>No Telp</strong></div>
                        <div class="fs-5 mb-3">{{ $model->no_telp }}</div>
                    </div>
                    <div class="col-md-6">
                        <div class="fs-5"><strong>Obyek Aduan</strong></div>
                        <div class="fs-5 mb-3">{{ $model->obyek_aduan }}</div>  
                    </div>
                    <div class="col-md-6">
                        <div class="fs-5"><strong>Alamat</strong></div>
                        <div class="col-12 fs-5 mb-3">{{ $model->alamat }}</div>
                    </div>
                    <div class="col-md-6">
                        <div class="fs-5"><strong>Hubungan</strong></div>
                        <div class="fs-5 mb-3">{{ $model->hubungan }}</div>  
                    </div>
                </div>                                
            </fieldset>
            
            <div class="border px-4 py-3 rounded mt-3">
                <legend>Uraian Pengaduan</legend>
                <p class="fs-5">{{ $model->uraian_pengaduan }}</p>
            </div>                                        
            <fieldset class="border px-4 py-3 rounded mt-3">
                <legend>Lampiran</legend>
                @if (empty($lampiran))
                <div class="alert alert-warning">Tidak ada lampiran</div> 
                @else
                <ul>
                    @foreach($lampiran as $item)
                    <li><a target="_blank" href="{{ URL::to('/') . Storage::url($item->file_path) }}">{{ $item->nama_file }}</a></li>
                    @endforeach
                </ul>
                @endif
            </fieldset>
        </div>
    </div>
    @endif
</div>
@endsection