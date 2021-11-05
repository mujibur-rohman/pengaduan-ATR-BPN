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
                <h1 class="panel-title col-md-5">Master Data FAQ</h1>
                <div class="text-right right col-md-4">
                    <a class="btn btn-primary btn-xs" id="btnTambah" ><i class="fa fa-edit"></i> Tambah </a> 
                </div>
            </div>
            <!-- Isi Content -->
 
            <div class="panel-body table-responsive">
                <table class="table faq-table table-striped table-bordered table-responsive nowrap" id="dxdatagrid" style="width:100%;">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pertanyaan</th>
                            <th>Jawaban</th>
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
                    <input type="hidden" name="faq_id" id="faq_id"/>
                    <div class="form-group">
                        <label for="staticEmail" class="col-form-label">Pertanyaan</label>
                        <div>
                            <textarea name="faq_question" id="faq_question" cols="10" rows="5" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="staticEmail" class="col-form-label">Jawaban</label>
                        <div>
                            <textarea name="faq_answer" id="faq_answer" cols="10" rows="5" class="form-control"></textarea>
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
        
        $('#faq_question').val(data !== null ? data.faq_question : '');
        $('#faq_answer').val(data !== null ? data.faq_answer : '');
        $('#faq_id').val(data !== null ? data.faq_id : '');
        $('#myModal').modal('show');
    }
    
    var table = $('#dxdatagrid').DataTable({
        responsive: true,
        ajax: "{{ URL::to('/admin/faq/list') }}",
        columns: [
            { "data": "faq_id", width: '5%', className: 'text-center' },
            { "data": "faq_question" },
            { "data": "faq_answer" },
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
        if (confirm("Apakah anda ingin menghapus faq ini?")) {
            var params = {
                _token: '{{ csrf_token() }}',
                faq_id: data.faq_id
            };
            $.post("{{ URL::to('/admin/faq/delete') }}", params, function(resp){
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
        showModal('Tambah Data', null);
    });
    $('#btnSave').click(function(e){
        e.preventDefault();
        if ($('#faq_question').val() === '') {
            alert('Pertanyaan tidak boleh kosong');
            return;
        }
        if ($('#faq_answer').val() === '') {
            alert('Jawaban tidak boleh kosong');
            return;
        }
        
        $.post("{{ URL::to('/admin/faq/save') }}", $('#myForm').serialize(), function(resp){
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