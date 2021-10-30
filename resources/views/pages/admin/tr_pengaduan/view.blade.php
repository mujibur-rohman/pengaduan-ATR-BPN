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
            <div class="panel-body table-responsive">
                @if ($model == null)
                <div class="alert alert-danger">Data tidak ditemukan</div>
                @else
                <fieldset>
                    <legend>Informasi Pengirim</legend>
                    <div class="col-md-6">
                        <dl class="row">
                            <dt class="col-sm-3">Nama</dt>
                            <dd class="col-sm-9">{{ $model->nama }}</dd>

                            <dt class="col-sm-3">Nomor Handphone</dt>
                            <dd class="col-sm-9">{{ $model->no_telp }}</dd>

                            <dt class="col-sm-3">Email</dt>
                            <dd class="col-sm-9">{{ $model->email }}</dd>
                        </dl>
                    </div>
                    <div class="col-md-6">
                        <dl class="row">
                            <dt class="col-sm-3">Alamat</dt>
                            <dd class="col-sm-9">{{ $model->alamat }}</dd>

                            <dt class="col-sm-3">Pekerjaan</dt>
                            <dd class="col-sm-9">{{ $model->pekerjaan }}</dd>

                            <dt class="col-sm-3">Hubungan</dt>
                            <dd class="col-sm-9">{{ $model->hubungan }}</dd>
                        </dl>
                    </div>
                </fieldset>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
@push('script')

@endpush