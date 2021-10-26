@extends('admin')

@section('main-content')

@include('admin.disposisi.view')


<div class="panel panel-headline" id="menudisposisiInput">
    <div class="panel-heading" style="margin-bottom: 2%">

        <h1 class="panel-title col-md-4">Data Disposisi</h1>
        <div class="right col-md-4 text-right">
            <a class="btn btn-primary btn-xs" id="btnTambah"> Tambah Data</a>
        </div>
    </div>
    <div class="alert alert-success" style="display: none;">

    </div>



    <!-- Isi Content -->

    <div class="panel-body">
        <table class="table table-hover" id="myTable">
            <tr>
                <th>ID disposisi</th>
                <th>Nama Karyawan</th>
                <th>Nama Wilayah</th>  
                <th>Keterangan </th>          
                <th>Status Disposisi</th>
                <th> </th>
            </tr>
            <tbody id="show_data">

            </tbody>
        </table>
    </div>

    <div class="modal fade" id="modalLoader" role="dialog" tabindex="-1">
        <div style=" position: fixed; margin-left: 50%; margin-top: 20%; ">
            <img src="{{ asset('assets_back/images/loader.gif')}}" style=" width: 50px;" alt="loading..." />
        </div>
    </div>

    <!-- Modal -->
    <!-- atribut pada bootstrap yaitu, data-backdrop="static" yaitu untuk membuat modal tidak hilang pada saat di klik sembarangan -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalTambahTitle">Tambah Data Disposisi</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="formSave" method="POST" enctype="multipart/form-data">
                        {{ csrf_field() }}
                            
                        <div class="form-group">
                           <label for="txtiddisposisi" class="form-label">ID Disposisi</label>
                            <input type="text" class="form-control" id="txtiddisposisi" name="txtiddisposisi" required>
                        </div>
                        <div class="form-group">
                           <label for="cmbnamakaryawan" class="form-label">Nama karyawan</label>
                            <input type="text" class="form-control" id="cmbnamakaryawan" name="cmbnamakaryawan" required>
                        </div>
                        
                        
                        <div class="form-group">
                            <label for="txtkode_kantor">Nama Wilayah Kantor</label>
                            <input type="text" class="form-control" id="txtkode_kantor" name="txtkode_kantor" required>
                        </div>

                        <div class="form-group">
                            <label for="cmbKeluarga">Status Disposisi</label>
                            <select name="cmbKeluarga" id="cmbstatus_aktif" class="form-control" required>
                                <option value="">-- Pilih --</option>
                                <option value="A">Aktif</option>
                                <option value="T">Tidak Aktif</option>
                            </select>
                        </div>

                       
                        
                      
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnCancel">Keluar</button>
                    <button type="submit" class="btn btn-primary" id="btnSimpan">Simpan</button>
                </div>
                </form>
            </div>

        </div>
    </div>
    <!-- /.Modal Input -->


    <!-- Modal Delete -->
    <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog">
        <div class="sweet-alert showSweetAlert" data-custom-class="" data-has-cancel-button="true"
            data-has-confirm-button="true" data-allow-outside-click="false" data-has-done-function="true"
            data-animation="pop" data-timer="null" style="display: block; margin-top: -149px;">
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
            <p style="display: block;">Data akan hilang secara permanen</p>
            <fieldset>
                <input type="text" tabindex="3" placeholder="">
                <div class="sa-input-error"></div>
            </fieldset>
            <div class="sa-error-container">
                <div class="icon">!</div>
                <p>Not valid!</p>
            </div>
            <div class="sa-button-container">
                <button id="btnHapus" class="confirm" tabindex="1" style="display: inline-block; background-color: rgb(221, 107, 85); box-shadow: rgba(221, 107, 85, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset;">Ya</button>
                <div class="sa-confirm-button-container">
                    <button class="cancel" tabindex="2" style="display: inline-block; box-shadow: none;" id="btnBatal">Batal</button>
                    <div class="la-ball-fall">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>


            <!-- /.Modal Delete -->


            <!-- /.Isi Content -->

        </div>
        @endsection

        @push('script')

        <script type="text/javascript" src="{{ asset('js/bootstrap-datepicker.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/jquery.validate.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/validate.min.js') }}"></script>
        <script type="text/javascript">
        $(function() {

            $('#btnkembali').click(function(){
                $('#menudisposisiView').attr('style', 'display: none;');
                $('#modalLoader').modal('show');
                $('#menudisposisiInput').removeAttr('style');
                tampilData();
                $('#modalLoader').modal('hide');
            })

            $('#editProfile').click(function(){
                //$('#myModalProfile').modal('show');
                var id= $('#iddisposisi').text();
                
                var url = "{{ url('admin/updateProfiledisposisi') }}/" + id;
                $('#fotoprofil').removeAttr('required');

                //$('#formSave').trigger('reset');
                $('#txtiddisposisiprofil-error').attr('style', 'display: none;');
                $('#txtid_karyawanprofil-error').attr('style', 'display: none;');
                $('#txtkode_kantorprofil-error').attr('style', 'display: none;');
                
                $('#cmbstatus_aktifgaprofil-error').attr('style', 'display: none;');
               
                $('#myModalProfile').modal('show');
                $('#myModalProfile').find('#modalProfileTitle').text('Edit Profile');
                $('#formProfil').attr("action", url);
                //var link = $('#formSave').attr('action');
                $.ajax({
                    url: "{{ url('admin/editProfildisposisi') }}/" + id,
                    type: 'ajax',
                    method: 'get',
                    async: false,
                    dataType: 'json',
                    success:function(data){
                        console.log(data);
                        $('#txtiddisposisiprofil').val(data.id_deposisi);
                        $('#txtid_karyawanprofil').val(data.id_karyawan);
                        $('#txtkode_kantorprofil').val(data.kode_kota);
                       
                        $('#cmbKeluargaprofil').val(data.status_aktif);
                        
                    }

                });
            })

            $('#formProfil').submit(function(e) {
                e.preventDefault();
                var link = $('#formProfil').attr('action');
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
                            $('#formProfil').trigger('reset');
                            $('#myModalProfile').modal('hide');
                            window.location.replace("{{ route('indexdisposisi') }}");
                            //$('.alert-success').html('Data Mata Pelajaran Berhasil Disimpan').fadeIn().delay(4000).fadeOut('slow');
                            
                            //tampilData();
                    }
                });
            });

            $('#btnBatal').click(function(){
                $('#modalDelete').modal('hide');
            })

            $('#txttgl_lahir').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
            })

            $('#cmbnamakaryawan').on('change', function(){
                var id = $("#cmbnamakaryawan option:selected").attr("value");
                //alert(link);getidkaryawan
                $.ajax({
                    url: "{{ url('admin/getidkaryawan') }}/" + id,
                    type: 'ajax',
                    method: 'get',
                    async: false,
                    dataType: 'json',
                    success:function(data){
                        console.log(data);
                        //alert(data[0].id_kelas);
                        $('#cmbkelas').val(data[0].id_karyawan);
                        //$('#cmbkelas').val(data.id_kelas);
                        
                        
                        
                    }

                });
                
            })

            // Validasi Fprm

            if ($("#formSave").length > 0) {
                $("#formSave").validate({

                    rules: {
                        txtiddisposisi: {
                            required: true,
                            maxlength: 11,
                            digits: true

                        },

                        txtid_karyawan: {
                            required: true,
                            maxlength: 15,
                            digits: true
                        },
                        txtkode_kantor: {
                            required: true,
                            maxlength: 50
                        },
                       
                      
                        cmbstatus_aktif: {
                            required: true,
                        },
                    },
                    messages: {

                        txtiddisposisi: {
                            required: "Harap memasukan ID",
                            maxlength: "Tidak boleh melebihi 11 karakter",
                            digits: "Harap memasukan data berupa angka"
                        },

                        txtid_karyawan: {
                            required: "Harap memasukan id_karyawan",
                            maxlength: "Tidak boleh melebihi 15 karakter",
                            digits: "Harap memasukan data berupa angka"
                        },

                        txtkode_kantor: {
                            required: "Harap memasukan nama lengkap",
                            maxlength: "Tidak boleh melebihi 50 karakter"
                        },

                        txttempatlahir: {
                            required: "Harap memasukan detail tempat lahir",
                            maxlength: "Tidak boleh melebihi 25 karakter"
                        },

                        cmbstatus_aktif: {
                            required: "Harap memasukan  status aktif"
                        }

                    },

                })

            }


            // .--Validasi Fprm


            // Tampil Data
            function tampilData() {  
                $.ajax({
                    url: "{{ route('getdisposisi') }}",
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                     //   console.log(data);
                     
                        var html = '';var aktif='';
                        var i;
                        for (i = 0; i < data.data1.length; i++) {
                            if(data.data1[i].status_aktif=='A'){aktif='Aktif';}else{aktif='Tidak Aktif';}
                            html += '<tr>' +
                                '<td>' + data.data1[i].id_deposisi + '</td>' +
                                '<td>' + data.data1[i].nama_karyawan+ '</td>' +
                                '<td>' + data.data1[i].nama_kota + '</td>' +
                                '<td>' + data.data1[i].ket_kota + '</td>' +
                                '<td>' + aktif + '</td>' +
                                
                                '<td>' +

                                '<a href = "javascript:;" class="btn btn-primary btn-xs item-view"  data="' +
                                data.data1[i].id_karyawan + '"><i class="fa fa-eye"></i></a>' +
                                '<a href = "javascript:;" class="btn btn-warning btn-xs item-edit"  data="' +
                                data.data1[i].id_deposisi + '"><i class="fa fa-edit"></i></a>' +
                                '<a href = "javascript:;" class="btn btn-danger btn-xs item-delete" id="' +
                                data.data1[i].id_deposisi + '" data="' + data.data1[i].id_deposisi +
                                '"><i class="fa fa-trash"></i></a>' +
                                '</td>' +
                                '</tr>';
                        }
                        $('#show_data').html(html);
                        
                        //$('#preloader').attr('style', 'display: none;');
                    },
                    error: function() {
                        alert('Gagal memanggil data');
                    }
                });
            }

            tampilData();

            // .--Tampil Data


            // Menambahkan Record Baru
            $('#btnTambah').click(function() {
                $('#formSave').trigger('reset');
                $('#foto').attr('required', '');
                $('#myModal').find('#modalTambahTitle').text('Tambah Data disposisi');
                $('#txtiddisposisi-error').attr('style', 'display: none;');
                $('#txtid_karyawan-error').attr('style', 'display: none;');
                $('#txtkode_kantor-error').attr('style', 'display: none;');
                $('#cmbStatus_aktif-error').attr('style', 'display: none;');
                $('#formSave').attr("action", "{{ route('simpanDatadisposisi') }}");
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
                            $('.alert-success').html('Data disposisi Berhasil Disimpan').fadeIn().delay(4000).fadeOut('slow');
                            $('#modalLoader').modal('show');
                            tampilData();
                            $('#modalLoader').modal('hide');
                    }
                });
            });

            // .--Menambahkan Record Baru


            // View Profile

            $('#show_data').on('click', '.item-view', function(){
                var id = $(this).attr('data');
                
                $('#menudisposisiInput').attr('style', 'display: none;');
                $('#modalLoader').modal('show');
                $('#menudisposisiView').removeAttr('style');
                $('#modalLoader').modal('hide');
                $.ajax({
                    url: "{{ url('admin/cariProfildisposisi') }}/" + id,
                    type: 'ajax',
                    method: 'get',
                    async: false,
                    dataType: 'json',
                    success:function(data){
                        console.log(data);
                        var url2 = "{{ asset('UploadedFile/disposisi') }}/"+data.data2[0].foto;
                        $('#fotoProfil').attr("src", url2);
                        $('#namaProfil').text(data.data2[0].kode_kota);
                        $('#id_karyawanProfil').text(data.data2[0].id_karyawan);
                        $('#iddisposisi').text(data.data2[0].id_deposisi);
                      
                        $('#status_aktifprofil').text(data.data2[0].status_aktif);
                       

                        var html = '';
                        var i;var aktif='';
                        for (i = 0; i < data.data1.length; i++) {
                            if(data.data1[i].status_aktif='A'){aktif="Aktif"}else{aktif="Tdk Aktif"}
                            html += '<tr>' +
                                '<td>' + aktif+ '</td>' +
                                '<td>' + data.data1[i].nama_kota + '</td>' +
                                '<td>' + data.data1[i].ket_kota + '</td>' +
                                '<td>' + data.data1[i].nama_karyawan + '</td>' +
                                '</tr>';
                        }
                        $('#show_disposisi').html(html);
                    }
                    
                });
            });

            

            // .--View Profile

            // Update Data

            $('#show_data').on('click', '.item-edit', function(){
                var id = $(this).attr('data');
                
                var url = "{{ url('admin/editdisposisi') }}/" + id;
                //$('#formSave').trigger('reset');
                $('#txtiddisposisi-error').attr('style', 'display: none;');
                $('#txtid_karyawan-error').attr('style', 'display: none;');
                $('#txtkode_kantor-error').attr('style', 'display: none;');
                $('#cmbstatus_aktif-error').attr('style', 'display: none;');
                $('#myModal').modal('show');
                $('#myModal').find('#modalTambahTitle').text('Edit Data Disposisi');
                $('#formSave').attr("action", url);
                //var link = $('#formSave').attr('action');
                $.ajax({
                    url: "{{ url('admin/cariDatadisposisi') }}/" + id,
                    type: 'ajax',
                    method: 'get',
                    async: false,
                    dataType: 'json',
                    success:function(data){
                        console.log(data);
                        $('#txtiddisposisi').val(data.id_deposisi);
                        $('#txtid_karyawan').val(data.id_karyawan);
                        $('#txtkode_kantor').val(data.kode_kota);                     
                        $('#cmbStatus_aktif').val(data.status_aktif);
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
                        url: "{{ url('admin/hapusDatadisposisi') }}/" + id,
						method: 'get',
                        async: false,
                        type: 'ajax',
                        dataType: 'json',
                        success: function(response){
                            if (response.success) {
                                $('#modalDelete').modal('hide');
                                $('.alert-success').html('Data disposisi Berhasil Dihapus').fadeIn().delay(4000).fadeOut('slow');
                                tampilData();
                            }else {
							    alert('Gagal');
							}
                        }
                    });
                });

            });
                


            // .--Delete Data
        });
        $.validator.addMethod(
			"format_tanggal",
			function(value, element) {
				// put your own logic here, this is just a (crappy) example
				return value.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
			},
			"Harap memasukan data tanggal dengan format DD/MM/YYYY"
		);
        </script>
        @endpush