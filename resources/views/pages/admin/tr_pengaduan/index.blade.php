@extends('layouts.admin')
@section('htmlheader_title')
    {{ trans('form') }}
@endsection
@section('main-content')

<!--==============================================================-->
<!-- Start right Content here main -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            
            <!--   main  ============================================================== -->
            <div class="panel-heading" style="margin-bottom:2%">
                <div class="panel-title col-md-12">
                    <h4 class="col-md-4">Transaksi Pengaduan {{ $kanal_name }}</h4>
                </div>
            </div>
            <div class="box-filter border p-4 rounded mb-3">
                <form id="formfilter" method="GET">
                    <div class="row mb-3">
                        <div class="col-4 row">
                            <label for="tanggal" class="form-label">Tanggal Periode</label>
                            <div class="d-flex align-items-center mb-3">
                                <input name="start_date" type="date" class="form-control" id="txttglawal" value="{{ $txttglawal }}">
                                <i class="fas fa-arrow-right px-1"></i>
                                <input name="end_date" type="date" class="form-control" id="txttglakhir" value="{{ $txttglakhir }}">
                            </div>
                            <label class="form-label">Kategori Pengaduan</label>
                            <div class="d-flex">
                                <select name="kategori_id" id="cmbcatagorikanal" class="form-control form-select">
                                    <option value="0">Semua data</option>
                                    @foreach (\App\Pengaduan_kategori::select('kategori_id','nama_kategori')->get() as $kategori)
                                    <option value="{{ $kategori->kategori_id }}" {{ $kategori->kategori_id == $kategori_id ? 'selected' : '' }}>
                                    {{ $kategori->nama_kategori }}
                                    </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-4">
                            <label class="form-label">Kategori Kanal</label>
                            <div class="d-flex mb-3">
                                <select name="kanal_id" id="cmbkanalpengaduan" class="form-control form-select">
                                    <option value="0">Semua data</option>
                                    @foreach (\App\Pengaduan_kanal::select('kanal_id','nama_kanal')->get() as $kanal)
                                    <option value="{{ $kanal->kanal_id }}" {{ $kanal->kanal_id == $kanal_id ? 'selected' : '' }}>
                                    {{ $kanal->nama_kanal }}
                                    </option>
                                    @endforeach
                                </select>
                            </div>
                            <label class="form-label">Status Pengaduan</label>
                            <div class="d-flex">
                                <select id="cmbstatuspengaduan" name="status_id" class="form-control form-select">
                                    <option value="0">Semua data</option>
                                    @foreach (\App\Pengaduan_status::select('status_id','nama_status')->get() as $status)
                                    <option value="{{ $status->status_id }}" {{ $status->status_id == $status_id ? 'selected' : '' }}>
                                    {{ $status->nama_status }}
                                    </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-4">
                            <label class="form-label">Posisi Pengaduan</label>
                            <div class="d-flex mb-3">
                                <select id="posisi_select2" name="posisi_id" class="form-control form-select">
                                    <option value="0">Semua data</option>
                                    <option value="1">Humas Pusat ATR BPN</option>
                                    <option value="2">Itjen 7 Pusat ATR BPN</option>
                                    <option value="3">Verifikator Pusat ATR BPN</option>
                                    <option value="4">Admin Kanwil Jawa Barat</option>
                                    <option value="5">Verifikator Kanwil Jawa Barat</option>
                                    <option value="6">Responder Kanwil Jawa Barat</option>
                                </select>
                            </div>
                            <label class="form-label">Klasifikasi Pengaduan</label>
                            <div class="d-flex">
                                <select id="klasifikasi_pengaduan" name="klasifikasi_id" class="form-control form-select">
                                    <option value="0">Semua data</option>
                                    @foreach (\App\Pengaduan_klasifikasi::select('klasifikasi_id','nama_klasifikasi')->get() as $klasifikasi)
                                    <option value="{{ $klasifikasi->klasifikasi_id }}" {{ $klasifikasi->klasifikasi_id == $klasifikasi_id ? 'selected' : '' }}>
                                    {{ $klasifikasi->nama_klasifikasi }}
                                    </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <a href="{{ route('indexPusatAdmin') }}" class="btn btn-default btn-sm btn-flat btn-warning"><i class="fas fa-chevron-left"></i> Kembali</a>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnbatal">Reset</button>
                            <button type="submit" class="btn btn-primary" id="btncaridata">Cari Data</button>
                        </div>
                    </div>
                </form>
            </div>
                
            <!-- Isi Content -->					
            <div class="panel-body table-responsive">
                @if (in_array($kanal_id, [7, 8]))
                <div style="margin-bottom: 20px;">
                    <a href="{{ URL::to('admin/tr_pengaduan/create') }}?kanal_id={{ $kanal_id }}" class="btn btn-primary">Buat Pengaduan {{ $kanal_name }}</a>
                </div>
                @endif
                <table id="dxdatagrid" class="table table-bordered table-responsive  bordered px-2 py-4 nowrap" style="width:100%;">
                    <thead>
                        <tr>
                            <th>No Pengadu</th>
                            <th>Nama </th>
                            <th>Kanal Pengaduan</th>
                            <th>Posisi Pengaduan</th>
                            <th>Status Pengaduan</th>
                            <th width="5%">&nbsp;</th>
                        </tr>
                    </thead>
        
                    <tbody>
                        @if(!$tr_pengaduans->isEmpty())
                            @foreach($tr_pengaduans as $no=>$tr_p)
                        <tr>
                            <td class="text-capitalize"> {{ $tr_p->pengaduan_id }}</td>
                            <td class="text-capitalize"> {{ $tr_p->nama }}</td>
                            <td class="text-capitalize"> {{ $tr_p->nama_kanal }}</td>
                            <td class="text-capitalize"> {{ $tr_p->nama_posisi }}</td>
                            @php
                                $class = "";
                                switch($tr_p->status_id) {
                                    case 1: $class = "diterima"; break;
                                    case 2: $class = "verifikasi"; break;
                                    case 3: $class = "responder"; break;
                                    case 4: $class = "respon"; break;
                                    case 5: $class = "selesai"; break;
                                }
                                
                                echo '<td class="text-capitalize status_' . $class . '" >' . $tr_p->nama_status . '</td>';
                            @endphp
                            <td class="text-center">
                                <a href="{{ URL::to('/admin/tr_pengaduan/view/' . $tr_p->pengaduan_id) }}"><i class="fa fa-eye"></i></a>
                            </td>
                        @endforeach
                       @endif
                    </tbody>
                          
                </table>
            </div>
            <!-- end main============================================================== -->
        </div>
    </div>
