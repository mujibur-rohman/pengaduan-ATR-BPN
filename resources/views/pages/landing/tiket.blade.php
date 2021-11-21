@extends('layouts.landing_default')

@section('htmlheader_title')
    {{ trans('Pelayanan Pengaduan ATR/BPN') }}
@endsection

@section('main-content-mailsent') 

<div id="tiket">
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
                        <h3 style="margin: 0">Nomor Tiket Pengaduan #{{ $model->kode_tiket }}</h3><br/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-lg-4">
                        <h5 class="fs-2 fw-bold">No Berkas Permohonan</h5>
                        <p class="fs-3">{{ $model->no_berkas }}</p>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <h5 class="fs-2 fw-bold">Tanggal Pengaduan</h5>
                        <p class="fs-3">{{ $model->created_at }}</p>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <h5 class="fs-2 fw-bold">Jenis Pengaduan</h5>
                        <p class="fs-3">{{ $model->jenis->nama_jenis }}</p>
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <h5 class="fs-2 fw-bold">Kanal Pengaduan</h5>
                        <p class="fs-3">{{ $model->kanal->nama_kanal }}</p>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <h5 class="fs-2 fw-bold">Status Pengaduan</h5>
                        <p class="fs-3">{{ $model->status->nama_status }}</p>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <h5 class="fs-2 fw-bold">Posisi Pengaduan</h5>
                        <p class="fs-3">{{ $model->posisi->nama_posisi }}</p>
                    </div>
                </div>
            </fieldset>
            
            <fieldset style="margin-top: 20px;" class="border rounded py-3 px-4">
                <h3>Informasi Pengadu</h3>
                <div class="row">
                    <div class="col-md-6">
                        <div class="fs-2 fw-bold"><strong>Nama</strong></div>
                        <div class="fs-3 mb-3">{{ $model->nama }}</div>        
                    </div>
                    <div class="col-md-6">
                        <div class="fs-2 fw-bold"><strong>NIK</strong></div>
                        <div class="fs-3 mb-3">{{ $model->nik }}</div>
                    </div>

                    <div class="col-md-6">
                        <div class="fs-2 fw-bold"><strong>Pekerjaan</strong></div>
                        <div class="fs-3 mb-3">{{ $model->pekerjaan }}</div>
                    </div>
                    <div class="col-md-6">
                        <div class="fs-2 fw-bold"><strong>Email</strong></div>
                        <div class="fs-3 mb-3">{{ $model->email }}</div>   
                    </div>
                    <div class="col-md-6">
                        <div class="fs-2 fw-bold"><strong>No Telp</strong></div>
                        <div class="fs-3 mb-3">{{ $model->no_telp }}</div>
                    </div>
                    <div class="col-md-6">
                        <div class="fs-2 fw-bold"><strong>Obyek Aduan</strong></div>
                        <div class="fs-3 mb-3">{{ $model->obyek_aduan }}</div>  
                    </div>
                    <div class="col-md-6">
                        <div class="fs-2 fw-bold"><strong>Alamat</strong></div>
                        <div class="col-12 fs-3 mb-3">{{ $model->alamat }}</div>
                    </div>
                    <div class="col-md-6">
                        <div class="fs-2 fw-bold"><strong>Hubungan</strong></div>
                        <div class="fs-3 mb-3">{{ $model->hubungan }}</div>  
                    </div>
                    <div class="col-md-6">
                        <div class="fs-2 fw-bold"><strong>Jenis Kelamin</strong></div>
                        <div class="fs-3 mb-3">{{ $model->sex == "M" ? "Pria" : "Wanita" }}</div>  
                    </div>
                </div>                                
            </fieldset>
            
            <div class="border px-4 py-3 rounded mt-3">
                <h3>Uraian Pengaduan</h3>
                <p class="fs-2">{{ $model->uraian_pengaduan }}</p>
            </div>                                        
            <fieldset class="border px-4 py-3 rounded mt-3">
                <h3>Lampiran</h3>
                @if (empty($lampiran))
                <div class="alert alert-warning">Tidak ada lampiran</div> 
                @else
                <ul>
                    @foreach($lampiran as $item)
                    <li><a data-lightbox="image-13" style="color: brown" target="_blank" href="{{ URL::to('/') . Storage::url($item->file_path) }}">{{ $item->nama_file }}</a></li>
                    @endforeach
                </ul>
                @endif
            </fieldset>
            
            <fieldset class="border px-4 py-3 rounded mt-3">
                <h3>Tindak Lanjut</h3>
                @if (empty($tangapan))
                    <div class="alert alert-info">Sedang menunggu tindak lanjut</div>
                @else
                    <ul>
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
                                <button type="button" class="close" data-dismiss="alert">×</button>    
                                <strong>{{ $message }}</strong>
                            </div>
                        @endif
                        <form method="post" id="form-password" action="{{ URL::to('tiket') }}">
                            {{ csrf_field() }}
                            <input type="hidden" name="pengaduan_id" value="{{ $model->pengaduan_id }}"/>
                            <input type="hidden" name="action" value="save_tangapan"/>
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
            </fieldset>
            
            <fieldset class="border px-4 py-3 rounded mt-3">
                @if ($model->status_id == 4)
                <button type="button" id="btnClose" class="btn btn-danger">Tutup Tiket</button>
                @endif
                <button type="button" id="btnLogout" class="btn btn-warning">Logout</button>
            </fieldset>
        </div>
    </div>
    @endif
</div>
<script type="text/javascript">
$(document).ready(function(){
    $('#btnLogout').click(function(e){
        var data = {
            _token: '{{ csrf_token() }}',
            action: 'logout'
        };
        
        if (confirm('Anda ingin logout?') === true) {
            $.post("{{ URL::to('/tiket') }}", data, function(result){
                if (result.success) {
                    location.reload();
                }
            }, 'json');
        }
    });
    
    $('#btnClose').click(function(e){
        var data = {
            _token: '{{ csrf_token() }}',
            action: 'close_ticket'
        };
        
        if (confirm('Apakah pengaduan anda sudah selesai?') === true) {
            $.post("{{ URL::to('/tiket') }}", data, function(result){
                if (result.success) {
                    location.reload();
                }
            }, 'json');
        }
    });
});
</script>
@endsection