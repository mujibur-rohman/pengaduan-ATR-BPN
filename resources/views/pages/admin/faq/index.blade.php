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
                            <th>Parent ID</th>
                            <th>Jenis</th>
                            <th>Pertanyaan</th>
                            <th>Jawaban</th>
                            <th>Judul Topik</th>
                            <th>Posisi</th>
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
                    <input type="hidden" name="parent_id" id="parent_id"/>
                    <div class="form-group">
                        <label for="jenis" class="col-form-label">Jenis</label>
                        <div>
                            <select class="form-control form-select" name="faq_kategori" id="jenis">
                                <option>--Pilih Jenis--</option>
                                <option value="Kategori">Kategori</option>
                                <option value="Topik">Topik</option>
                                <option value="Pertanyaan">Pertanyaan</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group" id="parentKategori">
                        <label for="kategori" class="col-form-label">Kategori</label>
                        <div>
                            <select class="form-control form-select" name="parent_id" id="kategori">
                                {{-- <option value="0">--Pilih Kategori--</option> --}}
                                @foreach ($kategori as $ktg)
                                    <option value="{{$ktg->faq_id}}">{{$ktg->faq_topik}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="form-group" id="parentTopik">
                        <label for="topik" class="col-form-label">Topik</label>
                        <div>
                            <select class="form-control form-select" name="parent_id" id="topik">
                                    {{-- <option value="0">--Pilih Topik--</option> --}}
                                @foreach ($topik as $tpk)
                                    <option value="{{$tpk->faq_id}}">{{$tpk->faq_topik}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="form-group" id="pertanyaan">
                        <label for="faq_question" class="col-form-label">Pertanyaan</label>
                        <div>
                            <textarea name="faq_question" id="faq_question" cols="10" rows="5" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group" id="jawaban">
                        <label for="faq_answer" class="col-form-label">Jawaban</label>
                        <div>
                            <textarea name="faq_answer" id="faq_answer" cols="10" rows="5" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group" id="judul">
                        <label for="faq_topik" class="col-form-label">Judul</label>
                        <div>
                            <input name="faq_topik" type="text" id="faq_topik" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group" id="posisi">
                        <label for="faq_posisi" class="col-form-label">Posisi</label>
                        <div>
                            <select class="form-control form-select" name="faq_posisi" id="faq_posisi">
                                <option value="Internal">Internal</option>
                                <option value="Eksternal">Eksternal</option>
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
        
        $('#parent_id').val(data !== null ? data.parent_id : 0);
        $('#faq_question').val(data !== null ? data.faq_question : '-');
        $('#faq_answer').val(data !== null ? data.faq_answer : '-');
        $('#faq_kategori').val(data !== null ? data.faq_kategori : '');
        $('#faq_topik').val(data !== null ? data.faq_topik : '-');
        $('#faq_posisi').val(data !== null ? data.faq_posisi : '');
        $('#faq_id').val(data !== null ? data.faq_id : '');
        $('#myModal').modal('show');
    }
    
    var table = $('#dxdatagrid').DataTable({
        responsive: true,
        ajax: "{{ URL::to('/admin/faq/list') }}",
        columns: [
            { "data": "faq_id", width: '5%', className: 'text-center' },
            { "data": "parent_id", width: '5%', className: 'text-center' },
            { "data": "faq_kategori" },
            { "data": "faq_question" },
            { "data": "faq_answer" },
            { "data": "faq_topik" },
            { "data": "faq_posisi" },
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
                $('#myModal').modal('hide')
                table.ajax.reload();
                alert(resp.message);
            } else {
                alert('message: ' + resp.message);
            }
        }, 'json');
    });
});
</script>

<script>
const jenis = document.getElementById('jenis');
const kategori = document.getElementById('parentKategori');
const topik = document.getElementById('parentTopik');
const pertanyaan = document.getElementById('pertanyaan');
const jawaban = document.getElementById('jawaban');
const judul = document.getElementById('judul');
const posisi = document.getElementById('posisi');

// DISPLAY NONE
kategori.style.display = 'none';
topik.style.display = 'none';
pertanyaan.style.display = 'none';
jawaban.style.display = 'none';
judul.style.display = 'none';
posisi.style.display = 'none';

function showParent(){
    posisi.style.display = 'inherit';

    if (jenis.value === 'Kategori') {
        topik.style.display = 'none';
        kategori.style.display = 'none'
        pertanyaan.style.display = 'none';
        jawaban.style.display = 'none';
        judul.style.display = 'inherit';
        topik.querySelector('#topik').removeAttribute('name');
        kategori.querySelector('#kategori').removeAttribute('name');
    }
    if (jenis.value === 'Topik') {
        kategori.style.display = 'inherit';
        topik.style.display = 'none';
        pertanyaan.style.display = 'none';
        jawaban.style.display = 'none';
        judul.style.display = 'inherit';
        topik.querySelector('#topik').removeAttribute('name');
        kategori.querySelector('#kategori').setAttribute('name', 'parent_id');
    }
    if (jenis.value === 'Pertanyaan') {
        pertanyaan.style.display = 'inherit';
        jawaban.style.display = 'inherit';
        judul.style.display = 'none';
        topik.style.display = 'inherit';
        kategori.style.display = 'none';
        kategori.querySelector('#kategori').removeAttribute('name');
        topik.querySelector('#topik').setAttribute('name', 'parent_id');
    }
}

jenis.addEventListener('change', showParent);

</script>

<script>
    $.ajax({
        type: 'GET',
        data: '',
        url: "{{URL::to('/admin/faq/list')}}",
        success: function(result){
            objResult = JSON.parse(result);
            // kategori = objResult.kategori;
            console.log(objResult.kategori)
        }
    });
</script>
@endpush