</div>
<!-- End Page-content main -->

@endsection
@push('script')

<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<style type="text/css">
#formfilter .form-group.row {
    margin-bottom: 10px;
}
{{ \App\Settings::getPengaduanColorCss('status') }}
</style>
<script type="text/javascript">
$(document).ready(function() {
    var table = $('#dxdatagrid').DataTable({
        responsive: true,
        language: {
            emptyTable: "Data kosong"
        }
    });
    
//    new $.fn.dataTable.FixedHeader( table );
     
//    $('#posisi_select2').select2({
//        dropdownAutoWidth : true,
//        width: '100%',
//        ajax: {
//            url: "{{ URL::to('/admin/get_posisi') }}",
//            data: function (params) {
//                var query = {
//                  search: params.term,
//                  type: 'public'
//                };
//
//                // Query parameters will be ?search=[term]&type=public
//                return query;
//            }
//        }
//    });
    
    $("body").on("click",".btnedit_Verifikator", function(){
        vall = $(this).closest('tr').find('td');
        $('#modalEditverifikator').modal('show');
    });

    $("body").on("click",".btnedit_Responder", function(){
        vall = $(this).closest('tr').find('td');
        $('#modalEditresponder').modal('show');
    });
    
    $("body").on("click",".btnedit_Jawab", function(){
        vall = $(this).closest('tr').find('td');
        $('#modalEditjawab').modal('show');
    });
    
    $("body").on("click",".btnedit_Kembali", function(){
        vall = $(this).closest('tr').find('td');
        $('#modalEditkembali').modal('show');
    });
});
</script>
@endpush
