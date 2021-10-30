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
                    <h4 class="col-md-4">Transaksi Pengaduan ALL</h4>
                </div>
            <div class="row">
                <div class="panel-title col-md-12">

                    <form id="formfilter" method="POST">
                        {{ csrf_field() }}
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Tanggal Periode</label>
                                    <div class="col-sm-4">
                                        <input name="start_date" type="date" class="form-control" id="txttglawal" value="{{ $txttglawal }}">
                                    </div>
                                    <label for="staticEmail" class="col-sm-1 col-form-label">s/d</label>
                                    <div class="col-sm-4">
                                        <input name="end_date" type="date" class="form-control" id="txttglakhir" value="{{ $txttglakhir }}">
                                    </div>
                                </div>
                                
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Katagori Pengaduan</label>
                                    <div class="col-sm-4">
                                        <select name="pengaduan_id" id="cmbcatagorikanal" class="form-control">
                                            <option value="1" {{ $kanal_id == "1" ? "selected" : "" }}>Kanal NON Medsos</option>
                                            <option value="2" {{ $kanal_id == "2" ? "selected" : "" }}>Kanal Medsos</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Katagori Kanal</label>
                                    <div class="col-sm-4">
                                        <select name="kanal_id" id="cmbkanalpengaduan" class="form-control">
                                            <option value="0">Semua data</option>
                                            @foreach (\App\Pengaduan_kanal::select('kanal_id','nama_kanal')->get() as $kanal)
                                                <option value="{{ $kanal->kanal_id }}" {{ $kanal->kanal_id == $kanal_id ? 'selected' : '' }}>
                                                    {{ $kanal->nama_kanal }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Status Pengaduan</label>
                                    <div class="col-sm-4">
                                        <select name="status_id" id="cmbstatuspengaduan" class="form-control">
                                            <option value="0">Semua data</option>
                                            @foreach (\App\Pengaduan_status::select('status_id','nama_status')->get() as $status)
                                                <option value="{{ $status->status_id }}" {{ $status->status_id == $status_id ? 'selected' : '' }}>
                                                    {{ $status->nama_status }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Posisi Pengaduan</label>
                                    <div class="col-sm-4">
                                        <select id="cmbposisipengaduan" class="form-control">
                                            <option value="0">Semua data</option>
                                            @foreach (\App\Pengaduan_posisi::select('posisi_id','nama_posisi')->get() as $posisi)
                                                <option value="{{ $posisi->posisi_id }}" {{ $posisi->posisi_id == $status_id ? 'selected' : '' }}>
                                                    {{ $posisi->nama_posisi }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Jenis Pengaduan</label>
                                    <div class="col-sm-4">
                                        <select id="cmbjenispengaduan" class="form-control">
                                            <option value="0">Semua data</option>
                                            <option value="1">Informasi</option>
                                            <option value="2">Pengaduan</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">&nbsp;</label>
                                    <div class="col-sm-9">
                                        <a href="{{ route('indexPusatAdmin') }}" class="btn btn-default btn-sm btn-flat">Kembali</a>
                                        <button type="submit" class="btn btn-primary" id="btncaridata">Cari Data </button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnbatal">bersih</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                
            <!-- Isi Content -->					
            <div class="panel-body">
                <table id="dxdatagrid" class="table table-striped table-bordered table-responsive nowrap" style="width:100%;">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>ID</th>
                            <th>Jenis Pengaduan</th>
                            <th>Kanal Pengaduan</th>
                            <th>Posisi Pengaduan</th>
                            <th>Status Pengaduan</th>
                            <th>Nama </th>
                            <th>Alamat </th>
                            <th>Email</th>
                            <th>Pekerjaan</th>
                            <th>No.Telp</th>
                            <th>Obyek Aduan</th>
                            <th>Hubungan</th>
                            <th>No.Berkas</th>
                            <th>Uraian Pengaduan</th>
                            <th>Nama Penerima</th>
                            <th>TGL Dibuat</th>
                            <th> Disposisi</th>
                        </tr>
                    </thead>
        
                    <tbody>
                        @if(!$tr_pengaduans->isEmpty())
                            @foreach($tr_pengaduans as $no=>$tr_p)

                        <tr>
                            <td class="text-center">{{ $no+1 }}</td>
                            <td class="text-capitalize"> {{ $tr_p->pengaduan_id }}</td>
                            <td class="text-capitalize"> {{ $tr_p->nama_jenis }}</td>
                            <td class="text-capitalize"> {{ $tr_p->nama_kanal }}</td>
                            <td class="text-capitalize"> {{ $tr_p->nama_posisi }}</td>
                            @if($tr_p->nama_status == "Proses Verifikasi")
                            <td class="text-capitalize" style="background-color:#FFCCFF" > {{ $tr_p->nama_status }}</td>
                            @else  
                              @if($tr_p->nama_status == "Laporan Diterima")
                              <td class="text-capitalize" style="background-color:#FFFFCC" > {{ $tr_p->nama_status }}</td>
                              @else
                              <td class="text-capitalize" style="color:#ffffff;background-color:#99FF00" > {{ $tr_p->nama_status }}</td>
                            @endif
                            @endif  
                            <td class="text-capitalize"> {{ $tr_p->nama }}</td>
                            <td class="text-capitalize"> {{ $tr_p->alamat }}</td>
                            <td class="text-capitalize"> {{ $tr_p->email }}</td>
                            <td class="text-capitalize"> {{ $tr_p->pekerjaan }}</td>
                            <td class="text-capitalize"> {{ $tr_p->no_telp }}</td>
                            <td class="text-capitalize"> {{ $tr_p->obyek_aduan }}</td>
                            <td class="text-capitalize"> {{ $tr_p->hubungan }}</td>
                            <td class="text-capitalize"> {{ $tr_p->no_berkas }}</td>
                            <td class="text-capitalize"> {{ $tr_p->uraian_pengaduan }}</td>
                            <td class="text-capitalize"> {{ $tr_p->username }}</td>
                            <!-- <td class="text-capitalize"> {{ $tr_p->leadtime1 }}</td>
                            <td class="text-capitalize"> {{ $tr_p->leadtime2 }}</td>
                            <td class="text-capitalize"> {{ $tr_p->leadtime3 }}</td> -->
                            <td class="text-capitalize"> {{ $tr_p->created_at }}</td>
                         
                            <td>
                                @if($tr_p->nama_status == "Proses Verifikasi")
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Verifikator" data-toggle="modal" data-target="#modalEditJurusan" style="color:#000000 ;background-color:#FFFFCC;" disabled><i class="fa fa-edit"></i>Verifikator</button>
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Responder" data-toggle="modal" data-target="#modalEditJurusan"style="color:#000000 ;background-color:#FFCCFF"><i class="fa fa-edit"></i>Responder</button>
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Jawab" data-toggle="modal" data-target="#modalEditJurusan" style="color:#000000 ;background-color:#99FF00" disabled><i class="fa fa-edit"></i>Respon</button>
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Kembali" data-toggle="modal" data-target="#modalEditJurusan"><i class="fa fa-edit"></i>Kembali</button>
   
                                @else 
                                @if($tr_p->nama_status == "Laporan Diterima")

                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Verifikator" data-toggle="modal" data-target="#modalEditJurusan" style="color:#000000 ;background-color:#FFFFCC;"><i class="fa fa-edit"></i>Verifikator</button>
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Responder" data-toggle="modal" data-target="#modalEditJurusan"style="color:#000000 ;background-color:#FFCCFF"  disabled><i class="fa fa-edit"></i>Responder</button>
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Jawab" data-toggle="modal" data-target="#modalEditJurusan" style="color:#000000 ;background-color:#99FF00" disabled><i class="fa fa-edit"></i>Respon</button>
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Kembali" data-toggle="modal" data-target="#modalEditJurusan" disabled><i class="fa fa-edit"></i>Kembali</button>  
                                @else
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Verifikator" data-toggle="modal" data-target="#modalEditJurusan" style="color:#000000 ;background-color:#FFFFCC;" disabled><i class="fa fa-edit"></i>Verifikator</button>
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Responder" data-toggle="modal" data-target="#modalEditJurusan"style="color:#000000 ;background-color:#FFCCFF" disabled><i class="fa fa-edit"></i>Responder</button>
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Jawab" data-toggle="modal" data-target="#modalEditJurusan" style="color:#000000 ;background-color:#99FF00" ><i class="fa fa-edit"></i>Respon</button>
                                <button type="button" class="btn btn-primary btn-sm btn-flat btnedit_Kembali" data-toggle="modal" data-target="#modalEditJurusan"><i class="fa fa-edit"></i>Kembali</button>
                               
                                @endif
                                @endif
                            </td>
                        </tr>
                        @endforeach
                       @endif
                    </tbody>
                          
                </table>
            </div>
            <!-- end main============================================================== -->
            
{{-- Modal Dialog Edit verifikator --}}
<div id="modalEditverifikator" class="modal fade">
    <div class="modal-dialog modal-sm"   style="width:700px;">
    {{-- <form action="{{ route('postUpdateverifikatorAdmin') }}" method="POST"> --}}
        <form action="" method="POST">
            {{ csrf_field() }}
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Disposisi Tujuan</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                                
                <table  id="dxdatagridpilih" class="table table-striped table-bordered nowrap" >
                        <thead>
                            <tr>
                                
                                <th>Penerima Disposisi</th>
                                <th>Status Dokumen</th>
                                <th>Posisi Dokumen</th>
                                <th>Disposisi</th>
                            </tr>
                                         
                        </thead>
        
                            <tbody>
                           
                          @foreach($disposisi_verifikator as $no=>$tr_p)

                             <tr>
                                <td class="text-capitalize"> {{ $tr_p->username }}</td>
                                <td class="text-capitalize"> {{ $tr_p->name }}</td>
                                <td class="text-capitalize"> {{ $tr_p->nama_posisi }}</td>
                             <td>
                             <a href="{{ route('pengaduan_verifikasi', $tr_p->gab_flag_role) }}" data-target="" class="btn btn-default btn-sm btn-flat"  >Ok</a>
                           
                            </td>
                        </tr>
                        @endforeach
                    
                    </tbody>
                          
                     </table>

                </div>
               
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left btn-flat" data-dismiss="modal">Keluar</button>
            </div>
        </div>
        </form>
    <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

           
{{-- Modal Dialog Edit responder --}}
<div id="modalEditresponder" class="modal fade">
    <div class="modal-dialog modal-sm"   style="width:700px;">
    {{-- <form action="{{ route('postUpdateresponderAdmin') }}" method="POST"> --}}
        <form action="" method="POST">
            {{ csrf_field() }}
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Pilih Responder</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                <table  id="dxdatagrid_responder" class="table table-striped table-bordered nowrap" >
                        <thead>
                            <tr>
                                
                                <th>Penerima Disposisi</th>
                                <th>Status Dokumen</th>
                                <th>Posisi Dokumen</th>
                                <th>Disposisi</th>
                            </tr>
                                         
                        </thead>
        
                            <tbody>
                           
                          @foreach($disposisi_responder as $no=>$tr_p)

                             <tr>
                                <td class="text-capitalize"> {{ $tr_p->username }}</td>
                                <td class="text-capitalize"> {{ $tr_p->name }}</td>
                                <td class="text-capitalize"> {{ $tr_p->nama_posisi }}</td>
                             <td>
                             <a href="{{ route('pengaduan_responder', $tr_p->gab_flag_role) }}" data-target="" class="btn btn-default btn-sm btn-flat"  >Ok</a>
                           
                            </td>
                        </tr>
                        @endforeach
                    
                    </tbody>
                          
                     </table>

                </div>
               
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left btn-flat" data-dismiss="modal">Keluar</button>
                
            </div>
        </div>
        </form>
    <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

           
{{-- Modal Dialog Edit jawab --}}
<div id="modalEditjawab" class="modal fade">
    <div class="modal-dialog modal-sm" style="width:350px;">
    {{-- <form action="{{ route('postUpdatejawabAdmin') }}" method="POST"> --}}
        <form action="" method="POST">
            {{ csrf_field() }}
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Rekomendasi jawaban ke pengadu</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label> Respon</label>
                    <textarea  rows="7" cols="50" id="txtjawaban" name="txtjawaban"></textarea>
                </div>
               
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left btn-flat" data-dismiss="modal">Keluar</button>
                <button type="submit" class="btn btn-primary btn-flat"><i class="fa fa-save"></i> Kirim</button>
            </div>
        </div>
        </form>
    <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>



{{-- Modal Dialog Edit jawab --}}
<div id="modalEditkembali" class="modal fade">
    <div class="modal-dialog modal-sm" style="width:450px;">
    {{-- <form action="{{ route('postUpdatekembaliAdmin') }}" method="POST"> --}}
        <form action="" method="POST">
            {{ csrf_field() }}
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Rekomendasi dokumen dikembalikan</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Berita acara</label>
                      <textarea  rows="7" cols="50" id="txtberitaacara" name="txtberitaacara"></textarea>
                </div>
               
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left btn-flat" data-dismiss="modal">Keluar</button>
                <button type="submit" class="btn btn-primary btn-flat"><i class="fa fa-save"></i> Kirim</button>
            </div>
        </div>
        </form>
    <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
                    
                </div>
            </div>
    </div>
</div>    
<!-- End Page-content main -->

@endsection
@push('script')

<style type="text/css">
#formfilter .form-group.row {
    margin-bottom: 10px;
}
</style>
<script type="text/javascript">
$(document).ready(function() {
    var table = $('#dxdatagrid').DataTable({
        responsive: true,
        language: {
            emptyTable: "Data kosong"
        }
    });
    
    new $.fn.dataTable.FixedHeader( table );
     
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
    
    $('#formfilter').attr("action", "{{ route('tampil_filter') }}");

//    $('#formfilter').submit(function(e) {
//        e.preventDefault();
//
//        var link = $('#formfilter').attr('action');
//        var request = new FormData(this);
//         console.log(request)
//         console.log(link)
//         $.ajax({
//            url: link,
//            method: "post",
//            data: request,
//            contentType: false,
//            cache: false,
//            processData: false,
//            success: function(response) {
//                   console.log(response);
//                alert("Data anda berhasil di Kirim")  
//                   // $('#alert-success').html('Data User Berhasil Disimpan').fadeIn().delay(4000).fadeOut('slow');
//              //     kosongdata();  
//
//            }
//        });
//    });
});
</script>
@endpush
