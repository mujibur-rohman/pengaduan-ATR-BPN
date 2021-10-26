@extends('layouts.admin_res')
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

                        <h4 class="col-md-4">Data kota</h4>

                    </div>
                    <div class="panel-title col-md-12">

                        <form id="formfilter" method="POST">
                            {{ csrf_field() }}
                            <div class="row">
                                <div class="col-md-6" style="float:left;">
                                    <div class="fieldset" style="margin-bottom:10px;">


                                        <div class="field">
                                            <div class="field-label" style="float:left;width:40%;">Jenis Pengaduan</div>
                                            <div class="fiel-value">
                                                <select id="cmbjenispengaduan">
                                                    <option value="0">Semua data</option>
                                                    <option value="1">Pengaduan</option>
                                                    <option value="2">Informasi</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="field-label" style="float:left;width:40%;">Status Pengaduan</div>
                                            <div class="fiel-value">
                                                <select id="cmbstatuspengaduan">
                                                    <option value="0">Semua data</option>
                                                    <option value="1"> Laporan Diterima</option>
                                                    <option value="2">Proses Verifikasi</option>
                                                    <option value="3"> Proses Tindak Lanjut</option>
                                                    <option value="4">Tanggapan</option>
                                                    <option value="5">Selesai</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6" style="float:left;">
                                    <div class="fieldset" style="margin-bottom:10px;">
                                        <div class="field">
                                            <div class="field-label" style="float:left;width:40%;">Posisi Pengaduan</div>
                                            <div class="fiel-value">
                                                <select id="cmbposisipengaduan">
                                                    <option value="0">Semua data</option>
                                                    <option value="1"> Humas Pusat ATR BPN</option>
                                                    <option value="2">Itjen 7 Pusat ATR BPN</option>
                                                    <option value="3"> Verifikator Pusat ATR BPN</option>
                                                    <option value="4">Admin Kanwil Jawa Barat</option>
                                                    <option value="5">Verifikator Kanwil Jawa Barat</option>
                                                    <option value="6">Responder Kanwil Jawa Barat</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <div class="field-label" style="float:left;width:40%;">Tanggal perode</div>
                                            <div class="fiel-value" style="float:left;width:25%;">
                                                <div> <input type="date" class="field-label" id="txttglawal"
                                                        name="txttglawal" required></div>
                                            </div>
                                            <div class="field-label" style="float:left;width:10%;">s/d</div>

                                            <div class="fiel-value" style="float:left;width:25%;">
                                                <div>
                                                    <input type="date" class="field-label" id="txttglakhir"
                                                        name="txttglakhir" required>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                id="btnkmb">Kembali</button>
                            <button type="submit" class="btn btn-primary" id="btncaridata">Cari Data</button>

                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                id="btnbatal">bersih</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btngetfacebook">Get
                                Facebook</button>
                        </div>
                    </div>
                    </form>

                </div>






            </div>

        </div>
        <!-- Isi Content -->


        <div class="panel-body">

            <table id="dxdatagrid" class="table table-striped table-bordered nowrap" style="width:100%">
                <thead>
                  <tr>
                        <th></th>
                        <th>Kode</th>
                        <th>Keterangan</th>
                        <th>Nama kota</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody id="show_data"> 
                            
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="modalLoader" role="dialog" tabindex="-1">
            <div style=" position: fixed; margin-left: 50%; margin-top: 20%; ">
                <img src="{{ asset('assets_back/images/loader.gif') }}" style=" width: 50px;" alt="loading..." />
            </div>
        </div>
    </div>
    <!-- End Page-content main -->



@endsection

@push('script')

    <script type="text/javascript" src="{{ asset('assets_back/js/jquery.validate.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets_back/js/validate.min.js') }}"></script>
    <script type="text/javascript">
        
            function tampilData() {
                $.ajax({
                    url: "{{ route('daftartr_pengaduan') }}",
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                        console.log(data);
                        var html = '';
                        var i;
                        for (i = 0; i < data.length; i++) {
                            html += '<tr>' +
                                '<td>' + "<input type='checkbox' id='ok' >" + '</td>' +
                                '<td>' + data[i].kode_kota + '</td>' +
                                '<td>' + data[i].ket_kota + '</td>' +
                                '<td>' + data[i].nama_kota + '</td>' +
                                '<td>' + data[i].ibu_kota + '</td>' +
                                '<td>' + data[i].created_user + '</td>' +
                                '<td>' +
                                '<a href = "javascript:;" class="btn btn-warning btn-xs item-edit"  data="' +
                                data[i].pengaduan_id + '"><i class="fa fa-edit"></i></a>' +
                                '<a href = "javascript:;" class="btn btn-danger btn-xs item-delete" id="' +
                                data[i].pengaduan_id + '" data="' + data[i].pengaduan_id +
                                '"><i class="fa fa-trash"></i></a>' +
                                '</td>' +
                                '</tr>';
                        }
                        $('#show_data').html(html).text();

                    },
                    error: function() {
                        alert('Gagal memanggil data');
                    }
                });
            }

            tampilData();

          
            $('#btncaridata').click(function() {
                alert("proses1 cari data");
                caridata();
            });

            function caridata() {
                alert("proses2 cari data");

            }

            $('#btnbatal').click(function() {

                batal();
            });

            function batal() {
                $('#cmbjenispengaduan').val("0");
                $('#cmbstatuspengaduan').val("0");
                $('#cmbposisipengaduan').val("0");


            }

            $('#btngetfacebook').click(function() {
                alert("proses loding ... get data facebook");
                getdata();
            });

            function getdata() {
                alert('proses2 get data facebook');
            }


            // .--Tampil Data

            $('#btnkmb').click(function() {
                //alert('masuk kembali');
                window.history.back();
            });

            // Menambahkan Record Baru
            
            
        });
    </script>
@endpush
