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
                    <h3 class="col-md-4">Buat Laporan {{ \App\Pengaduan_kanal::getName($kanal_id) }}</h3>
                </div>
            </div>

            <!-- Content -->
            <div class="panel-body">
                @if (!in_array($kanal_id, [7, 8]))
                <div class="alert alert-warning">
                    <p>Maaf, halaman ini hanya untuk membuat laporan pengaduan melalui email atau surat saja.</p>
                </div>
                @else
                <form action="{{ URL::to('admin/tr_pengaduan/save_create') }}" method="post" id="form-pengaduan" enctype="multipart/form-data">
                    {{ csrf_field() }}
                    <input type="hidden" name="kanal_id" value="{{ $kanal_id }}"/>
                    <div class="form_layouts">

                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <p>Silahkan perbaiki data dibawah ini</p>
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        <h2>I. Identitas Pengadu</h2>
                        <div class="row" style="margin-bottom: 10px;">
                            <div class="form-group col-sm-6">
                                <label class="form__labels" for="number">Nama <span style="color: red">*</span></label>
                                <input name="pengaduan[nama]" value="{{ $model['nama'] }}" type="text" class="form-control form__items" id="number" placeholder="Nama" required>
                                @if ($errors->has('nama'))
                                <div class="form-text error">
                                    {{ $errors->first('nama') }}
                                </div>
                                @endif
                            </div>
                            <div class="form-group col-sm-6">
                                <label class="form__labels" for="date">NIK <span style="color: red">*</span></label>
                                <input name="pengaduan[nik]" value="{{ $model['nik'] }}" type="text" class="form-control form__items" id="date" placeholder="NIK" required>
                                @if ($errors->has('nik'))
                                <div class="form-text error">
                                    {{ $errors->first('nik') }}
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="row" style="margin-bottom: 10px;">
                            <div class="form-group">
                                <label for="address" class="form__labels">Alamat <span style="color: red">*</span></label>
                                <textarea name="pengaduan[alamat]" class="form-control form__items" id="address" rows="3" required>{{ $model['alamat'] }}</textarea>
                                @if ($errors->has('alamat'))
                                <div class="form-text error">
                                    {{ $errors->first('alamat') }}
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="row" style="margin-bottom: 10px;">
                            <div class="form-group col-sm-6 col-lg-4">
                                <label class="form__labels" for="email">Email <span style="color: red">*</span></label>
                                <input name="pengaduan[email]" value="{{ $model['email']}}" type="text" class="form-control form__items" id="email" placeholder="Email" required>
                                @if ($errors->has('email'))
                                <div class="form-text error">
                                    {{ $errors->first('email') }}
                                </div>
                                @endif
                            </div>
                            <div class="form-group col-sm-6 col-lg-4">
                                <label class="form__labels" for="phone">No Telepon <span style="color: red">*</span></label>
                                <input name="pengaduan[phone]" value="{{ $model['phone'] }}" type="text" class="form-control form__items" id="phone" placeholder="Phone" required>
                                @if ($errors->has('phone'))
                                <div class="form-text error">
                                    {{ $errors->first('phone') }}
                                </div>
                                @endif
                            </div>
                            <div class="form-group col-sm-12 col-lg-4">
                                <label class="form__labels" for="profession">Pekerjaan <span style="color: red">*</span></label>
                                <input name="pengaduan[pekerjaan]" value="{{ $model['pekerjaan'] }}" type="text" class="form-control form__items" id="profession" placeholder="Pekerjaan" required>
                                @if ($errors->has('pekerjaan'))
                                <div class="form-text error">
                                    {{ $errors->first('pekerjaan') }}
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="row" style="margin-bottom: 10px;">
                            <div class="form-group col-sm-6">
                                <label class="form__labels" for="txtobyek_aduan">Objek Aduan (No. SHM/Letak Tanah) <span style="color: red">*</span></label>
                                <input name="pengaduan[objek_aduan]" value="{{ $model['objek_aduan'] }}" type="text" class="form-control form__items" id="txtobyek_aduan" required>
                                @if ($errors->has('objek_aduan'))
                                <div class="form-text error">
                                    {{ $errors->first('objek_aduan') }}
                                </div>
                                @endif
                            </div>
                            <div class="form-group col-sm-6">
                                <label class="form__labels" for="relation">Hubungan hukum dengan tanah <span style="color: red">*</span></label>
                                <input type="text" class="form-control form__items" name="pengaduan[hubungan]" value="{{$model['hubungan']}}" id="relation" required>
                                @if ($errors->has('hubungan'))
                                <div class="form-text error">
                                    {{ $errors->first('hubungan') }}
                                </div>
                                @endif
                            </div>
                            <div class="form-group col-sm-12">
                                <label class="form__labels" for="berkas">No Berkas Permohonan (Untuk pelayanan) <span style="color: red">*</span></label>
                                <input name="pengaduan[no_berkas]" value="{{ $model['no_berkas'] }}" type="text" class="form-control form__items" id="berkas" required>
                                @if ($errors->has('no_berkas'))
                                <div class="form-text error">
                                    {{ $errors->first('no_berkas') }}
                                </div>
                                @endif
                            </div>
                        </div>
                        <h2>II. Uraian Pengaduan <span style="color: red">*</span></h2>
                        <div class="row" style="margin-bottom: 20px;">
                            <div class="form-group">
                                <textarea name="pengaduan[uraian]" class="form-control form__items" rows="5" placeholder="Uraikan pengaduan anda disini.." required>{{$model['uraian']}}</textarea>
                                @if ($errors->has('uraian'))
                                <div class="form-text error">
                                    {{ $errors->first('uraian') }}
                                </div>
                                @endif
                            </div>
                        </div>

                        <h2>III. Bukti Yang Dilampirkan</h2>

                        <div style="margin-bottom: 2rem">
                            <div class="form-group col-12">
                                <input class="file__upload" type="file" name="bukti1" id="file">
                            </div>
                            <div class="form-group col-12">
                                <input class="file__upload" type="file" name="bukti2" id="file">
                            </div>
                            <div class="form-group col-12">
                                <input class="file__upload" type="file" name="bukti3" id="file">
                            </div>
                        </div>

                        <div class="text-right form-group" style="margin-bottom: 30px;">
                            <button type="reset" class="btn btn-warning">Hapus Form</button>
                            <button type="submit" class="btn btn-primary">Kirim</button>
                        </div>
                    </div>
                </form>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
@push('script')

<script type="text/javascript">
$(document).ready(function(){
    
});
</script>
@endpush
