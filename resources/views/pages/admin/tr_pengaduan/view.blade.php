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
                <fieldset class="border px-4 py-3 rounded mt-3">
                    <legend>Log Pengaduan</legend>
                    <div class="rb-container">
                      <ul class="rb">
                        <li class="rb-item" ng-repeat="itembx">
                          <div class="timestamp">
                            21 Oktober 2021<br> <span class="disposisi btn-secondary rounded">Laporan Diterima</span>
                          </div>
                          <div class="item-title">Nama User</div>
                          <div class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum unde, voluptate, consequuntur mollitia deserunt expedita illo ipsam molestias animi vero, voluptatem quaerat magnam quod porro vel. Perferendis quas sit quo?</div>
                          <div class="attach-group">
                            <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file.png</a>
                            <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file2.png</a>
                          </div>
                        </li>
                        <li class="rb-item" ng-repeat="itembx">
                          <div class="timestamp">
                            23 Oktober 2021<br> <span class="disposisi btn-warning rounded">Proses Verifikasi</span>
                          </div>
                          <div class="item-title">Nama User</div>
                          <div class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum unde, voluptate, consequuntur mollitia deserunt expedita illo ipsam molestias animi vero, voluptatem quaerat magnam quod porro vel. Perferendis quas sit quo?</div>
                          <div class="attach-group">
                            <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file.png</a>
                            <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file2.png</a>
                          </div>
                        </li>
                        <li class="rb-item" ng-repeat="itembx">
                          <div class="timestamp">
                            23 Oktober 2021<br> <span class="disposisi btn-info rounded">Proses Responder</span>
                          </div>
                          <div class="item-title">Nama User</div>
                          <div class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum unde, voluptate, consequuntur mollitia deserunt expedita illo ipsam molestias animi vero, voluptatem quaerat magnam quod porro vel. Perferendis quas sit quo?</div>
                          <div class="attach-group">
                            <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file.png</a>
                            <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file2.png</a>
                          </div>
                        </li>
                        <li class="rb-item" ng-repeat="itembx">
                          <div class="timestamp">
                            23 Oktober 2021<br> <span class="disposisi btn-success rounded">Selesai</span>
                          </div>
                          <div class="item-title">Nama User</div>
                          <div class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum unde, voluptate, consequuntur mollitia deserunt expedita illo ipsam molestias animi vero, voluptatem quaerat magnam quod porro vel. Perferendis quas sit quo?</div>
                          <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file.png</a>
                          <div class="attach-group">
                            <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file.png</a>
                            <a href="#" class="attach rounded"><i class="fas fa-paperclip"></i>nama_file2.png</a>
                          </div>
                        </li>
                        
                      </ul>
                    </div>                     
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
