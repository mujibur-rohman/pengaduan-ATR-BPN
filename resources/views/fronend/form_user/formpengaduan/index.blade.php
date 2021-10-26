@extends('layouts.landing')
{{-- @section('htmlheader_title')
    {{ trans('form') }}
@endsection --}}
@section('main-content')

 <!--==============================================================-->
        <!-- Start right Content here main -->

        <div class="main-content">

            <div class="page-content">
                <div class="container-fluid">
                    <!--   main  ============================================================== -->
      
                <div class="col-md-12 col-sm-12 equal-height item" >
                  <form id="formSave" method="POST">
                                        {{ csrf_field() }}

                       <div class="col-md-6" style="margin-top:130px;">
                                <div class="fieldset">


                                    <div class="field">
                                            <div class="field-label">ID Pengaduan</div>
                                            <div class="fiel-value"><div><input type="text" class="form-control" id="txtNomor" name="txtNomor"
                                                disabled required> </div></div>
                                    </div>

                                    
                                          <div class="field">
                                          <div class="field-label"><h3> I. Indetitas Pengaduan</h3></div>
                                         </div>

                                            <div class="field">
                                                <div class="field-label">Nama</div>
                                                <div class="fiel-value"><div><input type="text" class="form-control" id="txtNama" > </div></div>
                                            </div>

                                            <div class="field">
                                            <div class="field-label" >Email</div>
                                            <div class="fiel-value"><div><input type="text" class="form-control" id="txtEmail" > </div></div>
                                        </div>
                                        <div class="field">
                                            <div class="field-label" >No Telpon</div>
                                            <div class="fiel-value"><div><input type="text" class="form-control" id="txtNo_Telpon" > </div></div>
                                        </div>

                                        
                                        <div class="field">
                                            <div class="field-label" ><h3> II. Uraian Pengaduan </h3></div>
                                            <div class="fiel-value"><div><input type="text" class="form-control" id="txtUraian" > </div></div>
                                        </div>
                                         
                                    <div class="field">
                                        <div class="field-label" ><h3>III.Bukti yang di Lampirkan</h3></div>
                                        <div class="fiel-value"><div><input  id="bukti1" name="bukti1" type="file" class="form-control">
                                             <input  id="bukti2" name="bukti2" type="file" class="form-control">
                                              <input id="bukti3" name="bukti3" type="file" class="form-control">  </div>
                                       </div>
                                    </div> 

                                 </div>  
                             </div>

                            <div class="col-md-6" style="margin-top:130px;">
                                <div class="fieldset" >
                                      <div class="field">
                                         <div class="field-label">Tanggal</label> </div>
                                            <div class="fiel-value"><div> <input type="date" class="form-control" id="txtTanggal" name="txtTanggal"  required="required" autocomplete="off">
                                            </div></div>
                                        </div>

                                        <div class="field">
                                          <div class="field-label"><h3>.</h3></div>
                                         </div>

                                        <div class="field">
                                                <div class="field-label" >Alamat</div>
                                                <div class="fiel-value"><div><input type="text" class="form-control" id="txtAlamat" > </div></div>
                                         </div>
                                        

                                      
                                        
                                        <div class="field">
                                            <div class="field-label">Pekerjaan</div>
                                            <div class="fiel-value"><div><input type="text" class="form-control" id="txtPekerjaan" > </div></div>
                                        </div>
                                        
                                       
                                        <div class="field">
                                            <div class="field-label" >Object Aduan(NO.SHM/Letak tanah)
                                                    Hubungan hukum dengan tanah No Berkas Permohonan(untuk pelayanan)</div>
                                            <div class="fiel-value"><div><input type="text" class="form-control" id="txtObject" > </div></div>
                                        </div>
                                        
 
                         </div>
                           
                                <div class="modal-footer">
                                    <button type="resert" class="btn btn-secondary" data-dismiss="modal"
                                        id="btnCancel">Keluar</button>
                                    <button type="submit" class="btn btn-primary" id="btnSimpan">Simpan</button>
                                </div>
                             </form>
                     </div>
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
                            txtNomor: {
                                required: true,
                                maxlength: 5,
                                digits: true

                            },

                            txtTanggal: {
                                required: true,
                                maxlength: 40
                            },
                            txtNama: {
                                required: true,
                                maxlength: 80
                            },
                            txtEmail: {
                                required: true,
                                maxlength: 40
                            },
                             txtPekerjaan: {
                                required: true,
                                maxlength: 40
                            },
                             txtNo_Telpon: {
                                required: true,
                                maxlength: 40
                            },
                             txtObject: {
                                required: true,
                                maxlength: 40
                            },
                             txtUraian: {
                                required: true,
                                maxlength: 40
                            },
                             bukti1: {
                                required: true,
                                maxlength: 40
                            },
                             bukti2: {
                                required: true,
                                maxlength: 40
                            },
                             bukti3: {
                                required: true,
                                maxlength: 40
                            },
                            

                        },
                        messages: {


                            txtNama: {
                                required: "Harap memasukan nama ",
                                maxlength: "Tidak boleh melebihi 80 karakter",
                                digits: "Data hanya boleh diisi dengan angka"
                            },

                            txtEmail: {
                                required: "Harap memasukan email",
                                maxlength: "Tidak boleh melebihi 40 karakter"
                            },
                            txtPekerjaan: {
                                required: "Harap memasukan pekerjaan",
                                maxlength: "Tidak boleh melebihi 80 karakter"
                            },
                            txtNo_Telpon: {
                                required: "Harap memasukan nomer telpon",
                                maxlength: "Tidak boleh melebihi 40 karakter"
                            },
                              txtObject: {
                                required: "Harap memasukan nomer telpon",
                                maxlength: "Tidak boleh melebihi 40 karakter"
                            },
                              txtUraian: {
                                required: "Harap memasukan nomer telpon",
                                maxlength: "Tidak boleh melebihi 40 karakter"
                            },
                                bukti1: {
                                required: "Harap memasukan nomer bukti",
                                maxlength: "Tidak boleh melebihi 40 karakter"
                            },
                              bukti2: {
                                required: "Harap memasukan bukti2",
                                maxlength: "Tidak boleh melebihi 40 karakter"
                            },
                              bukti3: {
                                required: "Harap memasukan bukti3",
                                maxlength: "Tidak boleh melebihi 40 karakter"
                            },
                            


                        },

                    })

                }


                


               


                // Menambahkan Record Baru
                $('#btnTambah').click(function() {
                    $.ajax({
                        url: "{{ route('maxpengaduan_kanal') }}",
                        async: false,
                        dataType: 'json',
                        success: function(data) {
                            //  console.log(data[0].id_kanal);
                            jml = data[0].jml;
                        },
                        error: function() {
                            alert('Gagal memanggil data max');
                        }
                    });

                    $('#formSave').trigger('reset');
                    $('#txtid_form').val(jml);
                    $('#myModal').find('#modalTambahTitle').text('Tambah Data kanal');
                    $('#txtid_form-error').attr('style', 'display: none;');
                    $('#txtnama_kanal-error').attr('style', 'display: none;');

                    $('#formSave').attr("action", "{{ route('simpanpengaduan_kanal') }}");
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
                            $('.alert-success').html('Data kanal Berhasil Disimpan').fadeIn().delay(
                                4000).fadeOut('slow');
                            $('#modalLoader').modal('show');
                            tampilData();
                            $('#modalLoader').modal('hide');
                        }
                    });
                });

              
            });
        </script>
    @endpush