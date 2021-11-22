@extends('layouts.admin')
@section('htmlheader_title')
    {{ trans('pusat') }}
@endsection
@section('main-content')

<!-- ============================================================== -->
<!-- Start right Content here main -->
           
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!--   main  ============================================================== -->  
           
            <div class="panel-heading" style="margin-bottom: 2%">
                <h1 class="panel-title col-md-5">Master User</h1>
                <div class="right col-md-4 text-right">
                    <a class="btn btn-primary btn-xs" id="btnTambah" ><i class="fa fa-edit"></i> Tambah </a> 
                </div>
            </div>
            <!-- Isi Content -->
 
            <div class="panel-body">
                <table class="table table-striped table-bordered table-responsive nowrap" id="dxdatagrid" style="width:100%;">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Lokasi</th>
                            <th>Hak Akses</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div class="modal fade" id="modalLoader" role="dialog" tabindex="-1">
                <div style=" position: fixed; margin-left: 50%; margin-top: 20%; ">
                    <img src="{{ asset('assets_back/images/loader.gif')}}" style=" width: 50px;" alt="loading..." />
                </div>
            </div>
            <!-- end main============================================================== -->
        </div>
   </div>    
</div>
<!-- End Page-content main -->

<div id="myModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="form" id="myForm">
                    {{ csrf_field() }}
                    <input type="hidden" name="id_user" id="id_user"/>
                    <div class="form-group row" style="margin-bottom: 10px;">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                            <input id="users-email" type="text" class="form-control" name="users[email]"/>
                        </div>
                    </div>
                    <div class="form-group row" style="margin-bottom: 10px;">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Nama</label>
                        <div class="col-sm-9">
                            <input id="users-fullname" type="text" class="form-control" name="users[fullname]"/>
                        </div>
                    </div>
                    <div class="form-group row" style="margin-bottom: 10px;">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Role</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="users[id_role]" id="users-id_role">
                                @foreach (\App\Roles::select('id_role','description')->get() as $role)
                                <option value="{{ $role->id_role }}">
                                {{ $role->description }}
                                </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="form-group row" style="margin-bottom: 10px;">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Lokasi</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="users[posisi_id]" id="users-posisi_id">
                                @foreach (\App\Pengaduan_posisi::select('posisi_id','nama_posisi')->get() as $posisi)
                                <option value="{{ $posisi->posisi_id }}">
                                {{ $posisi->nama_posisi }}
                                </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnSave">Simpan</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            </div>
        </div>
    </div>
</div>

@endsection

@push('script')
<script type="text/javascript">
$(document).ready(function(){
    function showModal(title, data) {
        $('#myModal .modal-title').html(title);
        
        $('#nama_status').val(data !== null ? data.nama_status : '');
        $('#status_id').val(data !== null ? data.status_id : '');
        $('#myModal').modal('show');
    }
    
    var table = $('#dxdatagrid').DataTable({
        responsive: true,
        ajax: "{{ URL::to('/admin/register/list') }}",
        columns: [
            { "data": "id_user", width: '5%', className: 'text-center' },
            { "data": "fullname" },
            { "data": "email" },
            { "data": "role_name" },
            { "data": "nama_posisi" },
            { "data": "flag_role" },
            { 
                "data": null,
                mRender: function(data, type, full){
                    var up = '<a class="update" href="javascript:void(0);" ><i class="fa fa-edit"></i></a>';
                    var dl = '<a class="delete" href="javascript:void(0);" ><i class="fa fa-trash"></i></a>';
                    return up + ' ' + dl;
                },
                width: '5%',
                className: 'text-center'
            } 
        ],
        language: {
            emptyTable: "Data kosong"
        }
    });
    
    $('#dxdatagrid tbody').on( 'click', '.update', function () {
        var data = table.row( $(this).parents('tr') ).data();
        showModal('Update Data', data);
    } );
    
    $('#dxdatagrid tbody').on( 'click', '.delete', function () {
        var data = table.row( $(this).parents('tr') ).data();
        if (confirm("Apakah anda ingin menghapus data '" + data.nama_status + "'")) {
            var params = {
                _token: '{{ csrf_token() }}',
                status_id: data.status_id
            };
            $.post("{{ URL::to('/admin/pengaduan_status/delete') }}", params, function(resp){
                if (resp.success) {
                    table.ajax.reload();
                    alert('Data berhasil di hapus');
                } else {
                    alert(resp.message);
                }
            }, 'json');
        }
    } );
    
    $('#btnTambah').click(function(e){
        e.preventDefault();
        showModal('Tambah User', null);
    });
    $('#btnSave').click(function(e){
        e.preventDefault();
        if ($('#nama_status').val() === '') {
            alert('Nama status tidak boleh kosong');
            return;
        }
        
        $.post("{{ URL::to('/admin/pengaduan_status/save') }}", $('#myForm').serialize(), function(resp){
            if (resp.success) {
                $('#myModal').modal('hide');
                table.ajax.reload();
                alert(resp.message);
            } else {
                alert('message: ' + resp.message);
            }
        }, 'json');
    });
});
</script>
@endpush