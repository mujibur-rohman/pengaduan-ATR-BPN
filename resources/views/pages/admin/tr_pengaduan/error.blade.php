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
                <div class="alert alert-danger">
                    <p>{{ $message }}</p>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
@push('script')
@endpush
