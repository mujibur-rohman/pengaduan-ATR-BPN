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
                    <h3 class="col-md-4">Detail Pengaduan #{{ $model->kode_tiket }}</h3>
                </div>
            </div>

            <!-- Content -->
            <div class="panel-body">
                @if ($isLocked)
                <div class="alert alert-danger">Data pengaduan ini sedang di proses{{ isset($model->lockedBy) ? ' oleh ' . $model->lockedBy->fullname : '' }}. Anda hanya bisa melihat tanpa bisa memberikan tanggapan.</div>
                @endif
                @if ($model == null)
                <div class="alert alert-danger">Data tidak ditemukan</div>
                @else
                @if ($message = Session::get('message'))
                <div class="alert alert-success alert-block">
                    <strong>{{ $message }}</strong>
                </div>
                @endif
                <fieldset class="border rounded py-3 px-4">
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
                        <div class="col-md-6 col-lg-4">
                            <h5>Kategori Pengaduan</h5>
                            <p class="fs-5">{{ isset($model->kategori) ? $model->kategori->nama_kategori : '-' }}</p>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <h5>Klasifikasi Pengaduan</h5>
                            <p class="fs-5">{{ isset($model->klasifikasi) ? $model->klasifikasi->nama_klasifikasi : '-' }}</p>
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
                        <div class="col-md-6">
                            <div class="fs-5"><strong>Jenis Kelamin</strong></div>
                            <div class="fs-5 mb-3">{{ $model->sex == "M" ? "Pria" : "Wanita" }}</div>  
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
                        <li><a target="_blank" href="{{ URL::to('/') . Storage::url($item->file_path) }}" data-lightbox="image-1">{{ $item->nama_file }}</a></li>
                        @endforeach
                    </ul>
                    @endif
                </fieldset>
                
                @if ($tangapan != null)
                <div class="border px-4 py-3 rounded mt-3">
                    <legend>Response atau Tanggapan</legend>
                    @if (empty($tangapan))
                        <div class="alert alert-info">Sedang menunggu tindak lanjut</div>
                    @else
                        <ul class="list-respon">
                        @foreach($tangapan as $row)
                            <li>
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            @if ($row->is_from_pengadu == "N")
                                                {{ $row->responOleh->posisi->nama_posisi }}
                                            @else
                                                Pengadu
                                            @endif
                                        </h5>
                                        <h6 class="card-subtitle mb-2 text-muted">
                                            @if ($row->is_from_pengadu == "N")
                                                {{ $row->responOleh->fullname }} 
                                            @else
                                                {{ $model->nama }}
                                            @endif
                                            pada {{ $row->create_date }}
                                        </h6>
                                        <p class="card-text">{{ $row->jawaban }}</p>
                                    </div>
                                </div>
                            </li>
                        @endforeach
                        </ul>
                        @if ($model->status_id == 4)
                        <div class="tangapan-pengadu-form">
                            @if ($message = Session::get('error'))
                                <div class="alert alert-danger alert-block">
                                    <strong>{{ $message }}</strong>
                                </div>
                            @endif
                            <form method="post" id="form-password" action="{{ URL::to('/admin/tr_pengaduan/save_tangapan') }}">
                                {{ csrf_field() }}
                                <input type="hidden" name="pengaduan_id" value="{{ $model->pengaduan_id }}"/>
                                <div class="form-group">
                                    <label class="form__labels">Tanggapan Anda</label>
                                    <textarea required class="form-control" name="tangapan" rows="5">{{ $old_jawaban }}</textarea><br/>
                                </div>
                                <div class="form-group">
                                    <button id="btnSubmit" type="submit" class="btn btn-primary">Kirim</button>
                                </div>
                            </form>
                        </div>
                        @endif
                    @endif
                </div>   
                @endif
                
                @include('pages.admin.tr_pengaduan.view_log_pengaduan', ['id' => $id])
                
                <div class="row my-4">
                    <div class="col-md-12">
                        @if (!$isLocked)
                            @if ($is_valid_permission)
                                @if ($model->status_id == 1)
                                    <button id="btnVerifikator" class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#verifikatorModal">Verifikator</button>
                                @elseif ($model->status_id == 2) 
                                    <button id="btnResponder" class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#responderModal">Responder</button>                    
                                @elseif ($model->status_id == 3)
                                    <button id="btnResponder" class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#responModal">Tindak Lanjuti</button>
                                @endif
                                <button class="btn btn-warning" type="button" id="btnKembali">Kembali</button>
                            @endif
                        @endif
                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>

@if (!$isLocked)
    @if ($is_valid_permission)
        @if ($model->status_id == 1)
            @include('pages.admin.tr_pengaduan.view_modal_admin', ['id' => $id, 'model' => $model])
        @elseif ($model->status_id == 2) 
            @include('pages.admin.tr_pengaduan.view_modal_verifikator', ['id' => $id, 'model' => $model])
        @elseif ($model->status_id == 3)
            @include('pages.admin.tr_pengaduan.view_modal_responder', ['id' => $id, 'model' => $model])
        @endif
    @endif
@endif

@endsection
@push('script')
<style type="text/css">
ul.list-respon{ padding: 0px; }
ul.list-respon > li { list-style-type: none; }
</style>
<script type="text/javascript">
$(document).ready(function(){
    $('#btnKembali').click(function(e) {
        var params = {
            _token: '{{ csrf_token() }}',
            pengaduan_id: {{ $model->pengaduan_id }}
        };
        $.post("{{ URL::to('admin/tr_pengaduan/lock_release') }}", params, function(resp) {
            console.log(resp);
            location.href = "{{ URL::to('admin/tr_pengaduan') }}";
        }, 'json');
    });
});
</script>
@endpush
