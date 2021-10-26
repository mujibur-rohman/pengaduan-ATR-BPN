@extends('layouts.admin')
@section('htmlheader_title')
    {{ trans('pusat') }}
@endsection
@section('main-content')

    < <!--==============================================================-->
        <!-- Start right Content here main -->

        <div class="main-content">

            <div class="page-content">
                <div class="container-fluid">
                    <!--   main  ============================================================== -->



                    <div class="panel-heading" style="margin-bottom: 2%">

                        <h1 class="panel-title col-md-4">Data Status</h1>
                        <div class="right col-md-4 text-right">
                            <a class="btn btn-primary btn-xs" id="btnTambah"><i class="fa fa-edit"></i> Tambah </a>
                        </div>
                    </div>
                    <!-- Isi Content -->


                    <div class="panel-body">
                        <table class="table table-hover" id="myTable">
                            <tr>

                                <th>ID </th>
                                <th>Nama Status</th>
                                <th>standar Waktu</th>
                                <th>Dibuat</th>
                                <th>Tanggal Dibuat</th>
                            </tr>
                            <tbody id="show_data">

                            </tbody>
                        </table>
                    </div>

                    <div class="modal fade" id="modalLoader" role="dialog" tabindex="-1">
                        <div style=" position: fixed; margin-left: 50%; margin-top: 20%; ">
                            <img src="{{ asset('assets_back/images/loader.gif') }}" style=" width: 50px;"
                                alt="loading..." />
                        </div>
                    </div>

                    <!-- Modal -->
                    <!-- atribut pada bootstrap yaitu, data-backdrop="static" yaitu untuk membuat modal tidak hilang pada saat di klik sembarangan -->
                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h6 class="modal-title" id="modalTambahTitle">Tambah Data status</h6>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form id="formSave" method="POST">
                                        {{ csrf_field() }}
                                        <div class="form-group">
                                            <label for="txtIDstatus" class="form-label">ID</label>
                                            <input type="text" class="form-control" id="txtstatus_id" name="txtstatus_id"
                                                disabled required>
                                        </div>

                                        <div class="form-group">
                                            <label for="txtNamastatus">Nama status</label>
                                            <input type="text" class="form-control" id="txtnama_status"
                                                name="txtnama_status">
                                        </div>
                                        <div class="form-group">
                                            <label for="txtNamastatus">Standar Waktu</label>
                                            <input type="text" class="form-control" id="txtstandar_wkt"
                                                name="txtstandar_wkt">
                                        </div>
                                        <div class="form-group">
                                            <label for="txtNamastatus">Dibuat </label>
                                            <input type="text" class="form-control" id="txtcreated_by"
                                                name="txtcreated_by" disabled>
                                        </div>



                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                        id="btnCancel">Keluar</button>
                                    <button type="submit" class="btn btn-primary" id="btnSimpan">Simpan</button>
                                </div>
                                </form>
                            </div>

                        </div>
                    </div>
                    <!-- /.Modal Input -->


                    <!-- Modal Delete -->
                    <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog">
                        <div class="sweet-alert showSweetAlert" data-custom-class=""
                            data-has-cancel-button="true" data-has-confirm-button="true" data-allow-outside-click="false"
                            data-has-done-function="true" data-animation="pop" data-timer="null"
                            style="display: block; margin-top: -149px;">
                            <div class="sa-icon sa-error" style="display: none;">
                                <span class="sa-x-mark">
                                    <span class="sa-line sa-left"></span>
                                    <span class="sa-line sa-right"></span>
                                </span>
                            </div>
                            <div class="sa-icon sa-warning pulseWarning" style="display: block;">
                                <span class="sa-body pulseWarningIns"></span>
                                <span class="sa-dot pulseWarningIns"></span>
                            </div>
                            <div class="sa-icon sa-info" style="display: none;"></div>
                            <div class="sa-icon sa-success" style="display: none;">
                                <span class="sa-line sa-tip"></span>
                                <span class="sa-line sa-long"></span>

                                <div class="sa-placeholder"></div>
                                <div class="sa-fix"></div>
                            </div>
                            <div class="sa-icon sa-custom" style="display: none;"></div>
                            <h2>Apakah anda yakin?</h2>
                            <p style="display: block;">Data akan hilang secara permanan</p>
                            <fieldset>
                                <input type="text" tabindex="3" placeholder="">
                                <div class="sa-input-error"></div>
                            </fieldset>
                            <div class="sa-error-container">
                                <div class="icon">!</div>
                                <p>Not valid!</p>
                            </div>
                            <div class="sa-button-container">
                                <button id="btnHapus" class="confirm" tabindex="1"
                                    style="display: inline-block; background-color: rgb(221, 107, 85); box-shadow: rgba(221, 107, 85, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset;">Ya</button>
                                <div class="sa-confirm-button-container">
                                    <button class="cancel" tabindex="2"
                                        style="display: inline-block; box-shadow: none;">Batal</button>
                                    <div class="la-ball-fall">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> <!-- /.Modal Delete -->




                    <!-- end main============================================================== -->
                </div>
            </div>
        </div>
        <!-- End Page-content main -->



    @endsection

    @push('script')

        <script type="text/javascript" src="{{ asset('assets_back/js/jquery.validate.js') }}"></script>
        <script type="text/javascript" src="{{ asset('assets_back/js/validate.min.js') }}"></script>
        <script type="text/javascript">
            $(function() {

                        var jml = 0;
                        if ($("#formSave").length > 0) {
                            $("#formSave").validate({

                                rules: {
                                    txtid_user: {
                                        required: true,
                                        maxlength: 5,
                                        digits: true

                                    },

                                    txtnama_user: {
                                        required: true,
                                        maxlength: 40
                                    },
                                    txtemail: {
                                        required: true,
                                        maxlength: 80
                                    },
                                    txtpassword: {
                                        required: true,
                                        maxlength: 8
                                    },

                                },
                                messages: {

                                    txtid_user: {
                                        required: "Harap memasukan ID",
                                        maxlength: "Tidak boleh melebihi 8 karakter",
                                        digits: "Data hanya boleh diisi dengan angka"
                                    },

                                    txtnama_user: {
                                        required: "Harap memasukan nama user",
                                        maxlength: "Tidak boleh melebihi 40 karakter"
                                    },
                                    txtemail: {
                                        required: "Harap memasukan email",
                                        maxlength: "Tidak boleh melebihi 80 karakter"
                                    },
                                    txtpassword: {
                                        required: "Harap memasukan passoword",
                                        maxlength: "Tidak boleh melebihi 8 karakter"
                                    }

                                },

                            })

                        }


                        // .--Validasi Fprm

                        // Tampil Data
                        function tampilData() {
                            $.ajax({
                                url: "{{ route('daftarpengaduan_status') }}",
                                async: false,
                                dataType: 'json',
                                success: function(data) {
                                    console.log(data);
                                    var html = '';
                                    var i;
                                    for (i = 0; i < data.length; i++) {
                                        html += '<tr>' +
                                            '<td>' + data[i].status_id + '</td>' +
                                            '<td>' + data[i].nama_status + '</td>' +
                                            '<td>' + data[i].standar_wkt + '</td>' +
                                            '<td>' + data[i].username + '</td>' +
                                            '<td>' +

                                            '<a href = "javascript:;" class="btn btn-warning btn-xs item-edit"  data="' +
                                            data[i].status_id + '"><i class="fa fa-edit"></i></a>' +
                                            '<a href = "javascript:;" class="btn btn-danger btn-xs item-delete" id="' +
                                            data[i].status_id + '" data="' + data[i].status_id +
                                            '"><i class="fa fa-trash"></i></a>' +
                                            '</td>' +
                                            '</tr>';
                                    }

                                    $('#show_data').html(html);

                                },
                                error: function() {
                                    alert('Gagal memanggil data');
                                }
                            });
                        }

                        tampilData();


                        $('#btnCancel').click(function() {
                                alert('keluar');
                            }

                            // .--Tampil Data


                            // Menambahkan Record Baru
                            $('#btnTambah').click(function() {
                                $.ajax({
                                    url: "{{ route('maxpengaduan_status') }}",
                                    async: false,
                                    dataType: 'json',
                                    success: function(data) {
                                        //  console.log(data[0].status_id);
                                        jml = data[0].jml;
                                    },
                                    error: function() {
                                        alert('Gagal memanggil data max');
                                    }
                                });



                                $('#formSave').trigger('reset');
                                $('#txtstatus_id').val(jml);
                                $('#myModal').find('#modalTambahTitle').text('Tambah Data status');
                                $('#txtstatus_id-error').attr('style', 'display: none;');
                                $('#txtnama_status-error').attr('style', 'display: none;');
                                $('#txtstandar_wkt-error').attr('style', 'display: none;');
                                $('#txtcreate_by-error').attr('style', 'display: none;');
                                $('#formSave').attr("action", "{{ route('simpanpengaduan_status') }}");
                                $('#myModal').modal('show');
                            })

                            $('#formSave').submit(function(e) {
                                e.preventDefault();
                                var link = $('#formSave').attr('action');
                                var request = new FormData(this);

                                $.ajax({
                                    url: link,
                                    method: "POST",
                                    data: request,
                                    contentType: false,
                                    cache: false,
                                    processData: false,
                                    success: function(response) {
                                        console.log(response);
                                        $('#myModal').modal('hide');
                                        $('.alert-success').html('Data status Berhasil Disimpan').fadeIn()
                                            .delay(4000).fadeOut('slow');
                                        $('#modalLoader').modal('show');
                                        tampilData();
                                        $('#modalLoader').modal('hide');
                                    }
                                });
                            });

                            // .--Menambahkan Record Baru

                            // Update Data

                            $('#show_data').on('click', '.item-edit', function() {
                                var id = $(this).attr('data');
                                var url = "{{ url('admin/pengaduan_status/updatepengaduan_status') }}/" + id;
                                //$('#formSave').trigger('reset');
                                $('#txtstatus_id-error').attr('style', 'display: none;');
                                $('#myModal').modal('show');
                                $('#myModal').find('#modalTambahTitle').text('Edit Data status');
                                $('#formSave').attr("action", url);
                                //var link = $('#formSave').attr('action');
                                $.ajax({
                                    url: "{{ url('admin/pengaduan_status/getDatapengaduan_status') }}/" + id,
                                    type: 'ajax',
                                    method: 'get',
                                    async: false,
                                    dataType: 'json',
                                    success: function(data) {
                                        //console.log(data);

                                        $('#txtstatus_id').val(data[0].status_id);
                                        $('#txtnama_status').val(data[0].nama_status);
                                        $('#txtstandar_wkt').val(data[0].standar_wkt);
                                        $('#txtcreated_by').val(data[0].created_by);

                                    }

                                });




                            });

                            // .--Update Data

                            // Delete Data


                            $('#show_data').on('click', '.item-delete', function() {
                                var id = $(this).attr('data');
                                $('#modalDelete').modal('show');
                                $('#btnHapus').unbind().click(function() {
                                    $.ajax({
                                        url: "{{ url('admin/hapusDatapengaduan_status') }}/" + id,
                                        method: 'get',
                                        async: false,
                                        type: 'ajax',
                                        dataType: 'json',
                                        success: function(response) {
                                            if (response.success) {
                                                $('#modalDelete').modal('hide');
                                                $('.alert-success').html(
                                                        'Data status berhasil dihapus').fadeIn()
                                                    .delay(4000).fadeOut('slow');
                                                tampilData();
                                            } else {
                                                alert('Gagal');
                                            }
                                        }
                                    });
                                });

                            });

                            // .--Delete Data
                        });
        </script>
    @endpush
