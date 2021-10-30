@extends('layouts.admin')
@section('htmlheader_title')
    {{ trans('form') }}
@endsection
@section('main-content')

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="panel-heading" style="margin-bottom:2%">
                <div class="panel-title col-md-12">
                    <h4 class="col-md-4">Detail Pengaduan #{{ $id }}</h4>
                </div>
            </div>

            <!-- Content -->
            <div class="panel-body">
                @if ($model == null)
                <div class="alert alert-danger">Data tidak ditemukan</div>
                @else
                <div class="row" style="margin-bottom: 20px;">
                    <div class="col-md-12">
                        <button id="btnVerifikator" class="btn btn-primary" type="button">Verifikator</button>
                        <button id="btnResponder" class="btn btn-primary" type="button">Responder</button>
                    </div>
                </div>
                <fieldset>
                    <legend>Informasi Sumber Pengaduan</legend>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-3"><strong>Tanggal Pengaduan</strong></div>
                                <div class="col-md-9">{{ $model->created_at }}</div>
                            </div>

                            <div class="row">
                                <div class="col-md-3"><strong>Nomor Pengaduan</strong></div>
                                <div class="col-md-9">{{ $model->no_berkas }}</div>
                            </div>

                            <div class="row">
                                <div class="col-md-3"><strong>Jenis</strong></div>
                                <div class="col-md-9">{{ $model->jenis->nama_jenis }}</div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-3"><strong>Kanal</strong></div>
                                <div class="col-md-9">{{ $model->kanal->nama_kanal }}</div>
                            </div>

                            <div class="row">
                                <div class="col-md-3"><strong>Status Pengaduan</strong></div>
                                <div class="col-md-9">{{ $model->status->nama_status }}</div>
                            </div>

                            <div class="row">
                                <div class="col-md-3"><strong>Posisi Pengaduan</strong></div>
                                <div class="col-md-9">{{ $model->posisi->nama_posisi }}</div>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset style="margin-top: 20px;">
                    <legend>Informasi Pengirim</legend>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-3"><strong>Nama</strong></div>
                                <div class="col-md-9">{{ $model->nama }}</div>
                            </div>

                            <div class="row">
                                <div class="col-md-3"><strong>Nomor Handphone</strong></div>
                                <div class="col-md-9">{{ $model->no_telp }}</div>
                            </div>

                            <div class="row">
                                <div class="col-md-3"><strong>Email</strong></div>
                                <div class="col-md-9">{{ $model->email }}</div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-3"><strong>Hubungan</strong></div>
                                <div class="col-md-9">{{ $model->hubungan }}</div>
                            </div>

                            <div class="row">
                                <div class="col-md-3"><strong>Pekerjaan</strong></div>
                                <div class="col-md-9">{{ $model->pekerjaan }}</div>
                            </div>

                            <div class="row">
                                <div class="col-md-3"><strong>Alamat</strong></div>
                                <div class="col-md-9">{{ $model->alamat }}</div>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div class="row" style="margin-top: 20px;">
                    <div class="col-md-12">
                        <strong>Object Aduan</strong><br/>
                        {{ $model->obyek_aduan }}
                    </div>
                </div>
                
                <div class="row" style="margin-top: 20px;">
                    <div class="col-md-12">
                        <strong>Uraian Pengaduan</strong><br/>
                        {{ $model->uraian_pengaduan }}
                    </div>
                </div>

                <fieldset style="margin-top: 20px;">
                    <legend>Lampiran</legend>
                    @if (empty($lampiran))
                    <div class="alert alert-warning">Tidak ada lampiran</div> 
                    @else
                    <ul>
                        @foreach($lampiran as $item)
                        <li><a target="_blank" href="{{ URL::to('/' . $item->file_path) }}">{{ $item->nama_file }}</a></li>
                        @endforeach
                    </ul>
                    @endif
                </fieldset>
                
                <div class="row" style="margin-top: 20px;">
                    <div class="col-md-12">
                        <button id="btnVerifikator" class="btn btn-primary" type="button">Verifikator</button>
                        <button id="btnResponder" class="btn btn-primary" type="button">Responder</button>
                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
@push('script')

@endpush