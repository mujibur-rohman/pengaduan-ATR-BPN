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
                    <h3 class="col-md-4">Detail Pengaduan #{{ $id }}</h3>
                </div>
            </div>

            <!-- Content -->
            <div class="panel-body">
                @if ($model == null)
                <div class="alert alert-danger">Data tidak ditemukan</div>
                @else
                {{-- <div class="row" style="margin-bottom: 20px;">
                    <div class="col-md-12">
                        <button id="btnVerifikator" class="btn btn-primary" type="button">Verifikator</button>
                        <button id="btnResponder" class="btn btn-primary" type="button">Responder</button>
                    </div>
                </div> --}}
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
                            <a href="#" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#logModal"><i class="fas fa-info-circle" style="padding-right: 10px"></i><b>Log Pengaduan</b></a>
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
                        <li><a target="_blank" href="{{ URL::to('/' . $item->file_path) }}">{{ $item->nama_file }}</a></li>
                        @endforeach
                    </ul>
                    @endif
                </fieldset>
                
                <div class="row my-4">
                    <div class="col-md-12">
                        @if ($model->status->nama_status == 'Laporan Diterima')
                            <button id="btnVerifikator" class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#verifikatorModal">Verifikator</button>
                        @else
                            <button id="btnResponder" class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#responderModal">Responder</button>                    
                        @endif
                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>


<!-- Modal LOG -->
<div class="modal fade" id="logModal" tabindex="-1" aria-labelledby="logModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="logModalLabel">Log Pengaduan</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        test
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Verifikator -->
<div class="modal fade" id="verifikatorModal" tabindex="-1" aria-labelledby="verifikatorModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="verifikatorModalLabel">Disposisi Tujuan</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        test
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Responder -->
<div class="modal fade" id="responderModal" tabindex="-1" aria-labelledby="responderModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="responderModalLabel">Disposisi Tujuan</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        test
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>




@endsection
@push('script')

@endpush
